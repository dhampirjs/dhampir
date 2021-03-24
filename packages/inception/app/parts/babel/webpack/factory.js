export default function webpackConfigFactory(options) {
    let {
        useTypescript,
        useBabel
    } = options;

    return {
        entry: {
            vendors: [
                "@babel/polyfill",
            ]
        },
        module: {
            rules: [
                (useTypescript) ? {
                    test: /\.(tsx|ts)$/,
                    use: [
                        (useBabel) && {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/env", {}],
                            }
                        },
                        "ts-loader"
                    ],
                    exclude: "/node_modules/"
                } : {}
            ]
        },
    };
};
