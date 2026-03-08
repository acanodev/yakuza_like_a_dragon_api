module.exports = (data) => {
    if (!data.name || typeof data.name !== "string") {
        return "Name must be a string";
    }

    if (isNaN(data.id_num)) {
        return "id_num must be a number";
    }

    if (!data.category || typeof data.category !== "string") {
        return "Category must be a string";
    }

    if (isNaN(data.rarity) || data.rarity < 1) {
        return "Rarity must be a number greater than 0";
    }
}