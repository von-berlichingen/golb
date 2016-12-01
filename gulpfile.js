var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-rimraf');

gulp.task('clean', [], function() {
  console.log('Clean all files in build folder.');

  return gulp
    .src('build/*', { read: false })
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {
  console.log('Concating and moving all the css files in styles folder.');

  return gulp
    .src('contents/styles/**.*')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('build/styles'));
});
