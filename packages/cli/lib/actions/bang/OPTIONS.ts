import { ALIAS, BRIEF, NAME, TYPE } from '../../constants/options';
import { ArgumentOptions } from '../api';

export const REPO_NAME: ArgumentOptions = {
    [NAME]: 'name',
    [ALIAS]: 'n',
    [BRIEF]: 'Name of the repository',
    [TYPE]: 'string',
};

export const REPO_VERSION: ArgumentOptions = {
    [NAME]: 'version',
    [ALIAS]: 'v',
    [BRIEF]: 'Initial version',
    [TYPE]: 'string',
};

export const REPO_DESCRIPTION: ArgumentOptions = {
    [NAME]: 'description',
    [ALIAS]: 'd',
    [BRIEF]: 'Brief description of the repository',
    [TYPE]: 'string',
};

export const REPO_AUTHOR: ArgumentOptions = {
    [NAME]: 'author',
    [ALIAS]: 'a',
    [BRIEF]: 'Brief description of the repository',
    [TYPE]: 'string',
};

export const REPO_LICENSE: ArgumentOptions = {
    [NAME]: 'author',
    [ALIAS]: 'a',
    [BRIEF]: 'Brief description of the repository',
    [TYPE]: 'string',
};

export const YARN: ArgumentOptions = {
    [NAME]: 'yarn',
    [ALIAS]: 'y',
    [BRIEF]: 'Use yarn as main package manager',
    [TYPE]: 'boolean',
};

export const WORKSPACES: ArgumentOptions = {
    [NAME]: 'ws',
    [ALIAS]: 'w',
    [BRIEF]: 'Use yarn workspaces',
    [TYPE]: 'boolean',
};

export const TARGET_FOLDER: ArgumentOptions = {
    [NAME]: 'target-folder',
    [ALIAS]: 'f',
    [BRIEF]: 'Destination folder where the repository will be created. Default is working directory',
    [TYPE]: 'string',
};

export const OPTIONS: ArgumentOptions[] = [
    { ...REPO_NAME },
    { ...REPO_VERSION },
    { ...REPO_DESCRIPTION },
    { ...TARGET_FOLDER},
    { ...REPO_LICENSE},
    { ...YARN},
    { ...WORKSPACES},
];

