import webpackConfigFactory from '../webpack/config-factory';
import webpack from 'webpack';

/**
 * Package current project.
 * @module package-project
 * @param {Object} options Build options.
 */
export default function bundle(options) {
    return (done) => {
        webpack(webpackConfigFactory(options), (error, stats) => {
            console.log(stats.toString({
                chunks: false,
                colors: true
            }));

            if (error) {
                done(error);
            } else {
                done();
            }
        });
    }
}
