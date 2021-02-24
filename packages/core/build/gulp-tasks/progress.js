import {spawn} from 'child_process';
import {resolve} from 'path';

export default function (
    {
        projectDir,
        dist,
    },
) {
    return (cb) => {
        const outputFolder = resolve(dist, 'es6')
        const tsc = spawn(
            resolve(projectDir, 'node_modules/.bin/tsc.cmd'),
            [
                '--outDir', outputFolder,
                '--declaration', true,
                '--declarationMap', true,
                '--sourceMap', true,
                '--incremental',
                '--watch',
            ],
            {
                cwd: projectDir,
                stdio: ['ignore', 'pipe', 'ignore']
            }
        );

        tsc.on('close', cb);
    }
};
