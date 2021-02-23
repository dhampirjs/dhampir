import {run} from 'jest-cli';

/**
 * Setup a server.
 * @module jest
 * @param {Object} options Build options.
 */
export default function (options) {
    const {jest} = options;
    return (cb) => {
        run([], jest.configFile)
            .then(() => {
                cb && cb();
            })
            .catch((error) => {
                cb && cb(error);
            });
    }
};
