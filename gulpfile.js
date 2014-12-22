
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber');

    var paths = {
        provider: './app/providers/aaCustomProvider.js',
        service: './app/services/aaSelectService.js',
        directives: './app/directives/*.js',
        less: './Content/aaCustom.less'
    };

    var dests = {
        dist: './dist'
    };

    gulp.task('js', function () {
        gulp.src([paths.provider, paths.service, paths.directives])
            .pipe(plumber())
            .pipe(concat('aaCustomFGS.js'))
            .pipe(gulp.dest(dests.dist));
    });

    gulp.task('less', function () {
        gulp.src(paths.less)
          .pipe(plumber())
          .pipe(less())
          .pipe(concat('aaCustomFGS.css'))
          .pipe(gulp.dest(dests.dist));
    });

    gulp.task('build', ['js', 'less']);
