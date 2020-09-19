// Gulp, Concat, Uglify och Clean CSS is included and their functionality is prepared
const { src, dest, watch, series, parallel } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const cleancss = require("gulp-clean-css");
const browsersync = require("browser-sync").create();
const sass = require("gulp-sass");
sass.compiler = require("node-sass");
const sourcemaps = require("gulp-sourcemaps");

// File paths
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js",
    imgPath: ("src/**/*.jpg", "src/**/*.png", "src/**/*.gif", "src/**/*.pdf", "src/**/*.webp"),
    sassPath: "src/**/*.scss"
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

// Copy Image-files
function copyimg(){
    return src(files.imgPath)
        .pipe(dest('pub'));
}

function sassTask(){
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourcemaps.write("/."))
        .pipe(dest('pub'));
        
}

// Watcher
function watchTask(){

    browsersync.init({
        server: {
            baseDir: "./pub"
        }
    });

    watch([files.htmlPath, files.jsPath, files.cssPath, files.imgPath, files.sassPath], 
        parallel(copyHTML, jsTask, copyimg, sassTask)).on('change', browsersync.reload);
}

// Default task
exports.default = series(
    parallel(copyHTML, jsTask, copyimg, sassTask), watchTask
);