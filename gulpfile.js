const {
  src,
  dest,
  parallel,
  series,
  watch
} = require('gulp');
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const browserSync = require("browser-sync").create();
const imagemin = require('gulp-imagemin')

function html() {
  return src('src/index.pug')
    .pipe(pug())
    .pipe(dest('dist'))
}

function css() {
  return src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(dest('dist/css'))
}

function images() {
  return src('src/assets/images/*')
    .pipe(imagemin())
    .pipe(dest('dist/assets/images'));
}

function reload(done) {
  browserSync.reload();
  done()
}

function serve(done) {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
  done()
}

exports.dev = series(parallel(html, css, images), serve, () =>
  watch(['src/scss/**/*.scss'], series(parallel(html, css, images), reload))
);