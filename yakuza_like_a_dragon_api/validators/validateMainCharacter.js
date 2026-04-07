module.exports = async (request, data) => {
  if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
    return request.__("validate_mc_name");
  }

  if (data.jobs && (typeof data.jobs !== "string" || data.jobs.trim() === "")) {
    return request.__("validate_mc_jobs");
  }

  if (data.image && typeof data.image === "string") {
    try {
      new URL(data.image);
    } catch {
      return request.__("validate_mc_image");
    }
  }

  if (data.description && typeof data.description !== "string") {
    return request.__("validate_mc_description");
  }

  if (data.birth_date && isNaN(Date.parse(data.birth_date))) {
    return request.__("validate_mc_birth_date");
  }

  if (data.isPlayable !== undefined && typeof data.isPlayable !== "boolean") {
    return request.__("validate_mc_is_playable");
  }

  return null;
};
