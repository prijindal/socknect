var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');

gulp.task('sass', function() {
    return gulp.src(assets.scss.source)
            .pipe(sass({compressed:true, loadPath:'./app/site/static/client/bower_components/Materialize/sass/'}))
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

gulp.task('vendor:fonts', function() {
    return gulp.src(assets.fonts.source)
            .pipe(gulp.dest(assets.fonts.dest.path))
})

gulp.task('vendor:css', function() {
    return gulp.src(assets.vendorcss.source)
            .pipe(sass({compressed:true}))
            .pipe(gulp.dest(assets.vendorcss.dest.path))
})

gulp.task('build', ['sass', 'vendor:js','vendor:css','vendor:fonts', 'js'])
