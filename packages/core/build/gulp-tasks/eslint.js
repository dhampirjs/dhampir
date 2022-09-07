import { ESLint } from 'eslint';
import glob from 'glob';

/**
 * Setup a server.
 * @module jest
 * @param {Object} options Build options.
 */
export default function (options, fix = false) {
    const { eslint, projectDir } = options;
    return (cb) => {
        const cli = new ESLint({
            cwd: projectDir,
            fixTypes: ['problem', 'layout'],
            overrideConfigFile: eslint.configFile,
            fix
        })

        cli.lintFiles(eslint.pattern)
            .then(async (results) => {
                try {
                    const formatter = await cli.loadFormatter('stylish');
                    console.log(formatter.format(results))
                    cb && cb();
                } catch (e) {
                    cb && cb(e);
                }

            })
            .catch((error) => {
                cb && cb(error);
            });
    }
};
