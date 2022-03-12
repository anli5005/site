module.exports = {
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                "sage": {
                    "400": "#21d988",
                    "500": "#1db673",
                },
                "ocean": {
                    "50": "#edf4ff",
                    "100": "#d0e1ff",
                    "200": "#b0d5ff",
                    "400": "#0f7dff",
                    "500": "#096de3",
                    "700": "#065fc9",
                    "900": "#0a3463",
                    "950": "#111c35",
                    "1000": "#0a1224",
                },
                "grape": {
                    "400": "#9c45ff",
                    "600": "#8b24ff",
                    "800": "#7b10f3",
                }
            },
        },
        fontFamily: {
            sans: ["Europa", "europa", "ui-sans-serif", '"Helvetica Neue"', "Helvetica", "arial", "sans-serif"],
            serif: ["Adelle", "adelle", "ui-serif", '"Roboto Slab"', "Georgia", "serif"],
            mono: ['"Fira Code"', '"Fira Mono"', "ui-monospace", "Menlo", "Monaco", "Consolas", '"Liberation Mono"', '"Courier New"', "monospace"],
        },
    },
    plugins: [],
}
