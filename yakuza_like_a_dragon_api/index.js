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
      const allowedOrigins = [process.env.CORS_ORIGIN, "http://localhost:5173"];

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

// API-DOCS
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Yakuza Like a Dragon API",
      version: "1.0.0",
    },
    tags: [
      {
        name: "Main Characters",
        description: "Endpoints related to main characters"
      },
      {
        name: "Sujimon",
        description: "Endpoints related to sujimon"
      }
    ]
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    name: "Yakuza Like a Dragon API",
    version: "1.0.0",
    documentation: `${process.env.HOST}:${process.env.PORT}/api-docs`,
    endpoints: {
      mainCharacters: `${process.env.HOST}:${process.env.PORT}/api/main_characters`,
      sujimon: `${process.env.HOST}:${process.env.PORT}/api/sujimon`
    }
  });
});

/*====MAIN CHARACTERS ENDPOINTS====*/

/**
 * @swagger
 * /api/main_characters:
 *   get:
 *     tags: [Main Characters]
 *     summary: Get all main characters
 *     responses:
 *       200:
 *         description: List of characters
 */
app.get("/api/main_characters", async (request, response, next) => {
  try {
    const mcs = await mainCharacter.find({});
    response.status(200).json(mcs);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/main_characters/{id}:
 *   get:
 *     tags: [Main Characters]
 *     summary: Get a main character by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Character ID (MongoID or id_num)
 *     responses:
 *       200:
 *         description: Character found
 *       404:
 *         description: Character not found
 */
app.get("/api/main_characters/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    let mc;

    if (!isNaN(id)) {
      mc = await mainCharacter.findOne({ id_num: Number(id) });
    } else {
      mc = await mainCharacter.findById(id);
    }

    mc ? response.status(200).json(mc) : next();
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/main_characters:
 *   post:
 *     tags: [Main Characters]
 *     summary: Creates a main character
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               id_num:
 *                 type: integer
 *                 default: 1
 *               jobs:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Character created
 *       400:
 *         description: Bad request
 */
app.post("/api/main_characters", async (request, response, next) => {
  const mc = request.body;

  const error = await validateMainCharacter(mc, undefined);

  if (error) {
    return response.status(400).json({
      success: false,
      message: error,
    });
  }

  const newMC = new mainCharacter({
    name: String(mc.name),
    id_num: Number(mc.id_num),
    jobs: mc.jobs ? mc.jobs.split(",") : [],
    image: mc.image && mc.image.trim() !== "" ? String(mc.image) : null,
    description: mc.description !== undefined ? String(mc.description) : null,
  });

  try {
    await newMC.save();
    response.json(newMC);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/main_characters/{id}:
 *   put:
 *     tags: [Main Characters]
 *     summary: Updates an existing main character
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Character ID (MongoID or id_num)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               id_num:
 *                 type: integer
 *                 default: 1
 *               jobs:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Character found
 *       404:
 *         description: Character not found
 *       400:
 *         description: Bad request
 */
app.put("/api/main_characters/:id", async (request, response, next) => {
  const id = request.params.id;
  const mc = request.body;

  const error = await validateMainCharacter(mc, Number(id));

  if (error) {
    return response.status(400).json({
      success: false,
      message: error,
    });
  }

  const updatedData = {
    name: String(mc.name),
    id_num: Number(mc.id_num),
    jobs: mc.jobs ? mc.jobs.split(",") : [],
    image: mc.image && mc.image.trim() !== "" ? String(mc.image) : null,
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

    updated ? response.json(updated) : next();
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/main_characters/{id}:
 *  delete:
 *    tags: [Main Characters]
 *    summary: Deletes a main character.
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Character ID (MongoID or id_num)
 *         schema:
 *           type: string
 *    responses:
 *      204:
 *        description: No content. Main character deleted successfully!
 *      404:
 *        description: Main character not found
 */
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

/**
 * @swagger
 * /api/sujimon:
 *   get:
 *     tags: [Sujimon]
 *     summary: Get all sujimon
 *     responses:
 *       200:
 *         description: List of sujimon
 */
app.get("/api/sujimon", async (request, response, next) => {
  try {
    let sujimon = await Sujimon.find({});
    sujimon = sujimon.sort((a, b) => a.id_num - b.id_num);
    response.json(sujimon);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/sujimon/{id}:
 *   get:
 *     tags: [Sujimon]
 *     summary: Get a sujimon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Sujimon ID (MongoID or id_num)
 *     responses:
 *       200:
 *         description: Sujimon found
 *       404:
 *         description: Sujimon not found
 */
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

/**
 * @swagger
 * /api/sujimon:
 *   post:
 *     tags: [Sujimon]
 *     summary: Creates a sujimon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               id_num:
 *                 type: integer
 *                 default: 1
 *               category:
 *                 type: string
 *               common_locations:
 *                 type: string
 *               rarity:
 *                 type: integer
 *                 default: 1
 *               skills:
 *                 type: string
 *               weaknesses:
 *                 type: string
 *               drops:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Character created
 *       400:
 *         description: Bad request
 */
app.post("/api/sujimon", async (request, response, next) => {
  const sujimon = request.body;

  const error = await validateSujimon(sujimon, undefined);

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
    image: sujimon.image && sujimon.image.trim() !== "" ? String(sujimon.image) : null,
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

/**
 * @swagger
 * /api/sujimon/{id}:
 *   put:
 *     tags: [Sujimon]
 *     summary: Updates an existing sujimon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Sujimon ID (MongoID or id_num)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               id_num:
 *                 type: integer
 *                 default: 1
 *               category:
 *                 type: string
 *               common_locations:
 *                 type: string
 *               rarity:
 *                 type: integer
 *                 default: 1
 *               skills:
 *                 type: string
 *               weaknesses:
 *                 type: string
 *               drops:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sujimon found
 *       404:
 *         description: Sujimon not found
 *       400:
 *         description: Bad request
 */
app.put("/api/sujimon/:id", async (request, response, next) => {
  const id = request.params.id;
  const sujimon = request.body;

  const error = await validateSujimon(sujimon, Number(id));

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
    image: sujimon.image && sujimon.image.trim() !== "" ? String(sujimon.image) : null,
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

/**
 * @swagger
 * /api/sujimon/{id}:
 *  delete:
 *    tags: [Sujimon]
 *    summary: Deletes a sujimon.
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Sujimon ID (MongoID or id_num)
 *         schema:
 *           type: string
 *    responses:
 *      204:
 *        description: No content. Sujimon deleted successfully!
 *      404:
 *        description: Sujimon not found
 */
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
