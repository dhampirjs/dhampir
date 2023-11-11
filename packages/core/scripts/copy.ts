import {existsSync, mkdirSync} from "fs";
import vfs from "vinyl-fs"
import {configuration} from "../configuration";
import * as path from "path";

const {
    filesToCopy,
    projectDir,
    dist,
} = configuration;
const modules = ['es6', 'commonjs'];

if (!existsSync(dist)) {
    mkdirSync(dist);
}

modules.forEach(module => {
    const target = path.resolve(dist, module);
    if (!existsSync(target)) {
        mkdirSync(target);
    }

    vfs
        .src(filesToCopy, {cwd: projectDir})
        .pipe(vfs.dest(target))
});
