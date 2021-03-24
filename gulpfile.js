let gulp = require('gulp');
let browserSync = require('browser-sync');
let sass = require('gulp-sass');
let prefixer = require('gulp-autoprefixer');
let gcmq = require('gulp-group-css-media-queries');
let cssmin = require('gulp-clean-css');
let uglify = require('gulp-uglify');
gulp.task('html_build', function (done) {
    gulp.src('src/index.html')
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('css_build', function (done) {
    gulp.src('src/assets/scss/style.scss')
        .pipe(sass())
        .pipe(prefixer())
        .pipe(gcmq())
        .pipe(cssmin())
        .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('webServer', function(done) {
    browserSync.init({
        server: "build/"
    });
    gulp.watch('src/**/*.html', gulp.series('html_build'));
    gulp.watch('src/**/*.scss', gulp.series('css_build'));
    done();
});

gulp.task('build', function(done) {
    gulp.src('src/*.html').pipe(gulp.dest('build/'));
    gulp.src('src/assets/scss/*.scss').pipe(gulp.dest('src/css/'))
    done();
});

