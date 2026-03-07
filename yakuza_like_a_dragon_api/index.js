require("dotenv").config();
require("./mongo");

const express = require("express");
const app = express();
const cors = require("cors");

const mainCharacter = require("./models/Main_Character");
const sujimon = require("./models/Sujimon");
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
    name: mc.name,
    id_num: mc.id_num,
    jobs: mc.jobs.split(","),
    image: mc.image ?? null,
    description: mc.description ?? null,
  });

  try {
    await newMC.save();
    response.json(newMC);
  } catch (error) {
    next(error);
  }
});

/*====SUJIMON ENDPOINTS====*/

app.use(handleErrors);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
