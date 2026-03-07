const { Schema, model } = require("mongoose");

const mainCharacterSchema = new Schema({
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
    jobs:
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
    }
})

const mainCharacter = model('mainCharacter', mainCharacterSchema);
module.exports = mainCharacter;