import { executeQuery } from "../database/database.js";

// Creates a new item to a shopping list specified by id parameter with name specified by name parameter
const createItem = async (id, name) => {
    await executeQuery(`INSERT INTO shopping_list_items (shopping_list_id, name) 
                        VALUES ($shoppingListId, $name);`, { shoppingListId: id, name: name, });
}

// Finds all items in list specified by id parameter and orders them in order of collected value and name value
const findAllItems = async (id) => {
    let result = await executeQuery(`SELECT * FROM shopping_list_items 
                                    WHERE shopping_list_id = $shoppingListId
                                    ORDER BY collected, name;`, { shoppingListId: id, });
    return result.rows;

};

// Query to change the collected value to true of a item specified by parameter item_id from list specified by parameter shopping_list_id
const collectItem = async (shopping_list_id, item_id) => {
    await executeQuery(`UPDATE shopping_list_items SET collected = true 
                        WHERE id = $itemId AND shopping_list_id = $shoppingListId; `,
                        { itemId: item_id, shoppingListId: shopping_list_id, });
};

// Query to count all items with aggregate query
const countItems = async () => {
    const result = await executeQuery("SELECT COUNT(*) FROM shopping_list_items;");
    return result.rows[0].count;
}

export { findAllItems, createItem, collectItem, countItems };