"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); //bundles js
var reactify = require('reactify'); // Transforms react JSX to JS
var source = require('vinyl-source-stream');
var concat = require('gulp-concat'); // concatinates files??
var lint = require('gulp-eslint'); //Lint JS files, including JSX for best practises


var config ={ // paths, url and port for the local server
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        images: './src/images/*',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css'
        ],
        mainJs: './src/main.js',
        dist: './dist'
    }
}

//Start a local development server
gulp.task('connect', function(){
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

//opens http://localhost:9005 in a browser when run
//runs the task 'open' first, and then the task 'connect'
gulp.task('open', ['connect'], function() { 
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

//gives gulp the destination of th index.html file
//puts the html file in the dist folder
//reloads the index file from the dist folder
gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

// bundles all the js with browserify
// makes gulp able to update js 
gulp.task('js', function() {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

// bundles the css
gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

//migrates images to dist folder
gulp.task('images', function() {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());
    // makes favicon
    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});

// lint task that returns the result so I can see whats wrong
gulp.task('lint', function() {
    return gulp.src(config.paths.js)
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

//wachtes files for changes so gulp will know it and then run the html task.
gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
});

// runs all these tasks everytime i run gulp
gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);