import path from 'path';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import terser from 'gulp-terser';
import squoosh from 'gulp-squoosh';
import {deleteAsync} from 'del';
import htmlmin from 'gulp-htmlmin';
import svgstore from "gulp-svgstore";
import svgo from "gulp-svgmin";
import rename from "gulp-rename";
import {stacksvg} from "gulp-stacksvg";


// Styles

export const styles = () => {
    return gulp.src('source/less/style.less', {sourcemaps: true})
        .pipe(plumber())
        .pipe(less())
        .pipe(postcss([
            autoprefixer(),
            csso()
        ]))
        .pipe(gulp.dest('build/css', {sourcemaps: '.'}))
        .pipe(browser.stream());
};

// HTML

export const html = () => {
    return gulp.src('source/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build'))
        .pipe(browser.stream());
};

// Scripts

export const scripts = () => {
    return gulp.src('source/js/*.js')
        .pipe(terser())
        .pipe(gulp.dest('build/js'))
        .pipe(browser.stream());
};

// Images

export const copyPngJpg = () => {
    return gulp.src(['source/img/**/*.{png,jpg}'])
        .pipe(gulp.dest('build/img'))
};
export const optimizePngJpg = () => {
    return gulp.src(['source/img/**/*.{png,jpg}'])
        .pipe(squoosh(( {filePath} ) => {
            const imageExtension = path.extname(filePath);
            const optionsForPng = { oxipng: {} };
            const optionsForJpg = { mozjpeg: {} };
            const options = imageExtension === ".png" ? optionsForPng : optionsForJpg;
            return {
                encodeOptions: options,
            };
        }
        ))
        .pipe(gulp.dest('build/img'))
};


// WebP
export const createWebp = () => {
    return gulp.src(['source/img/*.{png,jpg}', '!source/img/favicons/*.png'])
        .pipe(squoosh({
            encodeOptions: {
                webp: {}
            }
        }))
        .pipe(gulp.dest('build/img'))
};

// SVG

export const optimizeSvgFavicons = () => {
    return gulp.src(['source/img/favicons/*.svg'])
        .pipe(
            svgo({
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
            }))
        .pipe(gulp.dest('build/img/favicons'))
};
export const optimizeSvgLogo = () => {
    return gulp.src(['source/img/logo/*.svg'])
        .pipe(
            svgo({
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
            }))
        .pipe(gulp.dest('build/img/logo'))
};

export const spriteSvg = () => {
    return gulp.src(['source/img/*.svg', '!source/img/logo/*.svg', '!source/img/favicons/*.svg'])
        .pipe(
            svgo({
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
            })
        )
        .pipe(stacksvg({ output: 'stack', separator: '__', spacer: '-' }))
        .pipe(gulp.dest('build/img'))
};


// Copy

export const copy = (done) => {
    gulp.src([
        'source/fonts/**/*.{woff2,woff}',
        'source/*.ico',
        'source/*.webmanifest'
    ], {
        base: 'source'
    })
        .pipe(gulp.dest('build'));
    done();
};

// Clean

export const clean = async () => {
    return await deleteAsync(['build']);
};

// Server

const server = (done) => {
    browser.init({
        server: {
            baseDir: 'build'
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
    gulp.watch('source/*.html', gulp.series(html));
    gulp.watch('source/js/*.js', gulp.series(scripts));
};


// Build

export const build = gulp.series(
    clean,
    copy,
    optimizePngJpg,
    gulp.parallel(
        styles,
        html,
        scripts,
        optimizeSvgFavicons,
        optimizeSvgLogo,
        spriteSvg,
        createWebp
    ),
);

// Default

export default gulp.series(
    clean,
    copy,
    copyPngJpg,
    gulp.parallel(
        styles,
        html,
        scripts,
        optimizeSvgFavicons,
        optimizeSvgLogo,
        spriteSvg,
        createWebp
    ),
    gulp.series(
        server,
        watcher
    ));
