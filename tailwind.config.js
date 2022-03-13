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
                    "300": "#94c6ff",
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
            typography: ({theme}) => ({
                ocean: {
                    css: {
                        "--tw-prose-body": theme("colors.ocean[950]"),
                        "--tw-prose-headings": theme("colors.ocean[950]"),
                        "--tw-prose-lead": theme("colors.ocean[950]"),
                        "--tw-prose-links": theme("colors.ocean[500]"),
                        "--tw-prose-bold": theme("colors.ocean[950]"),
                        "--tw-prose-counters": theme("colors.ocean[950]"),
                        "--tw-prose-bullets": theme("colors.ocean[900]"),
                        "--tw-prose-hr": theme("colors.ocean[100]"),
                        "--tw-prose-quotes": theme("colors.ocean[950]"),
                        "--tw-prose-quote-borders": theme("colors.ocean[100]"),
                        "--tw-prose-captions": theme("colors.ocean[950]"),
                        "--tw-prose-code": theme("colors.ocean[950]"),
                        "--tw-prose-pre-code": theme("colors.ocean[950]"),
                        "--tw-prose-pre-bg": theme("colors.ocean[950]"),
                        "--tw-prose-th-borders": theme("colors.ocean[100]"),
                        "--tw-prose-td-borders": theme("colors.ocean[100]"),
                        "--tw-prose-invert-body": theme("colors.ocean[100]"),
                        "--tw-prose-invert-headings": theme("colors.ocean[100]"),
                        "--tw-prose-invert-lead": theme("colors.ocean[100]"),
                        "--tw-prose-invert-links": theme("colors.ocean[300]"),
                        "--tw-prose-invert-bold": theme("colors.ocean[100]"),
                        "--tw-prose-invert-counters": theme("colors.ocean[100]"),
                        "--tw-prose-invert-bullets": theme("colors.ocean[200]"),
                        "--tw-prose-invert-hr": theme("colors.gray[600]"),
                        "--tw-prose-invert-quotes": theme("colors.ocean[100]"),
                        "--tw-prose-invert-quote-borders": theme("colors.gray[600]"),
                        "--tw-prose-invert-captions": theme("colors.ocean[100]"),
                        "--tw-prose-invert-code": theme("colors.ocean[100]"),
                        "--tw-prose-invert-pre-code": theme("colors.ocean[100]"),
                        "--tw-prose-invert-pre-bg": theme("colors.ocean[100]"),
                        "--tw-prose-invert-th-borders": theme("colors.gray[600]"),
                        "--tw-prose-invert-td-borders": theme("colors.gray[600]"),
                    }
                }
            }),
        },
        fontFamily: {
            sans: ["Europa", "europa", "ui-sans-serif", '"Helvetica Neue"', "Helvetica", "arial", "sans-serif"],
            serif: ["Adelle", "adelle", "ui-serif", '"Roboto Slab"', "Georgia", "serif"],
            mono: ['"Fira Code"', '"Fira Mono"', "ui-monospace", "Menlo", "Monaco", "Consolas", '"Liberation Mono"', '"Courier New"', "monospace"],
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
    ],
}
