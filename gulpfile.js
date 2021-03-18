let gulp = require('gulp');
let browserSync = require('browser-sync');
let scss = require('gulp-sass');
let prefixer = require('gulp-autoprefixer');
let gcmq = require('gulp-group-css-media-queries');
let cssmin = require('gulp-clean-css');
let uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const image = require('gulp-image');

gulp.task('html_build', function (done,server) {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('css_build', function (done) {
    gulp.src('./src/assets/scss/style.scss')
        .pipe(scss())
        .pipe(prefixer())
        .pipe(gcmq())
        .pipe(cssmin())
        .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('image', function (done) {
    gulp.src('./src/assets/img/*')
        .pipe(gulp.dest('./build/img/'));
    done();
});

gulp.task('font', function (done) {
    gulp.src('./src/assets/fonts/*')
        .pipe(gulp.dest('./build/fonts/'));
    done();
});

gulp.task('webServer', function(done) {
    browserSync.init({
        server: "build/"
    });
    gulp.watch('./src/**/fonts/*.ttf', gulp.series('font'))
    gulp.watch('./src/**/img/*.png', gulp.series('image'))
    gulp.watch('./src/**/*.html', gulp.series('html_build'));
    gulp.watch('./src/**/*.scss', gulp.series('css_build'));
    done();
});

gulp.task('build', function(done) {
    gulp.src('src/*.html').pipe(gulp.dest('build/'));
    gulp.src('src/assets/scss/*.scss').pipe(gulp.dest('build/css/'))
    done();
});

