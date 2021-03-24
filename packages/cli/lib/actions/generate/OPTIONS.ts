import { ALIAS, BRIEF, NAME, TYPE } from '../../constants/options';
import { ArgumentOptions } from '../api';

export const YARN: ArgumentOptions = {
    [NAME]: 'yarn',
    [ALIAS]: 'y',
    [BRIEF]: 'TODO: define what way it can be used.',
    [TYPE]: 'string',
};

export const PROJECT: ArgumentOptions = {
    [NAME]: 'project',
    [ALIAS]: 'n',
    [BRIEF]: 'Enter project name. Is used to create folder where package will live.',
    [TYPE]: 'string',
};

export const PROFILE: ArgumentOptions = {
    [NAME]: 'profile',
    [ALIAS]: 'p',
    [BRIEF]: 'Profile that is used to define list of the libraries to use.',
    [TYPE]: 'string',
};

export const OUTPUT_FOLDER: ArgumentOptions = {
    [NAME]: 'out',
    [ALIAS]: 'o',
    [BRIEF]: 'Specify output folder. Default is current folder or the one from workspaces section in the package.json that lies in the current folder.',
    [TYPE]: 'string',
};

export const INSTALL_DEPENDENCIES: ArgumentOptions = {
    [NAME]: 'install',
    [ALIAS]: 'i',
    [BRIEF]: 'Defines if dependencies should be installed during project generation.',
    [TYPE]: 'boolean',
};

export const OPTIONS: ArgumentOptions[] = [
    { ...YARN },
    { ...PROFILE },
    { ...PROJECT },
    { ...OUTPUT_FOLDER },
    { ...INSTALL_DEPENDENCIES },
];

