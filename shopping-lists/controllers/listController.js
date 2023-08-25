import { renderFile } from "../deps.js";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

// Response details to set content-type to HTML
const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

// Renders main page from main.eta file
const viewMainPage = async (request) => {
    const data = {
        lists: await listService.countLists(),
        items: await itemService.countItems(),
    }
    return new Response(await renderFile("main.eta", data), responseDetails);
};

// Finds all active lists and renders /lists page from lists.eta file
const viewLists = async (request) => {
    const data = {
        lists: await listService.findAllActiveLists(),
    }
    return new Response(await renderFile("lists.eta", data), responseDetails);
};

// Views a specific shopping list based on path
const viewList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const data = {
        list: await listService.findById(urlParts[2]),
        items: await itemService.findAllItems(urlParts[2]),
    }
    return new Response(await renderFile("list.eta", data), responseDetails);
};

// Adds a new list to the database based on user input on /lists page
const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await listService.create(name);

    return requestUtils.redirectTo("/lists");
}

// Delete a list specified by user clicking deactivate button on /lists page
const deleteList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const id = urlParts[2];
    await listService.deleteById(id);
    return requestUtils.redirectTo("/lists");
}

export { viewMainPage, viewLists, addList, viewList, deleteList };