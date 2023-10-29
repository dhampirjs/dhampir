import {spawn} from 'child_process';
import {resolve} from 'path';
import flog from 'fancy-log';
import split from 'split';
import {configuration} from '../configuration'
import { white } from "chalk";

const {
    projectDir,
    dist,
} = configuration;

const tsc = spawn(
    resolve(projectDir, 'node_modules/.bin/tsc'),
    [
        '--declaration', String(true),
        '--sourceMap', String(true),
        '--incremental',
        '--watch',
    ],
    {
        cwd: projectDir,
        stdio: ['ignore', 'pipe', 'ignore']
    }
);



tsc.on('close', () => {
    console.log(white('Watching has been finished.'))
});

tsc.stdout
    .pipe(split())
    .on('data', (data: any) => {
        flog(data.toString());
    })
