require("dotenv").config();
require("./mongo");

const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet"); // MIDDLEWARE DE SEGURETAT

const mainCharacter = require("./models/Main_Character");
const Sujimon = require("./models/Sujimon");
const handleErrors = require("./middlewares/handleErrors");
const notFound = require("./middlewares/notFound");
const validateMainCharacter = require("./validators/validateMainCharacter");
const validateSujimon = require("./validators/validateSujimon");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

/*

Helmet és un middleware de seguretat que afegeix capceleres de
seguretat automàticament i serveix principalment per a protegir l'API de vulnerabilitats comuns
dels navegadors web.

*/
app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [process.env.CORS_ORIGIN, "http://localhost:5174"];

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
app.use(express.json());

/*====MAIN CHARACTERS ENDPOINTS====*/
app.get("/api/main_characters", async (request, response, next) => {
  try {
    const mcs = await mainCharacter.find({});
    response.json(mcs);
  } catch (error) {
    next(error);
  }
});

app.get("/api/main_characters/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    let mc;

    if (!isNaN(id)) {
      mc = await mainCharacter.findOne({ id_num: Number(id) });
    } else {
      mc = await mainCharacter.findById(id);
    }

    mc ? response.json(mc) : next();
  } catch (error) {
    next(error);
  }
});

app.post("/api/main_characters", async (request, response, next) => {
  const mc = request.body;

  const error = validateMainCharacter(mc);

  if (error) {
    return response.status(400).json({
      success: false,
      message: error
    })
  }

  const newMC = new mainCharacter({
    name: String(mc.name),
    id_num: Number(mc.id_num),
    jobs: mc.jobs ? mc.jobs.split(",") : [],
    image: mc.image !== undefined ? String(mc.image) : null,
    description: mc.description !== undefined ? String(mc.description) : null,
  });

  try {
    await newMC.save();
    response.json(newMC);
  } catch (error) {
    next(error);
  }
});

app.put("/api/main_characters/:id", async (request, response, next) => {
  const id = request.params.id;
  const mc = request.body;

  const error = validateMainCharacter(mc);

  if (error) {
    return response.status(400).json({
      success: false,
      message: error
    })
  }

  const updatedData = {
    name: String(mc.name),
    id_num: Number(mc.id_num),
    jobs: mc.jobs ? mc.jobs.split(",") : [],
    image: mc.image !== undefined ? String(mc.image) : null,
    description: mc.description !== undefined ? String(mc.description) : null,
  };

  try {
    let updated;

    if (!isNaN(id)) {
      updated = await mainCharacter.findOneAndUpdate(
        { id_num: Number(id) },
        updatedData,
        { new: true },
      );
    } else {
      updated = await mainCharacter.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
    }

    update ? response.json(updated) : next();
  } catch (error) {
    next(error);
  }
});

app.delete("/api/main_characters/:id", async (request, response, next) => {
  const id = request.params.id;
  let result;

  try {
    if (!isNaN(id)) {
      result = await mainCharacter.findOneAndDelete({ id_num: Number(id) });
    } else {
      result = await mainCharacter.findByIdAndDelete(id);
    }

    result ? response.status(204).end() : next();
  } catch (error) {
    next(error);
  }
});

/*====SUJIMON ENDPOINTS====*/
app.get("/api/sujimon", async (request, response, next) => {
  try {
    let sujimon = await Sujimon.find({});
    sujimon = sujimon.sort((a, b) => a.id_num - b.id_num);
    response.json(sujimon);
  } catch (error) {
    next(error);
  }
});

app.get("/api/sujimon/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    let sujimon;

    if (!isNaN(id)) {
      sujimon = await Sujimon.findOne({ id_num: Number(id) });
    } else {
      sujimon = await Sujimon.findById(id);
    }

    sujimon ? response.json(sujimon) : next();
  } catch (error) {
    next(error);
  }
});

app.post("/api/sujimon", async (request, response, next) => {
  const sujimon = request.body;

  const error = validateSujimon(sujimon);

  if (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }

  const newSujimon = new Sujimon({
    name: String(sujimon.name),
    id_num: Number(sujimon.id_num),
    category: String(sujimon.category),
    common_locations: sujimon.common_locations
      ? sujimon.common_locations.split(",")
      : [],
    rarity: Number(sujimon.rarity),
    skills: sujimon.skills ? sujimon.skills.split(",") : [],
    weaknesses: sujimon.weaknesses ? sujimon.weaknesses.split(",") : [],
    drops: sujimon.drops ? sujimon.drops.split(",") : [],
    image: sujimon.image !== undefined ? String(sujimon.image) : null,
    description:
      sujimon.description !== undefined ? String(sujimon.description) : null,
  });

  try {
    await newSujimon.save();
    response.json(newSujimon);
  } catch (error) {
    next(error);
  }
});

app.put("/api/sujimon/:id", async (request, response, next) => {
  const id = request.params.id;
  const sujimon = request.body;

  const error = validateSujimon(sujimon);

  if (error) {
    return response.status(400).json({
      status: false,
      message: error,
    });
  }

  const updatedData = {
    name: String(sujimon.name),
    id_num: Number(sujimon.id_num),
    category: String(sujimon.category),
    common_locations: sujimon.common_locations
      ? sujimon.common_locations.split(",")
      : [],
    rarity: Number(sujimon.rarity),
    skills: sujimon.skills ? sujimon.skills.split(",") : [],
    weaknesses: sujimon.weaknesses ? sujimon.weaknesses.split(",") : [],
    drops: sujimon.drops ? sujimon.drops.split(",") : [],
    image: sujimon.image !== undefined ? String(sujimon.image) : null,
    description:
      sujimon.description !== undefined ? String(sujimon.description) : null,
  };

  try {
    let updated;

    if (!isNaN(id)) {
      updated = await Sujimon.findOneAndUpdate(
        { id_num: Number(id) },
        updatedData,
        { new: true },
      );
    } else {
      updated = await Sujimon.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
    }

    updated ? response.json(updated) : next();
  } catch (error) {
    next(error);
  }
});

app.delete("/api/sujimon/:id", async (request, response, next) => {
  const id = request.params.id;
  let result;

  try {
    if (!isNaN(id)) {
      result = await Sujimon.findOneAndDelete({ id_num: Number(id) });
    } else {
      result = await Sujimon.findByIdAndDelete(id);
    }

    result ? response.status(204).end() : next();
  } catch (error) {
    next(error);
  }
});

app.use(handleErrors);
app.use(notFound);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
