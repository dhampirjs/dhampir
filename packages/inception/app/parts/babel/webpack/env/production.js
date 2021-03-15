import webpack from "webpack";
import HTMLPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

import path from "path";

export default function prodConfig(options) {
    const {
        paths,
        title
    } = options;

    const {
        source,
        dist
    } = paths;

    return {
        entry: {
            app: [
                path.resolve(source, "index.tsx")
            ]
        },
        plugins: [
            new HTMLPlugin({
                template: path.resolve(source, "static/index.html"),
                filename: 'index.html',
                title: title,
                hash: true,
                minify: {
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    useShortDoctype: true,
                    collapseWhitespace: true
                },
                showErrors: true,
                inject: false
            }),
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false
            //     }
            // }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: "vendors",
            //     minChunks: Infinity
            // }),
            // new CompressionPlugin({
            //     asset: "[path].gz[query]",
            //     algorithm: "gzip",
            //     test: /\.(js|html|css)$/,
            //     threshold: 10240,
            //     minRatio: 0.4
            // }),
            new CopyWebpackPlugin([{from: path.resolve(source, "favicon.ico"), to: dist}], options)
        ],
        externals: {
            "React": "react",
            "ReactDOM": "react-dom"
        }
    };
};