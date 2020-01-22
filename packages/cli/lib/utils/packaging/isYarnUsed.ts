import * as fs from "fs";
import * as path from "path";
import { YARN_LOCK_FILENAME } from './api';

function isYarnUsed(workingDir: string): boolean {
    if(!workingDir) return false;

    return fs.existsSync(path.normalize(path.join(workingDir, YARN_LOCK_FILENAME)));
}

export {
    isYarnUsed,
}
