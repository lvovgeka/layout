var gulp        = require('gulp');
var del         = require('del');
var vinylPaths  = require('vinyl-paths');
var watch       = require('gulp-watch');
var browserSync = require('browser-sync').create();
var runSequence = require('gulp-run-sequence');
var sass = require('gulp-sass');

/**
 * copy html
 */
gulp.task('watch:static', [],function(){
    return gulp.src('./style/css/*')
        .pipe(watch('./style/css/*'))
        .pipe(gulp.dest('./public/css'));
});


/**
 * run sass
 */
gulp.task('sass', function () {
    return gulp.src('./style/sass/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./style/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./style/sass/**', ['sass']);
});


/**
 * Run server
 */
gulp.task('serve', function(){
    browserSync.init({
        server: './public'
    });

    browserSync.watch('./public/**/*.*').on('change', browserSync.reload);
});

/**
 * Run all task
 */
gulp.task('default', function () {

    runSequence(['watch:static', 'serve', 'sass:watch']);
});