const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const seedMainCharacters = require("./mainCharacterSeeder");
const seedSujimon = require("./sujimonSeeder");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB connected");

    await seedMainCharacters();
    await seedSujimon();

    console.log("Seeding finished");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();