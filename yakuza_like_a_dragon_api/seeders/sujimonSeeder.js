const Sujimon = require("../models/Sujimon");

async function seedSujimon() {
  const count = await Sujimon.countDocuments();

  /* Evitar afegir seeders si ja tenim dades existents per evitar IDs duplicades o qualsevol altre error 
  relacionat amb les entrades de dades.*/
  if (count > 0) {
    console.log("Existing Sujimon found! Aborting database seeding!");
    return;
  }

  const sujimons = [
    {
      _id: "69b6a3c0d040b007cc2ab2b7",
      name: "Subjugation-kun",
      id_num: 132,
      category: "Security",
      common_locations: ["Sotenbori Battle Arena Floor 12"],
      rarity: 3,
      skills: ["Golpear"],
      weaknesses: ["Electric"],
      drops: ["a"],
      image:
        "https://static.wikia.nocookie.net/yakuza/images/a/ac/Subjugation-kun_Icon.png/revision/latest?cb=20201224140338",
      description: "In the Field: A gray hoodie with a face mask.",
      __v: 0,
    },
    {
      _id: "69b68ef5d040b007cc2ab2aa",
      name: "Pseudotrash",
      id_num: 200,
      category: "Trash Monsters",
      common_locations: ["Isezaki Ijincho"],
      rarity: 1,
      skills: ["string"],
      weaknesses: ["string"],
      drops: ["string"],
      image:
        "https://static.wikia.nocookie.net/yakuza/images/9/9d/Pseudotrash_Icon.png/revision/latest/thumbnail/width/360/height/450?cb=20201224134617",
      description: "",
      __v: 0,
    },
  ];

  await Sujimon.insertMany(sujimons);

  console.log("Sujimon seeded");
}

module.exports = seedSujimon;
