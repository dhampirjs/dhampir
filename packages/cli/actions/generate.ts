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
import { bang, DEFAULT_BANG_OPTIONS } from '../../inception/lib/inception';
import { verifyYarnWorkspaces } from '../lib/utils/packaging/verifyYarnWorkspaces';
import { PACKAGE_FILENAME } from '../lib/utils/packaging/api';
import { isYarnUsed } from '../lib/utils/packaging/isYarnUsed';

process.on('unhandledRejection', (reason: {} | null | undefined, promise: Promise<any>) => {
    throw new Error(reason as string);
});

const args = yargs
    .option('project', {
        alias: "n",
        describe: 'Enter project name. Is used to create folder where package will live.',
        type: "string",
    })
    .option('profile', {
        alias: 'p',
        describe: 'Profile that is used to define list of the libraries to use.',
        type: "string",
    })
    .option('yarn', {
        alias: 'y',
        describe: 'TODO: define what way it can be used.',
        type: "boolean",
    })
    .option('out', {
        alias: 'o',
        describe: 'Specify output folder. Default is current folder or the one from workspaces section in the package.json that lays in the current folder.',
        type: "string",
    })
    .option('install', {
        alias: 'i',
        describe: 'Defines if dependencies should be installed during project generation.',
        type: "boolean",
    })
    .argv;

const {
    profile,
    out,
    project,
} = args;

if (!project) {
    console.log(chalk.blueBright(`Please specify project name. Project name can not be empty.`));
    process.exit(1);
}

const workingFolder = process.cwd();

const useYarn = isYarnUsed(workingFolder);

const appDescriptor = path.join(workingFolder, PACKAGE_FILENAME);
const [usesYarnWs, ws] = verifyYarnWorkspaces(fs.existsSync(appDescriptor) ? require(appDescriptor).workspaces : undefined);

let targetFolder: fs.PathLike;
let workspace: string = '';

if (out) {
    targetFolder = out;
} else {

    if (usesYarnWs) {
        if (ws) {
            workspace = [ws as string, project as string].join("/");
            targetFolder = workspace;
        } else {
            console.log(chalk.white("You are using Yarn Workspaces but we could not determine what target folder to use."));
            console.log(chalk.white("There are more then one workspace."));
            console.log(chalk.white("Please use --out or -o option to define exact output folder for your package."));
            process.exit(1);
        }
    } else {
        targetFolder = project;
    }
}

try {
    bang(Object.assign({}, DEFAULT_BANG_OPTIONS, {
        yarn: {
            useYarn,
            ws: usesYarnWs ? workspace : undefined,
            add: ws !== undefined,
        },
        profile,
        targetFolder: path.normalize(path.isAbsolute(targetFolder) ? targetFolder : path.join(workingFolder, targetFolder)),
        projectName: project,
        installDependencies: true, //TODO: make it option and controlled through CLI option
    }));
} catch (e) {
    console.log(chalk.blue(`Creating new package has failed.`));
    console.log(chalk.red(`Error: ${e.message}`));
    process.exit(1);
}

