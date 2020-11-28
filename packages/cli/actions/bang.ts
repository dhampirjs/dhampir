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
import { createConfig } from '../lib/utils/parameters';
import { BangActionOptions, OPTIONS, REPO_NAME, TARGET_FOLDER } from '../lib/actions/bang';
import { bang, BangOptions } from '../../inception/lib';
import { ALIAS, NAME } from '../lib/constants';
import { pickBy } from 'ramda';

process.on('unhandledRejection', (reason: {} | null | undefined, promise: Promise<any>) => {
    throw new Error(reason as string);
});

const args = yargs
    .options(createConfig(OPTIONS))
    .argv as BangActionOptions;
console.log(args)
const filtered = pickBy<BangActionOptions, BangOptions>((val, key) => { return (key !== '_' && key !== '$0') && val !== undefined}, args);

const { targetFolder, name } = filtered;

if (!targetFolder) {
    console.log(chalk.red(`Target folder must be defined.`));
    console.log(chalk.white(`Please use --${TARGET_FOLDER[NAME]} or -${TARGET_FOLDER[ALIAS]} option to define target folder of your repository.`));
    process.exit(1);
}

if (!name) {
    console.log(chalk.red(`Name must be defined.`));
    console.log(chalk.white(`Please use --${REPO_NAME[NAME]} or -${REPO_NAME[ALIAS]} option to define name of the repository.`));
    process.exit(1);
}

const repoFolder = path.resolve(targetFolder);

// Calculate destination folder
// If target folder is absolute path then we use as is otherwise we use working folder

if (fs.existsSync(repoFolder)) {
    throw new Error(chalk.red(`Directory with name "${chalk.white(repoFolder)}" exists in the target folder. Please, choose another name.`));
}

bang(filtered);
// Calculate PM and run appropriate one in cli to initialize package
// In case of usage Yarn identify if Yarn workspaces must be used

// Create .plsrc

// Update scripts(build, clean etc.) in package.json file based on what kind of project is built, single or multiple projects workspace
