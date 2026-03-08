module.exports = (data) => {
  if (!data.name || typeof data.name !== "string") {
    return "Name must be a string";
  }

  if (isNaN(data.id_num)) {
    return "id_num must be a number";
  }

  return null;
};
