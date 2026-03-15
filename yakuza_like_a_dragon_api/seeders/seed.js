const mongoose = require("mongoose");
const seedMainCharacters = require("./mainCharacterSeeder");
const seedSujimon = require("./sujimonSeeder");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

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