var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', [], function() {
  console.log('Concating and moving all the css files in styles folder.');
  gulp
    .src('contents/styles/**.*')
    .pipe(concat('main.css'))
    .pipe(gulp.dest('build/styles'));
});
