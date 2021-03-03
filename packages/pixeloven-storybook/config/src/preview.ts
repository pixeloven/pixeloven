export const parameters = {
    a11y: {
        config: {},
        options: {
            checks: {
                "color-contrast": {
                    options: {
                        noScroll: true,
                    },
                },
            },
            restoreScroll: true,
        },
    },
    backgrounds: {
        default: "transparent",
        values: [
            { name: "transparent", value: "transparent" },
            { name: "#000", value: "#000000" },
            { name: "#fff", value: "#fff" },
            { name: "#333", value: "#333333" },
            { name: "twitter", value: "#00aced" },
            { name: "facebook", value: "#3b5998" },
        ],
    },
};
