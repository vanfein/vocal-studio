'use strict';

var gulp = require('gulp'),//
    watch = require('gulp-watch'),//
    prefixer = require('gulp-autoprefixer'),//
    less = require('gulp-less'),//
    uglify = require('gulp-uglify'),//
    sourcemaps = require('gulp-sourcemaps'),//
    rigger = require('gulp-rigger'),//
    cssmin = require('gulp-clean-css'),//
    imagemin = require('gulp-imagemin'),//
    spritesmith = require('gulp.spritesmith'),//
    rename = require('gulp-rename'),//
    pngquant = require('imagemin-pngquant'),//
    rimraf = require('rimraf'),//
    GulpSSH = require('gulp-ssh'),//
    fs = require('fs'),
    browserSync = require("browser-sync"),//
    reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html:   'build/',
        ajax:   'build/ajax/',
        js:     'build/js/',
        css:    'build/css/',
        img:    'build/img/',
        tmp:    'build/tmp/',
        fonts:  'build/fonts/',
        plugin: 'build/plugin/'
    },
    src: { //Пути откуда брать исходники
        html:   'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        ajax:   'src/ajax/*.php',
        js:     'src/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
        style:  'src/style/**/*.less',
        img:    'src/img/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        tmp:    'src/tmp/**/*.*',
        fonts:  'src/fonts/**/*.*',
        plugin: 'src/plugin/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html:   'src/**/*.html',
        ajax:   'src/ajax/*.php',
        js:     'src/js/**/*.js',
        style:  'src/style/**/*.less',
        img:    'src/img/**/*.*',
        sprite: 'src/img/sprite/*.*',
        tmp:    'src/tmp/**/*.*',
        fonts:  'src/fonts/**/*.*',
        plugin: 'src/plugin/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};


gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.js)) //выплевываем несжатые файлы
        .pipe(uglify()) //Сожмем наш js
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(less()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('tmp:build', function () {
    gulp.src(path.src.tmp) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.tmp)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('plugin:build', function() {
    gulp.src(path.src.plugin)
        .pipe(gulp.dest(path.build.plugin))
});

gulp.task('ajax:build', function() {
    gulp.src(path.src.ajax)
        .pipe(gulp.dest(path.build.ajax))
});

gulp.task('sprite:build', function() {
    var spriteData = 
        gulp.src('src/img/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.less',
                cssFormat: 'less',
                algorithm: 'binary-tree',
                imgPath: '../img/sprite.png'
            }));

    spriteData.img.pipe(gulp.dest('build/img/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('src/style/part/')); // путь, куда сохраняем стили
});

gulp.task('build', [
    'html:build',
    'ajax:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'tmp:build',
    'plugin:build'
]);



gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.ajax], function(event, cb) {
        gulp.start('ajax:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
     watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.tmp], function(event, cb) {
        gulp.start('tmp:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.plugin], function(event, cb) {
        gulp.start('plugin:build');
    });
});


gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);

gulp.task('sprite', [
    'sprite:build'
]);



var configSSH = { // данные для доступа к ssh
  host: '192.162.1.1',
  port: 22,
  username: 'username',
  password: 'password' 
}

var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: configSSH
})

gulp.task('dest', function () {
  return gulp
    .src('build/**/*')
    .pipe(gulpSSH.dest('/')) // директория на сервере от корня
});