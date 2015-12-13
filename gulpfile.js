var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var del = require('del');

gulp.task('watch', ['js', 'clean'], function () {
    browserSync.init({
        server: './',
        files: ['./dist/', 'app/css/'],
        port: 3001
    });

    gulp.watch('index.html', browserSync.reload);

    gulp.watch('app/js/*.js', ['js']);
});

gulp.task('js', function(){
    browserify('app/js/app.js')
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', function () {
    del('./dist');
});
