import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

// Creates a new item to a shopping list specified by request path with information from form
const createItem = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await itemService.createItem(urlParts[2], name);

    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

// Changes items collected value to true where list and item are specified with request path
const collectItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await itemService.collectItem(urlParts[2], urlParts[4]);

    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
}

export { createItem, collectItem };