import { ALIAS, BRIEF, NAME, TYPE } from '../constants';
import { Options } from 'yargs';

export type ArgumentDictionary = { [key: string]: string };
export type OptionsDictionary = { [key: string]: Options };

export interface ArgumentOptions extends Record<string, string>{
    [NAME]: string;
    [ALIAS]: string;
    [BRIEF]: string;
    [TYPE]: string;
}

export enum PackageManager {
    NPM = 'npm',
    YARN = 'yarn',
}
