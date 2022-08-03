const gulp = require('gulp');
const concat = require('gulp-concat');
const express = require('./app.js')
const watchFolders = [
    './assets/init.js', 
    './components/*.js', 
    './components/**/*.js',
    './data/*.js',
    './data/**/*.js',
    './models/*.js',
    './models/**/*.js',
];

gulp.task('concatScripts', function() {
    return gulp.src(watchFolders)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./assets'));
});

gulp.task('watch', function() {
    gulp.watch(watchFolders, gulp.series('concatScripts'));
    express;
});