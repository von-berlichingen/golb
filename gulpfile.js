var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-rimraf');
var cssmin = require('gulp-minify-css');
var jsValidate = require('gulp-jsvalidate');
var notify = require('gulp-notify');

gulp.task('clean', [], function() {
  console.log('Clean all files in build folder.');

  return gulp
    .src('build/*', { read: false })
    .pipe(clean());
});

gulp.task('javascript', [], function() {
  console.log('Validate Javascript.');

  return gulp
    .src('contents/js/**.js')
    .pipe(jsValidate())
    .on('error', notify.onError(function(err) {
      return 'Some javascript errors here: ' + err.message;
    }));
});

gulp.task('default', ['clean'], function() {
  console.log('Concat, move and minify all css files in styles folder.');

  return gulp
    .src('contents/styles/**.css')
    .pipe(concat('main.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('build/styles'));
});
