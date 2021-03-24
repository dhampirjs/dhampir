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
import { verifyYarnWorkspaces } from '../lib/utils/packaging/verifyYarnWorkspaces';
import { PACKAGE_FILENAME } from '../lib/utils/packaging/api';
import { isYarnUsed } from '../lib/utils/packaging/isYarnUsed';
import {
    OPTIONS,
    OUTPUT_FOLDER,
} from '../lib/actions/generate/OPTIONS';
import { ALIAS, NAME } from '../lib/constants';
import { createConfig } from '../lib/utils/parameters';
import { DEFAULT_SPAWN_PROPERTIES, spawnProject } from '../../inception/lib';

process.on('unhandledRejection', (reason: {} | null | undefined, promise: Promise<any>) => {
    throw new Error(reason as string);
});

const args = yargs
    .options(createConfig(OPTIONS))
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

const packageDescriptor = path.join(workingFolder, PACKAGE_FILENAME);

const [usesYarnWS, ws] = verifyYarnWorkspaces(fs.existsSync(packageDescriptor) ? require(packageDescriptor).workspaces : undefined);

let targetFolder: fs.PathLike;
let workspace: string = '';

if (out) {
    targetFolder = path.normalize(out as string);
} else {
    if (usesYarnWS) {
        if (ws) {
            workspace = path.join(ws as string, project as string);
            targetFolder = workspace;
        } else {
            console.log(chalk.white('You are using Yarn Workspaces but we could not determine what target folder to use.'));
            console.log(chalk.white('There are more then one workspace.'));
            console.log(chalk.white(`Please use --${OUTPUT_FOLDER[NAME]} or -${OUTPUT_FOLDER[ALIAS]} option to define exact output folder of your package.`));
            process.exit(1);
        }
    } else {
        targetFolder = project as string;
    }
}

try {
    spawnProject(Object.assign({}, DEFAULT_SPAWN_PROPERTIES, {
        yarn: {
            useYarn,
            ws: usesYarnWS ? workspace : undefined,
            add: ws !== undefined,
        },
        profile,
        targetFolder: path.normalize(path.isAbsolute(targetFolder) ? targetFolder : path.join(workingFolder, targetFolder)),
        projectName: project,
        installDependencies: true, //TODO: make it optional and controlled through CLI option
    }));
} catch (e) {
    console.log(chalk.redBright(`Creating new package has failed.`));
    console.log(chalk.redBright(`Error: ${e.message}`));
    process.exit(1);
}

