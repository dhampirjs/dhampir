export interface BangOptions {
    targetFolder: string;
    name: string;
    description?: string;
    license?: string;
    author?: string;
    version?: string;
    useYarn?: boolean;
    useWorkspaces?: boolean;
}

const DEFAULT_BANG_OPTIONS: BangOptions = {
    targetFolder: '.',
    name: 'Project 1',
    version: '1.0.0',
    useYarn: false,
    useWorkspaces: false,
    license: 'MIT',
    author: 'John Doe',
    description: '',
}

export const DEFAULT_BANG_OPTIONS_KEYS = Object.keys(DEFAULT_BANG_OPTIONS);

export function bang(options: BangOptions) {
    console.log('Initializing Repository');
    console.log('Options: ', Object.assign({}, DEFAULT_BANG_OPTIONS, options));

    // Check and save repository metadata to package.json

    // if the project uses yarn workspaces then create folder
    // update package.json, repository is 'private', workspaces folder setting
}
