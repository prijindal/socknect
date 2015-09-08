var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
    return sass(assets.scss.source, {sourcemap: true})
            .on('error', sass.logError)
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(assets.scss.dest))
})

gulp.task('watch', ['sass'], function() {
    gulp.watch(assets.scss.watch, ['sass'])
})
