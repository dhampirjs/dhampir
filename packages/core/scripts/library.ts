import tsc from 'typescript';
import os from 'os';
import fs from 'fs';
import configFactory from './library/tsconfig.lib';
import {configuration} from '../configuration';


const {source, dist, projectDir, modules = ['es6', 'commonjs']} = configuration;


import {resolve} from 'path';


if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
}

for (const moduleType of modules) {
    const destination = resolve(dist, moduleType);

    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
    }

    const config = configFactory({
        source,
        moduleType,
        destination,
        cwd: projectDir,
    });

    const tsConfigFileName = resolve(projectDir, `tsconfig.${moduleType}.json`);

    const configFile = tsc.parseConfigFileTextToJson(tsConfigFileName, JSON.stringify(config));
    const configFileResult = tsc.parseJsonConfigFileContent(configFile.config, tsc.sys, projectDir, undefined, tsConfigFileName);
    const compilerHost = tsc.createCompilerHost(configFileResult.options);
    const compiler = tsc.createProgram(configFileResult.fileNames, configFileResult.options, compilerHost);
    const result = compiler.emit();

    const diagnostics = tsc.getPreEmitDiagnostics(compiler).concat(result.diagnostics);

    if (diagnostics.length) {
        const error = tsc.formatDiagnosticsWithColorAndContext(diagnostics, {
            getCurrentDirectory: () => tsc.sys.getCurrentDirectory(),
            getCanonicalFileName: f => f,
            getNewLine: () => os.EOL
        });
        console.log(error);
        process.exit(1);
    }
}
