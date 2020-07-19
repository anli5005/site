const theme = {
    colors: {
        light: {
            primaryBackground: "#edf4ff",
            secondaryBackground: "#d0e1ff",
            secondary: "#737c98",
            primary: "#337bed",
            link: "#337bed",
            text: "#0f2d5b",
            aboutGradientStart: "#1db673",
            aboutGradientEnd: "#1b7d52",
            blogGradientStart: "#ed930c",
            blogGradientEnd: "#b57007",
            portfolioGradientStart: "#0a9aff",
            portfolioGradientEnd: "#0367ad",
            contactGradientStart: "#ff0000",
            contactGradientEnd: "#911d32",
            moreGradientStart: "#aaaaaa",
            moreGradientEnd: "#555555"
        },
        dark: {
            primaryBackground: "#111c35",
            secondaryBackground: "#25416c",
            secondary: "#737c98",
            primary: "#337bed",
            link: "#6b9eed",
            text: "#d0e1ff",
            aboutGradientStart: "#0ee386",
            aboutGradientEnd: "#1db673",
            blogGradientStart: "#ffd24d",
            blogGradientEnd: "#ed930c",
            portfolioGradientStart: "#79beef",
            portfolioGradientEnd: "#3dafff",
            contactGradientStart: "#ff596f",
            contactGradientEnd: "#ff4444",
            moreGradientStart: "#bbbbbb",
            moreGradientEnd: "#888888"
        },
        names: [
            ["primaryBackground", "site-bg"],
            ["secondaryBackground", "site-bg2"],
            ["link", "site-link"],
            ["text", "site-text"],
            ["aboutGradientStart", "about-0"],
            ["aboutGradientEnd", "about-1"],
            ["blogGradientStart", "blog-0"],
            ["blogGradientEnd", "blog-1"],
            ["portfolioGradientStart", "projects-0"],
            ["portfolioGradientEnd", "projects-1"],
            ["contactGradientStart", "contact-0"],
            ["contactGradientEnd", "contact-1"],
            ["moreGradientStart", "more-0"],
            ["moreGradientEnd", "more-1"]
        ],
        primary: "#337bed",
        secondary: "#737c98",
        darkBackground: "#25416c",
        contactAccent: "#ff0000",
        blogAccent: "#ed930c",
        moreAccent: "#aaaaaa",
        portfolioAccent: "#79beef"
    },
    spacing: {
        none: "0",
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "3rem"
    }, 
    breakpoints: {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200
    }
};

theme.colors.names.forEach(([key, value]) => theme.colors[key] = `var(--${value})`);

export default theme;