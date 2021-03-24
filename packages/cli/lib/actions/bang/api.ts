import { Arguments } from 'yargs';

export interface BangActionOptions extends Arguments {
    targetFolder?: string;
    version?: string;
    author?: string;
    name?: string;
    description?: string;
    license?: string;
    yarn: boolean;
    ws: boolean;
}
