const menu_model = require('../models/menu_model');


async function get_all_menus(){

    const menus = await menu_model.get_all();

    return menus
}

async function get_menu_byname(name){

    const menus = await menu_model.get_menu_byname(name);

    return menus
}

async function get_menu_by_id(id){

    const menus = await menu_model.get_menu_by_id(id);

    return menus
}

async function get_menu_bycategory(category){

    const menus = await menu_model.get_menu_bycategory(category);

    return menus
}


async function add_image(imagePath) {
    try {
        const images = await menu_model.insert_image(imagePath);
        return images;
    } catch (error) {
        console.error("Error adding image:", error);
        throw new Error("Failed to add image.");
    }
}

module.exports = {get_all_menus, get_menu_byname, get_menu_by_id, get_menu_bycategory, add_image}