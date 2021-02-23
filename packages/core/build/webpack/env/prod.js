import CompressionPlugin from "compression-webpack-plugin";

import { resolve } from "path";

export default function prodConfig(options) {
    const {
        source,
    } = options;

    return {
        entry: {
            index: [
                resolve(source, "index.ts")
            ]
        },
        plugins: [
            /*new CompressionPlugin({
                filename: "[path][base].gz[query]",
                algorithm: "gzip",
                test: /\.(js|html|css)$/,
                threshold: 10240,
                minRatio: 0.4,
            }),*/
        ],
        optimization: {
            minimize: true,
        },
        externals: {
            "React": "react",
            "ReactDOM": "react-dom"
        }
    };
};
