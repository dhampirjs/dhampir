import { ESLint } from 'eslint';
import {configuration, Configuration} from "../configuration";

/**
 * Set up a server.
 * @module jest
 * @param {Object} options Build options.
 * @param fix Defines if ESLint should fix errors where it is possible
 */
async function check(options: Configuration, fix = false) {
    const { eslint, projectDir } = options;

    const cli = new ESLint({
        cwd: projectDir,
        fixTypes: ['problem', 'layout'],
        overrideConfigFile: eslint.configFile,
        fix
    })

    try {
        const results = await cli.lintFiles(eslint.pattern);

        const formatter = await cli.loadFormatter('stylish');
        console.log(formatter.format(results))
    } catch (error: unknown) {
        throw error;
    }
}

const toFix = process.argv[2] === '--fix';

(async function() {
    await check(configuration, toFix)
})();
