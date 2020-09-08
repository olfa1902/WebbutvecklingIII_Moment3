// Gulp, Concat, Uglify och Clean CSS is included and their functionality is prepared
const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const cleancss = require("gulp-clean-css");

// File paths
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js",
    imgPath: ("src/**/*.jpg", "src/**/*.png", "src/**/*.gif", "src/**/*.pdf", "src/**/*.webp")
}

// Copy HTML-files
function copyHTML() {
    return src(files.htmlPath)
        .pipe(dest('pub'));
}

//Concatinate and minify Js-files
function jsTask(){
    return src(files.jsPath)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(dest('pub/js'));
}

//Concatinate and minify CSS-files
function cssTask(){
    return src(files.cssPath)
        .pipe(concat('styles.css'))
        .pipe(cleancss())
        .pipe(dest('pub/css'));
}

// Copy Image-files
function copyimg(){
    return src(files.imgPath)
        .pipe(dest('pub'));
}

// Watcher
function watchTask(){
    watch([files.htmlPath, files.jsPath, files.cssPath, files.imgPath], parallel(copyHTML, jsTask, cssTask, copyimg));
}

// Default task
exports.default = series(
    parallel(copyHTML, jsTask, cssTask, copyimg), watchTask
);