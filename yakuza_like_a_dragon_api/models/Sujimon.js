const { Schema, model } = require("mongoose");

const sujimonSchema = new Schema({
    name:
    {
        type: String,
        required: true
    },
    id_num:
    {
        type: Number,
        required: true
    },
    common_locations:
    {
        type: [String],
        required: true
    },
    rarity:
    {
        type: Number,
        required: true
    },
    weaknesses:
    {
        type: [String],
        required: true
    },
    image:
    {
        type: String,
        default: null
    },
    description:
    {
        type: String,
        default: null
    },
})

const Sujimon = model('Sujimon', sujimonSchema);
module.exports = Sujimon;