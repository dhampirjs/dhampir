import merge from "webpack-merge";
import BUILD_MODES from "../common/constants";
import webpack from "webpack";
import path from 'path';

import HTMLPlugin from "html-webpack-plugin"
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin"

import devConfig from "./env/dev";
import prodConfig from "./env/prod";
import testConfig from "./env/test";
import { configuration } from "../../configuration";

let envMapping = {
    [BUILD_MODES.DEV]: devConfig,
    [BUILD_MODES.PROD]: prodConfig,
    [BUILD_MODES.TEST]: testConfig,
};

export default function webpackConfigFactory(props) {
    let {
        projectDir,
        source,
        dist,
        mountPoint,
        title,
        mode,
    } = props;

    console.log(`Running mode is: ${mode}`);
    let envConfig = envMapping[mode];

    if (!envConfig) {
        console.warn(`Building mode is not set or is incorrect. Check NODE_ENV variable. Falling back to 'production'`);
        mode = BUILD_MODES.PROD;
        envConfig = envMapping[mode];
    }

    let commonConfig = {
        mode: mode,
        // entry: {
        //     vendors: [
        //         "react",
        //         "react-dom",
        //     ]
        // },
        optimization: {
            moduleIds: "named",
            emitOnErrors: false,
            chunkIds: 'named',
        },
        experiments: {
            // outputModule: true,
            // syncWebAssembly: true,
            // topLevelAwait: true,
            // asyncWebAssembly: true,
            // layers: true,
            // lazyCompilation: true,
        },
        output: {
            path: dist,
            filename: "index.js",
            libraryTarget: 'commonjs',
        },
        resolve: {
            modules: [
                projectDir,
                source,
                "node_modules",
            ],
            extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx", ".css", ".less", ".dev.js"],
            plugins: [new TsconfigPathsPlugin()]
        },
        module: {
            rules: [
                // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
                {
                    test: /\.(tsx|ts)$/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/env", {}, "@babel/react", {}],
                                plugins: mode === BUILD_MODES.DEV ?
                                    ["react-hot-loader/babel"] :
                                    []
                            }
                        },
                        "ts-loader"
                    ],
                    exclude: "/node_modules/"
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: 'webpack-typings-for-css'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: {
                                    exportLocalsConvention: "camelCaseOnly"
                                },
                            }
                        }, {
                            loader: "less-loader",
                            options: {
                                sourceMap: true,
                                lessOptions: {
                                    javascriptEnabled: true,
                                },
                            },
                        }
                    ],
                },
                /*{
                    test: /\.(eot|otf|svg|ttf|woff|woff2)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: "/assets/[name].[ext]"
                        }
                    }
                }*/
            ]
        },
        // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(mode)
                }
            }),
           /* new HTMLPlugin({
                template: path.join(__dirname, './template/index.ejs'),
                filename: 'index.html',
                favicon: "src/static/favicon.ico",
                title: title,
                hash: true,
                appMountIds: [mountPoint],
                baseHref: '/',
                minify: {
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    useShortDoctype: true,
                    collapseWhitespace: false,
                },
                showErrors: true,
                inject: false,
            }),*/
        ]
    };

    return merge(commonConfig, envConfig(props));
};
