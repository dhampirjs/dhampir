import * as fs from "fs";
import { DEFAULT_PROFILE, PROFILE, PROFILES } from './common/profiles';
import { describeProject } from './utils/getProfileDescriptor';
import * as chalk from 'chalk';

export interface YarnProps {
    useYarn?: boolean,
    ws?: string,
    add?: boolean
}

export interface BangOptions {
    profile: PROFILE,
    targetFolder: fs.PathLike,
    installDependencies: boolean,
    projectName?: string;
    yarn?: YarnProps,
}

export const DEFAULT_BANG_OPTIONS: BangOptions = {
    profile: DEFAULT_PROFILE,
    installDependencies: false,
    targetFolder: '',
    yarn: {
        useYarn: true,
    },
}

export function bang(options: BangOptions) {
    const {
        projectName,
        profile,
        targetFolder,
        installDependencies,
        yarn
    } = options;

    if (!PROFILES.includes(profile)) {
        throw new Error(`there is no such profile! Available profiles are "${PROFILES.join(", ")}".`);
    }

    if (fs.existsSync(targetFolder)) {
        throw new Error(chalk.red(`directory with name "${chalk.white(projectName)}" exists in the target folder. Please, choose another name.`));
    }

    try {
        console.log(chalk.blue(`[generate] Adding package "${chalk.white(projectName)}" to "${chalk.white(targetFolder)}]" directory.`));
        fs.mkdirSync(targetFolder);
        if (yarn?.add && yarn.ws) {
            // TODO: add yarn workspace to the list
        }
    } catch (error) {
        throw error;
    }

    const descriptor = describeProject({
        profile
    });

    if (installDependencies) {
        descriptor.installDependencies();
    }

};
