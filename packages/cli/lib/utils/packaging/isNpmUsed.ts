import * as fs from 'fs';
import * as path from 'path';
import { NPM_LOCK_FILENAME } from './api';

function isNpmUsed(workingDir: string): boolean {
    if(!workingDir) return false;

    return fs.existsSync(path.normalize(path.join(workingDir, NPM_LOCK_FILENAME)));
}

export {
    isNpmUsed,
}
