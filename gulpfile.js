var gulp = require('gulp');

gulp.task('default', [], function() {
  console.log('Moving all files in styles folder!');
  gulp
    .src('contents/styles/**.*')
    .pipe(gulp.dest('build/styles'));
});
