const mainCharacter = require("../models/Main_Character");

module.exports = async (data, idToIgnore) => {
  const mcs = await mainCharacter.find({});
  const ids_num = mcs
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

  if (data.jobs && (typeof data.jobs !== "string" || data.jobs.trim() === "")) {
    return "Drops must be sended as string";
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
