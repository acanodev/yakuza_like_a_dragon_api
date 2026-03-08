require("dotenv").config();
require("./mongo");

const express = require("express");
const app = express();
const cors = require("cors");

const mainCharacter = require("./models/Main_Character");
const Sujimon = require("./models/Sujimon");
const handleErrors = require("./middlewares/handleErrors");

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

// API DOCS
app.use(express.static("public"));

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

    response.json(mc);
  } catch (error) {
    next(error);
  }
});

app.post("/api/main_characters", async (request, response, next) => {
  const mc = request.body;

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

    response.json(updated);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/main_characters/:id", async (request, response, next) => {
  const id = request.params.id;

  try {
    if (!isNaN(id)) {
      await mainCharacter.findOneAndDelete({ id_num: Number(id) });
    } else {
      await mainCharacter.findByIdAndDelete(id);
    }

    response.status(204).end();
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

    response.json(sujimon);
  } catch (error) {
    next(error);
  }
});

app.post("/api/sujimon", async (request, response, next) => {
  const sujimon = request.body;

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

    response.json(updated);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/sujimon/:id", async (request, response, next) => {
  const id = request.params.id;

  try {
    if (!isNaN(id)) {
      await Sujimon.findOneAndDelete({ id_num: Number(id) });
    } else {
      await Sujimon.findByIdAndDelete(id);
    }

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use(handleErrors);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
