import { executeQuery } from "../database/database.js";

// Query to find all shopping lists from the database with active value set to true
const findAllActiveLists = async () => {
    let result = await executeQuery(
        "SELECT * FROM shopping_lists WHERE active = true;"
    );

    return result.rows;
}

// Query to create a new shopping list to the database
const create = async (name) => {
    await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name);", { name: name, });
}

// Query to find a specific shopping list from the database based on parameter id
const findById = async (id) => {
    let result = await executeQuery("SELECT * FROM shopping_lists WHERE id = $id;", { id: id, });

    if (result.rows && result.rows.length > 0) {
        return result.rows[0];
    } else {
        return { id: 0, name: "Unknown", }
    }
};

// Query to set shopping list's active value to false based on parameter id
const deleteById = async (id) => {
    await executeQuery("UPDATE shopping_lists SET active = false WHERE id = $id;", { id: id, });
}

// Quary to count lists with aggregate query
const countLists = async () => {
    const result = await executeQuery("SELECT COUNT(*) FROM shopping_lists;");
    return result.rows[0].count;
}

export { findAllActiveLists, create, findById, deleteById, countLists };