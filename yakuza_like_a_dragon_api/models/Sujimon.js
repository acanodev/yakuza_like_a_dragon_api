const { Schema, model } = require("mongoose");

const sujimonSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id_num: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    common_locations: {
      type: [String],
      required: true,
    },
    rarity: {
      type: Number,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    weaknesses: {
      type: [String],
      required: true,
    },
    drops: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

const Sujimon = model("Sujimon", sujimonSchema);
module.exports = Sujimon;
