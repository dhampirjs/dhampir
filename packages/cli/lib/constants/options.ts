export const NAME = 'name';
export const ALIAS = 'alias';
export const BRIEF = 'description';
export const TYPE = 'type';

export interface OptionDescription {
    name?: string;
    alias?: string;
    brief?: string;
    type?: string;
}

export const YARN = {
    [NAME]: 'yarn',
    [ALIAS]: 'y',
    [BRIEF]: 'TODO: define what way it can be used.',
    [TYPE]: 'string',
};

export const PROJECT = {
    [NAME]: 'project',
    [ALIAS]: 'n',
    [BRIEF]: 'Enter project name. Is used to create folder where package will live.',
    [TYPE]: 'string',
};

export const PROFILE = {
    [NAME]: 'profile',
    [ALIAS]: 'p',
    [BRIEF]: 'Profile that is used to define list of the libraries to use.',
    [TYPE]: 'string',
};

export const OUTPUT_FOLDER = {
    [NAME]: 'out',
    [ALIAS]: 'o',
    [BRIEF]: 'Specify output folder. Default is current folder or the one from workspaces section in the package.json that lies in the current folder.',
    [TYPE]: 'string',
};

export const INSTALL_DEPENDENCIES = {
    [NAME]: 'install',
    [ALIAS]: 'i',
    [BRIEF]: 'Defines if dependencies should be installed during project generation.',
    [TYPE]: 'boolean',
};

export const OPTIONS: OptionDescription[] = [
    { ...YARN },
    { ...PROFILE },
    { ...PROJECT },
    { ...OUTPUT_FOLDER },
    { ...INSTALL_DEPENDENCIES },
];

