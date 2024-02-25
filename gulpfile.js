import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
// import rename from 'gulp-rename';
import terser from 'gulp-terser';
import squoosh from 'gulp-squoosh';
// import svgo from 'gulp-svgmin';
// import svgstore from 'gulp-svgstore';
import {deleteAsync} from 'del';
import htmlmin from 'gulp-htmlmin';
import imagemin, {mozjpeg, optipng, svgo} from 'gulp-imagemin';
import { stacksvg } from "gulp-stacksvg";

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
};

// HTML

export const html = () => {
  return gulp.src('source/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('build'));
};

// Scripts

export const scripts = () => {
  return gulp.src('source/js/*.js')
      .pipe(terser())
      .pipe(gulp.dest('build/js'))
      .pipe(browser.stream());
};

// Images

export const optimizeImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
      .pipe(imagemin([mozjpeg({quality: 75, progressive: true}),
          optipng({optimizationLevel: 5}),]))
      // .pipe(squoosh())
      .pipe(gulp.dest('build/img'))
};

// WebP

export const createWebp = () => {
  return gulp.src(['source/img/*.{png,jpg}', '!source/img/favicons/*.png'])
      .pipe(squoosh({ encodeOptions: {
        webp: {}
      }}))
      // .pipe(gulp.dest('build/img'))
      .pipe(gulp.dest('source/img'))
};

// SVG

export const svg = () =>
    gulp.src(['source/img/**/*.svg', '!source/img/favicons/*.svg'])
        .pipe(imagemin([svgo({
          plugins: [
            {
              name: 'removeViewBox',
              active: false
            },
            {
              name: 'cleanupIDs',
              active: false
            }
          ]
        })]))
        .pipe(gulp.dest('build/img'));

// const sprite = () => {
//   return gulp.src(['source/img/*.svg','!source/img/logo/*.svg','!source/img/favicons/*.svg'])
//       .pipe(svgo())
//       .pipe(svgstore({
//         inlineSvg: true
//       }))
//       .pipe(rename('sprite.svg'))
//       .pipe(gulp.dest('build/img'));
// };

export const stack =() =>{
    return gulp.src(['source/img/*.svg','!source/img/logo/*.svg','!source/img/favicons/*.svg'])
        .pipe(stacksvg({ output: 'stack',separator:'__', spacer:'-'}))
        .pipe(gulp.dest('build/img'))
};

// Copy

export const copy = (done) => {
  gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
    'source/img/favicons/*.{png,svg}',
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
  done();
};

// Clean

export const clean = async() => {
  return await deleteAsync(['build']);
};

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
    browser: 'chrome'
  });
  done();
};

// Reload

const reload = (done) => {
  browser.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
  gulp.watch('source/js/*.js', gulp.series(scripts));
};


// Build

// export const build = gulp.series(
//     clean,
//     copy,
//     optimizeImages,
//     gulp.parallel(
//         styles,
//         html,
//         scripts,
//         svg,
//         sprite,
//         createWebp
//     ),
// );

// Default

export default gulp.series(
    clean,
    copy,
    gulp.parallel(
        styles,
        html,
        scripts,
        svg,
        stack,
        createWebp
    ),
    gulp.series(
        server,
        watcher
    ));

