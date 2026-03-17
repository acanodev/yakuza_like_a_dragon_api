const sujimon = require("../models/Sujimon");

module.exports = async (data, idToIgnore) => {

  let idNumToIgnore = null;

  if (!isNaN(idToIgnore)) {
    idNumToIgnore = Number(idToIgnore);
  } else if (idToIgnore) {
    const existing = await sujimon.findById(idToIgnore);
    if (existing) {
      idNumToIgnore = existing.id_num;
    }
  }

  const sujimons = await sujimon.find({});
  const ids_num = sujimons
    .filter((el) => el.id_num !== idNumToIgnore)
    .map((el) => el.id_num);


  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    return "Name must be a string and not empty";
  }

  if (isNaN(data.id_num) || data.id_num < 1) {
    return "id_num must be a number greater than 0";
  }

  if (ids_num.includes(Number(data.id_num))) {
    return "id_num must be unique";
  }

  if (
    !data.category ||
    typeof data.category !== "string" ||
    data.category.trim() === ""
  ) {
    return "Category must be a string and not empty";
  }

  if (isNaN(data.rarity) || data.rarity < 1 || data.rarity > 5) {
    return "Rarity must be a number between 1 and 5";
  }

  if (
    !data.common_locations ||
    typeof data.common_locations !== "string" ||
    data.common_locations.trim() === ""
  ) {
    return "Common locations must be a string and not empty";
  }

  if (
    !data.skills ||
    typeof data.skills !== "string" ||
    data.skills.trim() === ""
  ) {
    return "Skills must be a string and not empty";
  }

  if (
    !data.weaknesses ||
    typeof data.weaknesses !== "string" ||
    data.weaknesses.trim() === ""
  ) {
    return "Weaknesses must be a string and not empty";
  }

  if (
    data.drops &&
    (typeof data.drops !== "string" || data.drops.trim() === "")
  ) {
    return "Drops must be a string or undefined";
  }

  if (data.image && typeof data.image === "string") {
    try {
      new URL(data.image);
    } catch {
      return "Invalid URL";
    }
  }

  if (data.description && typeof data.description !== "string") {
    return "Description must be a string";
  }

  return null;
};
