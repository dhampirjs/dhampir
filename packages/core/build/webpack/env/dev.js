import HMRPlugin from "webpack/lib/HotModuleReplacementPlugin";
import CircularDependencyPlugin from "circular-dependency-plugin";

import path from "path";

export default function devConfig(options) {
    const {
        paths,
        server,
    } = options;

    const {
        source
    } = paths;

    // let middlewareEntry = "webpack-hot-middleware/client?http://" + server.host + ":" + server.port;

    return {
        devtool: "source-map",
        // resolve: {
        //     alias: {
        //         'react-dom': '@hot-loader/react-dom'
        //     }
        // },
        entry: {
            index: [
                middlewareEntry,
                path.resolve(source, "index.ts")
            ],
/*
            vendors: [
                middlewareEntry
            ]
*/
        },
        plugins: [
            /*new HMRPlugin(),*/
            new CircularDependencyPlugin({
                // exclude detection of files based on a RegExp
                exclude: /a\.js|node_modules/,
                // include specific files based on a RegExp
                include: /src/,
                // add errors to webpack instead of warnings
                failOnError: false,
                // allow import cycles that include an asyncronous import,
                // e.g. via import(/* webpackMode: "weak" */ './file.js')
                allowAsyncCycles: true,
                // set the current working directory for displaying module paths
                cwd: path.normalize('../../..'),
            })
        ]
    }
}
