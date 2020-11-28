import * as fs from 'fs'
import * as path from 'path'
import * as chalk from 'chalk';

export interface BangOptions {
    targetFolder?: string;
    name: string;
    description?: string;
    license?: string;
    author?: string;
    version?: string;
    useYarn?: boolean;
    useWorkspaces?: boolean;
}

export const DEFAULT_BANG_OPTIONS: BangOptions = {
    useYarn: false,
    useWorkspaces: false,
    name: 'Project 1',
    version: '1.0.0',
}

export function bang(options: BangOptions) {
    console.log('Initializing Repository');
    console.log('Options: ', options);
    // Check and save repository metadata to package.json

    // if uses yarn workspaces create folder
    // update package.json, repository is 'private', workspaces folder setting


}
