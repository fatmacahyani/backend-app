async function update_menu_image(menu_id, imagePath) {
    try {
        const result = await menu_model.update_imagePath(menu_id, imagePath);
        return {
            success: true,
            message: "imagePath updated successfully.",
            data: result,
        };
    } catch (error) {
        console.error("Error updating imagePath:", error);
        return {
            success: false,
            message: "Failed to update imagePath.",
        };
    }
}

module.exports = { update_menu_image };
