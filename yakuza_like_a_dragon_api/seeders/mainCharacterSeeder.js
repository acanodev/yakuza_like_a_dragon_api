const MainCharacter = require("../models/Main_Character");

async function seedMainCharacters() {
  const count = await MainCharacter.countDocuments();

  /* Evitar afegir seeders si ja tenim dades existents per evitar IDs duplicades o qualsevol altre error 
  relacionat amb les entrades de dades.*/
  if (count > 0) {
    console.log("Existing Main Characters found! Aborting database seeding!");
    return;
  }

  const characters = [
    {
      _id: "69ac518b95865be81f2e8eb6",
      name: "Ichiban Kasuga",
      id_num: 1,
      jobs: ["Heroe", "Freelancer", "Capataz"],
      image:
        "https://preview.redd.it/whats-one-thing-you-hate-about-ichiban-kasuga-v0-4i9d5cufs9tc1.jpeg?auto=webp&s=7869dc53634b49f68b8a671daf26dbdfddb06f6f",
      description: "Ex member from the Arakawa Family",
      __v: 0,
      birth_date: "1977-01-01",
      isPlayable: true,
    },
    {
      _id: "69b33e19de6207432c830a56",
      name: "Koichi Adachi",
      id_num: 2,
      jobs: ["Detective", "Enforcer"],
      image:
        "https://static.wikia.nocookie.net/yakuza/images/7/70/Kouichi_Adachi_02.jpg/revision/latest/scale-to-width-down/1000?cb=20190916084415",
      description: "Ex police officer",
      __v: 0,
      birth_date: "1960-09-30",
      isPlayable: true,
    },
    {
      _id: "69b33fb3de6207432c830a61",
      name: "Yu Nanba",
      id_num: 3,
      jobs: ["Homeless Guy", "Nurse", "Musician"],
      image:
        "https://static.wikia.nocookie.net/yakuza/images/e/ee/YLAD_-_Character_Profile_-_Yu_Nanba.png/revision/latest/scale-to-width-down/1000?cb=20211225215017",
      description: "",
      __v: 0,
      birth_date: "1978-02-01",
      isPlayable: true,
    },
    {
      _id: "69b3408cde6207432c830a66",
      name: "Saeko Mukoda",
      id_num: 4,
      jobs: ["Barmaid"],
      image:
        "https://static.wikia.nocookie.net/yakuza/images/5/51/YLAD_-_Character_Profile_-_Saeko_Mukoda.png/revision/latest/scale-to-width-down/1000?cb=20211225220025",
      description: "",
      __v: 0,
      birth_date: "1991-07-29",
      isPlayable: true,
    },
    {
      _id: "69b341f2de6207432c830a6c",
      name: "Joongi Han",
      id_num: 5,
      jobs: ["Hitman"],
      image:
        "https://i.redd.it/whos-the-better-joon-gi-han-v0-dw4cv0oothbg1.jpg?width=1920&format=pjpg&auto=webp&s=1b7a2a92de66739c5697a189894a3516b794c0b2",
      description: "",
      __v: 0,
      birth_date: "1986-09-03",
      isPlayable: true,
    },
    {
      _id: "69b6adb3d040b007cc2ab2eb",
      name: "Tianyou Zhao",
      id_num: 6,
      jobs: ["Mafia"],
      image:
        "https://static.wikia.nocookie.net/yakuza/images/f/f9/YLAD_-_Character_Profile_-_Tianyou_Zhao.png/revision/latest/scale-to-width-down/1000?cb=20230605125251",
      description: "",
      __v: 0,
      birth_date: "1983-07-27",
      isPlayable: true,
    },
  ];

  await MainCharacter.insertMany(characters);

  console.log("MainCharacters seeded");
}

module.exports = seedMainCharacters;
