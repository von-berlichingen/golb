var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-rimraf');
var cssmin = require('gulp-minify-css');

gulp.task('clean', [], function() {
  console.log('Clean all files in build folder.');

  return gulp
    .src('build/*', { read: false })
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {
  console.log('Concat, move and minify all css files in styles folder.');

  return gulp
    .src('contents/styles/**.css')
    .pipe(concat('main.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('build/styles'));
});
