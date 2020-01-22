/**
 * Copyright © 2019-present, Pulsar.
 *
 * This source code is licensed under the MIT license. Please, find the
 * LICENSE file in the root directory of this repository.
 */

'use strict';

import * as yargs from 'yargs';
import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';

process.on('unhandledRejection', (reason: {} | null | undefined, promise: Promise<any>) => {
    throw new Error(reason as string);
});

const args = yargs
    .option('scope', {
        alias: "s",
        describe: 'Enter project name. Is used to create folder where package will live.',
        type: "string",
    })
    .option('use-yarn-ws', {
        describe: 'Initialize project with yarn workspaces.',
        type: "boolean",
    })
    .option('profile', {
        alias: 'p',
        describe: '',
        type: "string",
    })
    .option('install', {
        alias: 'i',
        describe: 'Defines if dependencies should be installed during project generation.',
        type: "boolean",
    })
    .argv;


