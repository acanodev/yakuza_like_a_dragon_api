module.exports = (data) => {
    if (!data.name || typeof data.name !== "string") {
        return "Name must be a string";
    }

    if (isNaN(data.id_num) || data.id_num < 1) {
        return "id_num must be a number greater than 0";
    }

    if (!data.category || typeof data.category !== "string") {
        return "Category must be a string";
    }

    if (isNaN(data.rarity) || data.rarity < 1) {
        return "Rarity must be a number greater than 0";
    }
}