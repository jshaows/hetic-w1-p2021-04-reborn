const {
  src,
  dest,
  parallel,
  series,
  watch
} = require('gulp');
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const contact = require('gulp-concat')
const browserSync = require("browser-sync").create();
const imagemin = require('gulp-imagemin')

function html() {
  return src('src/*.pug')
    .pipe(pug())
    .pipe(dest('dist'))
}

function css() {
  return src('src/scss/styles.scss')
    .pipe(sass())
    .pipe(contact('styles.css'))
    .pipe(dest('dist/css'))
}

function js() {
  return src('src/js/*')
    .pipe(dest('dist/js'))
}

function images() {
  return src('src/assets/images/*')
    .pipe(imagemin())
    .pipe(dest('dist/assets/images'));
}

function fonts() {
  return src('src/assets/fonts/*')
    .pipe(dest('dist/assets/fonts'));
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

exports.dev = series(parallel(html, css, js, images, fonts), serve, () =>
  watch(['src/**/**/*'], series(parallel(html, css, js, images, fonts), reload))
);

exports.build = parallel(html, css, js, images, fonts);