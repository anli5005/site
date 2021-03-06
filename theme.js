const theme = {
    colors: {
        light: {
            primaryBackground: "#edf4ff",
            secondaryBackground: "#d0e1ff",
            cardBackground: "white",
            secondary: "#737c98",
            primary: "#337bed",
            link: "#337bed",
            text: "#0f2d5b",
            textSecondary: "rgba(15, 45, 91, 0.5)",
            textMuted: "rgba(15, 45, 91, 0.5)",
            aboutGradientStart: "#12945b",
            aboutGradientEnd: "#1b7d52",
            blogGradientStart: "#c4801a",
            blogGradientEnd: "#b57007",
            portfolioGradientStart: "#0b82d6",
            portfolioGradientEnd: "#0367ad",
            contactGradientStart: "#cc0000",
            contactGradientEnd: "#911d32",
            moreGradientStart: "#555555",
            moreGradientEnd: "#333333"
        },
        dark: {
            primaryBackground: "#111c35",
            secondaryBackground: "#25416c",
            cardBackground: "#0f2d5b",
            secondary: "#737c98",
            primary: "#337bed",
            link: "#82b4ff",
            text: "#d0e1ff",
            textSecondary: "rgba(208, 255, 255, 0.5)",
            textMuted: "rgba(208, 225, 255, 0.5)",
            aboutGradientStart: "#0ee386",
            aboutGradientEnd: "#1db673",
            blogGradientStart: "#ffd24d",
            blogGradientEnd: "#ed930c",
            portfolioGradientStart: "#79beef",
            portfolioGradientEnd: "#3dafff",
            contactGradientStart: "#ff596f",
            contactGradientEnd: "#ff4444",
            moreGradientStart: "#bbbbbb",
            moreGradientEnd: "#999999"
        },
        names: [
            ["primaryBackground", "site-bg"],
            ["secondaryBackground", "site-bg2"],
            ["cardBackground", "site-card-bg"],
            ["link", "site-link"],
            ["text", "site-text"],
            ["textSecondary", "site-text-secondary"],
            ["textMuted", "site-text-muted"],
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
    },
    fonts: {
        heading: '"Europa", europa, "Helvetica Neue", "Helvetica", arial, sans-serif',
        body: '"Adelle", adelle, "Roboto Slab", "Times New Roman", serif'
    },
    shadows: {
        md: "0 .5rem 1rem rgba(0,0,0,.15)",
        lg: "0 1rem 3rem rgba(0,0,0,.175)"
    }
};

theme.colors.names.forEach(([key, value]) => theme.colors[key] = `var(--${value})`);

export default theme;