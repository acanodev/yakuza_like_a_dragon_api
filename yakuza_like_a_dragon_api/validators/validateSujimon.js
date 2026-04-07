const sujimon = require("../models/Sujimon");

module.exports = async (request, data, idToIgnore) => {

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
    return request.__("validate_sujimon_name");
  }

  if (isNaN(data.id_num) || data.id_num < 1) {
    return request.__("validate_sujimon_id_num_gt_0");
  }

  if (ids_num.includes(Number(data.id_num))) {
    return request.__("validate_sujimon_id_num_unique");
  }

  if (
    !data.category ||
    typeof data.category !== "string" ||
    data.category.trim() === ""
  ) {
    return request.__("validate_sujimon_category");
  }

  if (isNaN(data.rarity) || data.rarity < 1 || data.rarity > 5) {
    return request.__("validate_sujimon_rarity");
  }

  if (
    !data.common_locations ||
    typeof data.common_locations !== "string" ||
    data.common_locations.trim() === ""
  ) {
    return request.__("validate_sujimon_common_locations");
  }

  if (
    !data.skills ||
    typeof data.skills !== "string" ||
    data.skills.trim() === ""
  ) {
    return request.__("validate_sujimon_skills");
  }

  if (
    !data.weaknesses ||
    typeof data.weaknesses !== "string" ||
    data.weaknesses.trim() === ""
  ) {
    return request.__("validate_sujimon_weaknesses");
  }

  if (
    data.drops &&
    (typeof data.drops !== "string" || data.drops.trim() === "")
  ) {
    return request.__("validate_sujimon_drops");
  }

  if (data.image && typeof data.image === "string") {
    try {
      new URL(data.image);
    } catch {
      return request.__("validate_sujimon_image");
    }
  }

  if (data.description && typeof data.description !== "string") {
    return request.__("validate_sujimon_description");
  }

  return null;
};
