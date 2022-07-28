import WPAPI from "wpapi";

export function getAPI(): WPAPI {
    const api = new WPAPI({
        endpoint: "https://wp.anli.dev/wp-json",
    });
    api.courses = api.registerRoute("wp/v2", "courses");
    api.classnotes = api.registerRoute("wp/v2", "classnotes");
    api.projects = api.registerRoute("wp/v2", "project");
    return api;
}