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
       // .pipe(watch('./style/css/*'))
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
 


gulp.task('scripts', function() {
    return gulp.src([
        './app/libs/modernizr/modernizr.js',
        './app/libs/jquery/jquery-1.11.2.min.js',
        './app/libs/waypoints/waypoints.min.js',
        './app/libs/animate/animate-css.js',
        './app/libs/plugins-scroll/plugins-scroll.js',
        ])
        .pipe(concat('libs.js'))
        // .pipe(uglify()) //Minify libs.js
        .pipe(gulp.dest('./app/js/'));
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

    runSequence(['static', 'serve', 'watch']);
});