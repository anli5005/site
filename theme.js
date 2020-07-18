const theme = {
    colors: {
        light: {
            primaryBackground: "#edf4ff",
            secondaryBackground: "#d0e1ff",
            secondary: "#737c98",
            primary: "#337bed",
            link: "#337bed",
            text: "#0f2d5b",
            darkBackground: "#25416c"
        },
        dark: {
            primaryBackground: "#111c35",
            secondaryBackground: "#25416c",
            secondary: "#737c98",
            primary: "#337bed",
            link: "#6b9eed",
            text: "#d0e1ff",
            darkBackground: "#25416c"
        },
        names: [
            ["primaryBackground", "site-bg"],
            ["secondaryBackground", "site-bg2"],
            ["link", "site-link"],
            ["text", "site-text"],
            ["darkBackground", "site-dark-bg"]
        ],
        primary: "#337bed",
        secondary: "#737c98"
    },
    spacing: {
        none: "0",
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "3rem"
    }
};

theme.colors.names.forEach(([key, value]) => theme.colors[key] = `var(--${value})`);

export default theme;