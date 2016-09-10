var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglifyjs');
var del          = require('del');
var vinylPaths   = require('vinyl-paths');
var watch        = require('gulp-watch');
var browserSync  = require('browser-sync').create();
var runSequence  = require('gulp-run-sequence');
var sass         = require('gulp-sass');

/**
 * copy html
 */
gulp.task('static', [],function(){
    return gulp.src('./style/css/*')
        .pipe(watch('./style/css/*'))
        .pipe(gulp.dest('./public/css'));
});
/**
 * copy Fonts
 */
gulp.task('staticFonts', [],function(){
    return gulp.src('./style/fonts/**')
        .pipe(watch('./style/fonts/**'))
        .pipe(gulp.dest('./public/fonts'));
});


/**
 * run sass
 */
gulp.task('sass', function () {
    return gulp.src('./style/sass/main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./style/css'));
});



gulp.task('watch', function () {
    gulp.watch('./style/sass/**', ['sass']);
    gulp.watch('./style/css/**', ['static']);
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

    runSequence(['static', 'staticFonts','serve', 'watch']);
});