var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');

var DEST = './dist';
var DOCS = './docs'
var FILES = [
  './bower_components/drawer-swipe/dist/drawer-swipe.js',
  './bower_components/uikit/js/uikit.js',
  './bower_components/uikit/js/components/autocomplete.js',
  './bower_components/uikit/js/components/notify.js',
  './bower_components/uikit/js/components/sticky.js',
  './src/spck-ui.js'];

gulp.task('build', function () {
  return gulp.src(FILES)
    .pipe(concat('spck-ui.js'))
    .pipe(gulp.dest(DEST))
    .pipe(gulp.dest(DOCS));
});

gulp.task('build-meta', function () {
  return gulp.src(['./src/spck-ui.meta.js'])
    .pipe(gulp.dest(DEST));
});

gulp.task('build-docs', function () {
  return gulp.src(['./dist/spck-ui.meta.js', './dist/spck-ui-icons.css'], {base: './dist'})
    .pipe(gulp.dest(DOCS));
});



gulp.task('build-less', function () {
  return gulp.src(['less/spck-ui.less'])
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest(DEST))
    .pipe(gulp.dest(DOCS));
});

gulp.task('default', ['build', 'build-less', 'build-meta', 'build-docs']);
