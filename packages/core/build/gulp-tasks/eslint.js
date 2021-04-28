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

        const fileList = glob.sync(eslint.pattern, {
            cwd: projectDir,
        });

        cli.lintFiles(fileList)
            .then((results) => {
                const formatter = cli.loadFormatter('stylish').then((formatter) => {
                    console.log(formatter.format(results));
                });
                cb && cb();
            })
            .catch((error) => {
                cb && cb(error);
            });
    }
};
