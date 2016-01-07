var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var del = require('del');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var less = require('gulp-less');

gulp.task('watch', ['script', 'style'], function () {
    browserSync.init({
        server: './',
        files: ['dist/js/*.js', 'dist/css/*.css'],
        port: 3001
    });

    gulp.watch('index.html', browserSync.reload);

    gulp.watch('app/js/**/*', ['script']);

    gulp.watch('app/css/*.less', ['style']);
});

gulp.task('style', function() {
    var processors = [
        autoprefixer({ browsers: ['last 1 version'] }),
        cssnano
    ];

    return gulp.src('app/css/app.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('script', function(){
    browserify('app/js/app.js')
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('clean', function () {
    del('dist');
});

gulp.task('build', ['clean', 'script', 'style'], function() {
    gulp.src('dist/js/app.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('dist/js'));

    gulp.src('dist/css/app.css')
        .pipe(rev())
        .pipe(gulp.dest('dist/css'));
});
