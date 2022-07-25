module.exports = {
    async redirects() {
        const paged = [
            "/blog",
        ];

        return [
            ...paged.map(path => {
                return {
                    source: `${path}/page/1`,
                    destination: path,
                    permanent: true,
                };
            }),
            {
                source: "/Sorts",
                destination: "/Sorts/index.html",
                permanent: true
            },
            {
                source: "/Sorts/sort",
                destination: "/Sorts/sort/index.html",
                permanent: true
            },
            {
                source: "/Sorts/sort/activities",
                destination: "/Sorts/sort/activities/index.html",
                permanent: true
            },
            {
                source: "/Sorts/sort/edit",
                destination: "/Sorts/sort/edit/index.html",
                permanent: true
            },
            {
                source: "/hand-sanitizer-game",
                destination: "https://code.anli.dev/hand-sanitizer-game",
                permanent: true
            },
            {
                source: "/contact",
                destination: "/about#contact",
                permanent: true
            }
        ];
    }
};