import BUILD_MODES from "../common/constants";
import open from 'open';
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import dev from 'webpack-dev-middleware';
import hot from 'webpack-hot-middleware';
import webpackConfigFactory from '../webpack/config-factory';
/**
 * Setup a server.
 * @module serve
 * @param {Object} options Build options.
 * @param {Object} gulp Instance of gulp.
 */
export default function (options) {
    const app = express();

    let {
        server,
        paths,
    } = options;

    let webpackConfig = webpackConfigFactory(options);


    return function (cb) {
        let compiler = webpack(webpackConfig);

        app.use(dev(compiler, {
            publicPath: "/"
        }));

        app.use(hot(compiler));

        serve(cb);

        function serve(callback) {
            //Middleware
            app.use(express.static(path.join(paths.dist, '/assets')));

            //Routing. Order does matter
            app.get('/favicon.ico', function (req, res) {
                res.sendFile(path.join(paths.dist, 'favicon.ico'));
            });

            app.get('*', function (req, res) {
                res.sendFile(path.join(paths.dist, 'index.html'));
            });

            //Starting
            app.listen(server.port, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    open(`http://${server.host}:${server.port}/`);
                }
            });

            callback && callback();
        }
    };
};
