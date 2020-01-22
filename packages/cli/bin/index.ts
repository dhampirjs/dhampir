#!/usr/bin/env node

import * as spawn from 'cross-spawn';
import * as chalk from 'chalk';
import parseArguments from '../lib/utils/packaging/parseArguments';
import printHelp from '../lib/utils/printHelp';
import { ACTION_LIST } from '../lib/constants/actions';

process.on('unhandledRejection', (reason: {} | null | undefined, promise: Promise<any>) => {
    throw new Error(reason as string);
});

let [nodeArgs, action, params] = parseArguments(process.argv.slice(2));

if (ACTION_LIST.includes(action)) {
    const result = spawn.sync(
        'node',
        [...nodeArgs, require.resolve(`../actions/${action}.js`), ...params],
        { stdio: 'inherit' }
    );

    if (result.signal) {
        if (result.signal === 'SIGKILL' || result.signal === 'SIGTERM') {
            console.log(chalk.redBright('The build has failed because the process exited too early.'));
            console.log(chalk.redBright('Probably because of running out of memory or sending kill signal to the process.'));
        }

        process.exit(0);
    }

    process.exit(result.status!);
} else {
    if(action) {
        console.log(chalk.blueBright(`Action "${action}" does not exist.`));
    } else {
        console.log(chalk.blueBright(`Please, specify action. Action can't be empty.`));
    }
    printHelp();
    process.exit(1);
}
