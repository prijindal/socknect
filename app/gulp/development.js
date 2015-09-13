var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
    return sass(assets.scss.source, {sourcemap: true})
            .on('error', sass.logError)
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(assets.scss.dest))
})

gulp.task('js', function() {
  return gulp.src(assets.js.source)
    .pipe(sourcemaps.init())
    .pipe(concat(assets.js.dest.filename))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(assets.js.dest.path))
})

gulp.task('vendor:js', function() {
    return gulp.src(assets.vendorjs.source)
            .pipe(concat(assets.vendorjs.dest.filename))
            .pipe(gulp.dest(assets.vendorjs.dest.path))
})

gulp.task('vendor:css', function() {
    return gulp.src(assets.vendorcss.source)
            .pipe(gulp.dest(assets.vendorcss.dest.path))
})

gulp.task('build', ['sass', 'vendor:js','vendor:css', 'js'])

gulp.task('watch', ['build'], function() {
    gulp.watch(assets.scss.watch, ['sass'])
    gulp.watch(assets.js.watch, ['js'])
})
