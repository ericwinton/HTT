const gulp = require('gulp');
const concat = require('gulp-concat');
const express = require('./app.js')
const watchFolders = [
    './frontend/src/init.js', 
    './frontend/src/components/*.js', 
    './frontend/src/components/**/*.js',
    './frontend/src/models/*.js',
    './frontend/src/models/**/*.js',
];

gulp.task('concatScripts', function() {
    return gulp.src(watchFolders)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./frontend/dist'));
});

gulp.task('watch', function() {
    gulp.watch(watchFolders, gulp.series('concatScripts'));
    express;
});