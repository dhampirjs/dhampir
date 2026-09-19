import {existsSync, mkdirSync, writeFileSync} from "fs";
import vfs from "vinyl-fs"
import {configuration} from "../configuration";
import * as path from "path";

const {
    filesToCopy,
    projectDir,
    dist,
    modules,
} = configuration;

if (!existsSync(dist)) {
    mkdirSync(dist);
}

writeFileSync(path.resolve(dist, "package.json"), JSON.stringify({ type: "module" }, null, 4) + "\n");

modules.forEach(module => {
    const target = path.resolve(dist, module);
    if (!existsSync(target)) {
        mkdirSync(target);
    }

    vfs
        .src(filesToCopy, {cwd: projectDir})
        .pipe(vfs.dest(target))
});
