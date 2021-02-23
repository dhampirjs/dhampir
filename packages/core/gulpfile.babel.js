import * as fs from 'fs-extra';
import gulp from 'gulp';
import clean from 'gulp-clean';

import bundle from './build/gulp-tasks/bundle';
import start from './build/gulp-tasks/serve';
import jest from './build/gulp-tasks/jest';
import { configuration } from './configuration';
import library from "./build/gulp-tasks/library";

gulp.task("clean", () => {
    let { dist } = configuration;
    console.log(`Removing ${dist} folder...`);
    fs.removeSync(dist);

    return gulp.src('src/**/*.d.ts')
        .pipe(clean());

});

gulp.task("build", (cb) => {
    bundle(configuration)(cb)
});

gulp.task("library", (cb) => {
    library(configuration)(cb);
});

gulp.task("serve", (cb) => {
    start(configuration)(cb);
});

gulp.task("jest", (cb) => {
    jest(configuration)(cb);
});

gulp.task("default", gulp.series("clean", "build", (cb) => cb()));
gulp.task("dist", gulp.series("clean", "library", (cb) => cb()));
gulp.task("start", gulp.series("default", "serve"), (cb) => cb());

