module.exports = {
    async redirects() {
        return [
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
            }
        ];
    }
};