var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

var DEST = './dist';
var DOCS = './docs'
var FILES = [
  './src/core/core.js',
  './src/core/*.js',
  './src/components/autocomplete.js',
  './src/components/notify.js',
  './src/components/sticky.js',
  './src/spck-ui.js'];

const buildMeta = function () {
  return gulp.src(['./src/spck-ui.meta.js'])
    .pipe(gulp.dest(DEST));
};
  
const build = function () {
  return gulp.src(FILES)
    .pipe(concat('spck-ui.js'))
    .pipe(gulp.dest(DEST))
    .pipe(gulp.dest(DOCS));
};

const buildMin = function () {
  return gulp.src('./dist/spck-ui.js')
    .pipe(uglify())
    .pipe(concat('spck-ui.min.js'))
    .pipe(gulp.dest(DEST));
};

const buildDocs = function () {
  return gulp.src([
    './dist/spck-ui.meta.js',
    './dist/spck-ui-icons.css'
  ], {base: './dist'})
    .pipe(gulp.dest(DOCS));
};

const buildLess =  function () {
  return gulp.src(['less/spck-ui.less'])
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest(DEST))
    .pipe(gulp.dest(DOCS));
};

module.exports = {
  build: gulp.series(buildMeta, build, gulp.parallel(buildLess, buildDocs, buildMin))
}
