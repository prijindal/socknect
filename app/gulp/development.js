var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload');

gulp.task('sass', function() {
    return sass(assets.scss.source, {sourcemap: true, loadPath:'./app/site/static/client/bower_components/Materialize/sass/'})
            .on('error', sass.logError)
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(assets.scss.dest))
            .pipe(livereload());
})

gulp.task('js', function() {
  return gulp.src(assets.js.source)
    .pipe(sourcemaps.init())
    .pipe(concat(assets.js.dest.filename))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(assets.js.dest.path))
    .pipe(livereload());
})

gulp.task('vendor:js', function() {
    return gulp.src(assets.vendorjs.source)
            .pipe(concat(assets.vendorjs.dest.filename))
            .pipe(gulp.dest(assets.vendorjs.dest.path))
})

gulp.task('vendor:fonts', function() {
    return gulp.src(assets.fonts.source)
            .pipe(gulp.dest(assets.fonts.dest.path))
})

gulp.task('html', function() {
    return gulp.src('./app/site/**/*.html')
    .pipe(livereload());
})

gulp.task('build', ['sass', 'vendor:js','vendor:fonts', 'js','html'])

gulp.task('watch', ['build'], function() {
    livereload.listen();
    gulp.watch(assets.scss.watch, ['sass'])
    gulp.watch(assets.js.watch, ['js'])
    gulp.watch('./app/site/**/*.html', ['html'])
})
