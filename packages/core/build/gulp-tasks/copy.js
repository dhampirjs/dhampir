import fs from "fs";
import gulp from "gulp";
import {resolve} from "path";

export default function (
    {
        filesToCopy,
        projectDir,
        source,
        dist,
    },
    modules = ['es6', 'commonjs']
) {
    return (cb) => {
        if(!fs.existsSync(dist)) {
            fs.mkdirSync(dist);
        }

        modules.forEach(module => {
            const target = resolve(dist, module);
            if (!fs.existsSync(target)) {
                fs.mkdirSync(target);
            }

            gulp.src(filesToCopy, {cwd: projectDir})
                .pipe(gulp.dest(target))
                .on('error', (error) => {
                    cb?.(error)
                });
        });

        cb?.();
    }
};
