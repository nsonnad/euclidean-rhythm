var gulp = require('gulp');
var plumber = require('gulp-plumber');
var exec = require('gulp-exec');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync').create();

///////////////////////////////////////////////
// Paths

var elmSources = './src/elm';
var elmPath = [elmSources + '/**/*.elm'];
var htmlPath = ['index.html'];
var cssPath = './src/stylus/main.styl'

///////////////////////////////////////////////
// Elm

gulp.task('build', function(){
  return gulp.src(elmPath)
    .pipe(plumber())
    .pipe(exec('elm make $(find ' + elmSources + ' -name \'*.elm\') --output target/elm.js'))
    .pipe(exec.reporter())
    .pipe(browserSync.stream());
});


gulp.task('css', function () {
  return gulp.src(cssPath)
    .pipe(stylus())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

///////////////////////////////////////////////
// Default and Watch

gulp.task('default',['build', 'css', 'watch']);

gulp.task('watch', function(){
  browserSync.init({
    server: "./",
    open: false
  });
  gulp.watch(elmPath.concat(htmlPath),['build']);
  gulp.watch(cssPath, ['css']);
});
