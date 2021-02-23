import tsc from 'typescript';
import os from 'os';
import fs from 'fs';
import configFactory from './library/tsconfig';
import {resolve} from 'path';
import glob from 'glob';
import mkdirp from 'mkdirp';
import path from 'path';
// import gulp from 'gulp';
// import debug from 'gulp-debug';
//
// function copy(pattern, cwd, dest) {
//     return gulp.src(pattern, { cwd })
//         .pipe(debug())
//         .pipe(gulp.dest(dest))
//         .on('end', (...args) => {
//             console.log(args);
//         });
// }

function copyFile(src, dest) {

    // Create output directory.
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
    }

    // Copy the file (overwrite by default).
    fs.copyFileSync(src, dest);
}

function copyFiles(pattern, src, dest) {

    // Fetch files.
    const files = glob.sync(pattern, {cwd: src});

    for (let file of files) {
        const pathSrc = path.join(src, file);
        const pathDest = path.join(dest, file);

        // Here is some nice magic, instead of coping the files,
        // we just create a symlink! Webpack can handle symlinks just
        // fine, plus they are much, much faster to create.
        copyFile(pathSrc, pathDest);
    }
}


export default function ({
                             source,
                             dist,
                             projectDir,
                         }) {
    return (cb) => {
        if(!fs.existsSync(dist)) {
            fs.mkdirSync(dist);
        }
        for(const moduleType of ['es6', 'commonjs']) {
            const destination = path.join(dist, moduleType);
            if(!fs.existsSync(destination)) {
                fs.mkdirSync(destination);
            }

            const config = configFactory({source, moduleType, destination, cwd: projectDir});

            const tsConfigFileName = resolve(projectDir, `tsconfig.${moduleType}.json`);

            const configFile = tsc.parseConfigFileTextToJson(tsConfigFileName, JSON.stringify(config));
            const configFileResult = tsc.parseJsonConfigFileContent(configFile.config, tsc.sys, projectDir, undefined, tsConfigFileName);
            const compilerHost = tsc.createCompilerHost(configFileResult.options);
            const compiler = tsc.createProgram(configFileResult.fileNames, configFileResult.options, compilerHost);
            const result = compiler.emit();

            if (fs.existsSync(projectDir) && fs.existsSync(destination)) {
                copyFiles('**/*.less', source, destination);
            }

            const diagnostics = tsc.getPreEmitDiagnostics(compiler).concat(result.diagnostics);

            if (diagnostics.length) {
                const error = tsc.formatDiagnosticsWithColorAndContext(diagnostics, {
                    getCurrentDirectory: () => tsc.sys.getCurrentDirectory(),
                    getCanonicalFileName: f => f,
                    getNewLine: () => os.EOL
                });
                console.log(error);
                cb?.(error);
                process.exit(1);
            }

        }

        cb?.();
    }
};
