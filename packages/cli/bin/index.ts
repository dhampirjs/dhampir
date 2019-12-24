#!/usr/bin/env node
import * as spawn from 'cross-spawn';
import parseArguments from '../lib/utils/parseArguments';
import { actionList } from '../lib/constants/actions';
import printHelp from '../lib/utils/printHelp';

process.on('unhandledRejection', (reason: {} | null | undefined, promise: Promise<any>) => {
    throw new Error(reason as string);
});

let [nodeArgs, action, params] = parseArguments(process.argv.slice(2));

if (actionList.includes(action)) {
    const result = spawn.sync(
        'node',
        [...nodeArgs, require.resolve(`../actions/${action}.js`), params],
        { stdio: 'inherit' }
    );

    if (result.signal) {
        if (result.signal === "SIGKILL" || result.signal ==="SIGTERM") {
            console.log('The build failed because the process exited too early. Probably because of running out of memory or sending kill signal to the process.');
        }

        process.exit(0);
    }
    process.exit(result.status!);
} else {
    if(action) {
        console.log(`Action "${action}" does not exist.`);
    } else {
        console.log("Please, specify action. Action can't be empty.");
    }
    printHelp();
}
