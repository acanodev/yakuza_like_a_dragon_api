module.exports = (data) => {
  if (!data.name || typeof data.name !== "string") {
    return "Name must be a string";
  }

  if (isNaN(data.id_num) || data.id_num < 1) {
    return "id_num must be a number greater than 0";
  }

  return null;
};
