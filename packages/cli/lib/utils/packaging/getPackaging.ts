import * as fs from 'fs';
import * as path from 'path';
import { PackageManager } from './api';
import { isYarnUsed } from './isYarnUsed';

function getPackaging(folder: fs.PathLike): PackageManager {
    const workingDir = path.normalize(folder as string);

    return isYarnUsed(workingDir) ? PackageManager.YARN : PackageManager.NPM;
}

export {
    getPackaging,
}
