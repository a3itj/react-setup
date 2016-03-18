var gulp = require('gulp');
var babel = require('gulp-babel');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var stripDebug = require('gulp-strip-debug');
var path = require('path');
var rename = require('gulp-rename');
var gutil = require("gulp-util");
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var desktopWebpackConfig = require("./../webpack.desktop.config.js");
var rev = require('gulp-rev');
var override = require('gulp-rev-css-url');
var stream = require('webpack-stream');
var fs = require('fs');
var plumber = require('gulp-plumber');
var bs = require("browser-sync").create();

var paths = {
    src: {
        scripts: ['./app/static/js/**/*.js'],
        images: './app/static/images/',
        less: './app/static/css/**/*.less',
        css: './app/static/css/**/*.css',
        fonts: './app/static/fonts/**/*'
    },
    dist: {
        scripts: './app/dist/js',
        images: './app/dist/images/',
        css: './app/dist/css',
        fonts: './app/dist/fonts',
    },
    maps: {
        scripts: './app/dist/maps/js',
        css: './app/dist/maps/css'
    }
};


gulp.task('browserSync', function() {
    bs.init({
        //server: {
            //baseDir: 'webapp'
        //},
        port: 8000,
        proxy: "http://localhost:8000/"
    })
})

var onError = function(err) {
    gutil.beep();
    console.log(err);
    this.emit('end');
};

gulp.task('scripts', function() {
    return gulp.src(paths.src.scripts)
        .pipe(stream(desktopWebpackConfig))
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(bs.reload({
            stream: true
        }));
});

gulp.task('html', function() {
    return gulp.src('./app/templates/**/*.html')
        .pipe(bs.reload({
            stream: true
        }));
});

gulp.task('copy', function() {
    return gulp.src("./app/static/js/**/*.min.js")
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(gulp.src(paths.src.fonts))
        .pipe(gulp.dest(paths.dist.fonts));
});

gulp.task('fonts_copy', function() {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.dist.fonts));
});


gulp.task('image-min', function() {
    var formats = [paths.src.images + '**/*.png', paths.src.images + '**/*.jpg', paths.src.images + '**/*.jpeg']
    return gulp.src(formats)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.dist.images));
});

gulp.task('compress', ['scripts'], function() {
    return gulp.src(['./app/dist/js/**/*.js', '!./app/dist/js/**/*.min.js'])
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(paths.dist.scripts))
});


gulp.task('less', function() {
    return gulp.src(paths.src.less)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(autoprefixer({
            browsers: ['last 6 versions'],
            cascade: false
        }))

    .pipe(gulp.dest(paths.dist.css))
        .pipe(minifyCss())
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(bs.reload({
            stream: true
        }));

});

gulp.task('reversion', ['compress', 'less', 'image-min'], function() {
    return gulp.src(['./app/dist/**/*'])
        .pipe(rev())
        .pipe(override())
        .pipe(gulp.dest('./app/dist/'))
        .pipe(rev.manifest('./app/dist/mapper.json', {
            base: './app/dist/',
            merge: true // merge with the existing manifest (if one exists)
        }))
        .pipe(gulp.dest('./app/dist/'));
});

// Rerun the task when a file changes
gulp.task('watch',['browserSync'],  function() {
    gulp.watch(paths.src.less, ['less']);
    gulp.watch(paths.src.scripts, ['scripts']);
    gulp.watch('./app/templates/**/*.html', ['html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('desktop', ['fonts_copy', 'copy', 'scripts', 'compress', 'image-min', 'less']);
gulp.task('desktop_prod', ['fonts_copy', 'copy', 'scripts', 'compress', 'less', 'image-min', 'reversion']);
