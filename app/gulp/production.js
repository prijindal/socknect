var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');

gulp.task('sass', function() {
    return gulp.src(assets.scss.source)
            .pipe(sass({compressed:true}))
            .pipe(gulp.dest(assets.scss.dest))
})

gulp.task('js', function() {
  return gulp.src(assets.js.source)
    .pipe(concat(assets.js.dest.filename))
    .pipe(gulp.dest(assets.js.dest.path))
})

gulp.task('vendor:js', function() {
    return gulp.src(assets.vendorjs.source)
            .pipe(concat(assets.vendorjs.dest.filename))
            .pipe(gulp.dest(assets.vendorjs.dest.path))
})

gulp.task('vendor:css', function() {
    return gulp.src(assets.vendorcss.source)
            .pipe(sass({compressed:true}))
            .pipe(gulp.dest(assets.vendorcss.dest.path))
})

gulp.task('build', ['sass', 'vendor:js','vendor:css', 'js'])
