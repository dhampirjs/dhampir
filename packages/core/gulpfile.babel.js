import * as fs from 'fs-extra';
import gulp from 'gulp';
import clean from 'gulp-clean';

import jest from './build/gulp-tasks/jest';
import eslint from './build/gulp-tasks/eslint';
import { configuration } from './configuration';
import library from './build/gulp-tasks/library';
import progress from './build/gulp-tasks/progress';
import copy from './build/gulp-tasks/copy';

gulp.task('clean', () => {
    let { dist, filesToClean } = configuration;
    console.log(`Removing ${dist} folder...`);
    fs.removeSync(dist);

    return gulp.src(filesToClean)
        .pipe(clean());
});

gulp.task('library', (cb) => {
    library(configuration)(cb);
});

gulp.task('copy', (cb) => {
    copy(configuration)(cb);
});

gulp.task('copy:es6', (cb) => {
    copy(configuration, ['es6'])(cb);
});

gulp.task('copy:commonjs', (cb) => {
    copy(configuration, ['commonjs'])(cb);
});

gulp.task('progress', (cb) => {
    progress(configuration)(cb);
});

gulp.task('test', (cb) => {
    jest(configuration)(cb);
});

gulp.task('eslint', (cb) => {
    eslint(configuration)(cb);
});
gulp.task('eslint:fix', (cb) => {
    eslint(configuration, true)(cb);
});

gulp.task('dist', gulp.series('clean', 'eslint', 'library', 'copy', (cb) => cb()));
gulp.task('build:watch', gulp.series('clean', 'copy:es6', 'progress', (cb) => cb()));

gulp.task('default', gulp.series('dist', (cb) => cb()));

