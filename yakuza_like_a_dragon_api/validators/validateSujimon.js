const sujimon = require("../models/Sujimon");

module.exports = async (data, idToIgnore) => {
  const sujimons = await sujimon.find({});
  const ids_num = sujimons
    .filter((el) => el.id_num !== idToIgnore)
    .map((el) => el.id_num);

  if (!data.name || typeof data.name !== "string") {
    return "Name must be a string";
  }

  if (isNaN(data.id_num) || data.id_num < 1) {
    return "id_num must be a number greater than 0";
  }

  if (ids_num.includes(Number(data.id_num))) {
    return "id_num must be unique";
  }

  if (!data.category || typeof data.category !== "string") {
    return "Category must be a string";
  }

  if (isNaN(data.rarity) || data.rarity < 1) {
    return "Rarity must be a number greater than 0";
  }

  if (data.image && typeof data.image === "string") {
    try {
      new URL(data.image);
    } catch {
      return "Invalid URL";
    }
  }
};
