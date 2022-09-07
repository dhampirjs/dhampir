import {run} from 'jest-cli';

/**
 * Setup a server.
 * @module jest
 * @param {Object} options Build options.
 */
export default function (options) {
    const {jest} = options;
    return async (cb) => {
        try {
            await run([], jest.configFile);
            cb && cb();
        } catch (e) {
            cb && cb(error);
        }
    }
};
