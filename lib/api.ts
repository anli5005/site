import WPAPI from "wpapi";

export function getAPI(): WPAPI {
    return new WPAPI({
        endpoint: "https://wp.anli.dev/wp-json",
    });
}