import { configuration } from '../configuration';
import chalk from "chalk";
import { rimrafSync } from "rimraf";

(async () => {
    const {filesToClean} = configuration;
    try {
        filesToClean.forEach((pattern) => {
            rimrafSync(pattern)
        })
    } catch (error: unknown) {
        console.log(chalk.red(`Cleaning the files has failed.`));

        throw error;
    }
})()
