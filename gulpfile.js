var gulp = require('gulp');
var concat = require('gulp-concat');
var clean = require('gulp-rimraf');
var cssmin = require('gulp-minify-css');
var jsValidate = require('gulp-jsvalidate');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var jasmine = require('gulp-jasmine');
var webserver = require('gulp-webserver');
var markdown = require('gulp-markdown');
var tap = require('gulp-tap');
var handlebars = require('handlebars');
var rename = require('gulp-rename');

gulp.task('clean', [], function() {
  console.log('Clean all files in build folder.');

  return gulp
    .src('build/*', { read: false })
    .pipe(clean());
});

gulp.task('test', function() {
  return gulp
    .src('specs/**.js')
    .pipe(jasmine());
});

gulp.task('javascript', [], function() {
  console.log('Validate, concat, uglify and move all the javascript files.');

  return gulp
    .src('contents/js/**.js')
    .pipe(jsValidate())
    .on('error', notify.onError(function(err) {
      return 'Some javascript errors here: ' + err.message;
    }))
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', ['clean'], function() {
  return gulp
    .src('contents/styles/**.css')
    .pipe(concat('main.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('build/styles'));
});

gulp.task('spec-watch', function() {
  gulp.watch(['specs/**.js', 'contents/javascripts/**.js'], ['test'])
});

gulp.task('generate_pages', [], function() {
  return gulp
    .src('contents/pages/**.md')
    .pipe(markdown())
    .pipe(gulp.dest('build/pages'));
});

gulp.task('homepage', ['clean'], function() {
  return gulp
    .src('contents/index.hbs')
    .pipe(tap(function(file, t) {
      var template = handlebars.compile(file.contents.toString());
      var html = template({ title: "Gulp + Handlebars is easy" });

      file.contents = new Buffer(html, "utf-8")
    }))
    .pipe(rename(function(path) {
      path.extname = ".html"
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('webserver', function() {
  return gulp
    .src('build')
    .pipe(webserver({ livereload: true }));
});

gulp.task('default', ['css', 'homepage', 'javascript']);

gulp.task('watch', [], function() {
  gulp.watch('contents/**', ['default']);
});
