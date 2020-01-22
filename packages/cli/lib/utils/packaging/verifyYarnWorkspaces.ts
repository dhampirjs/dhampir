import { parseWorkspaceFolder } from './parseWorkspaceFolder';
import * as path from 'path';
export function verifyYarnWorkspaces(workspaces: string[] | undefined): Array<string | undefined | boolean> {
    if (!workspaces) {
        return [false, undefined];
    }

    if (workspaces.some(ws => ws.match(new RegExp(`${path.sep}*$`)))) {
        return [true, undefined];
    }

    let wsFolder;
    let folders: string[] = workspaces
        .filter(ws => ws && ws.trim() !== '')
        .map(ws => parseWorkspaceFolder(ws))
        .filter((ws, i, arr) => arr.indexOf(ws) === i);

    if (folders.length > 0) {
        if (folders.length === 1) {
            wsFolder = folders[0].trim() as string;
        }
    }

    return [true, wsFolder];
}
