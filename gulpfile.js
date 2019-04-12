var gulp 				= require('gulp'),
    sass 				= require('gulp-sass'),
    browserSync 		= require("browser-sync").create(),
    concat      		= require('gulp-concat'),
    uglify      		= require('gulp-uglifyjs'),
    cssnano     		= require('gulp-cssnano'),
    rename      		= require('gulp-rename'),
    del         		= require('del'),
    imagemin    		= require('gulp-imagemin'),
    pngquant    		= require('imagemin-pngquant'),
    cache       		= require('gulp-cache'),
    autoprefixer 		= require('gulp-autoprefixer'),
	sprity 				= require('sprity'),
	spritesmith 		= require('gulp.spritesmith'),
	fileinclude 		= require('gulp-file-include');
	
gulp.task('fileinclude', function () {
    return gulp.src('app/files/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('app'));
});
 
gulp.task('sprite', function () {
  var spriteData = gulp.src('app/img/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));
  return spriteData.pipe(gulp.dest('app/sprites/'));
});

gulp.task('clear', function () {
    return cache.clearAll();
});


/* SASS TASK */
gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

/* BROWSER SYNC INIT TASK */
function browserSyncInit(done) {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
	done();
}

/* BROWSER SYNC RELOAD TASK */
function browserSyncReload(done) {
    browserSync.reload();
    done();
  }

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
            plugins: [
                    {
                    removeViewBox: false,
                    collapseGroups: true
                    }
                ]
            })
        ])
        )
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('css-libs', gulp.parallel('sass'), function() {
    return gulp.src('app/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('scripts', function() {
    return gulp.src([ 
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        'app/libs/owlcarousel2/dist/owl.carousel.min.js',
		'app/libs/bootstrap/js/bootstrap.min.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

function clean(done) {
    del.sync('dist'); // Удаляем папку dist перед сборкой
    done();
};

function copy_files(done){
    var buildCss = gulp.src('app/css/**/*')
    .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'));
	
	var buildSprites = gulp.src('app/sprites/**/*') // Переносим спрайты в продакшен
    .pipe(gulp.dest('dist/sprites'));

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'));
	
	var buildLibs = gulp.src('app/libs/**/*') // Переносим libs
    .pipe(gulp.dest('dist/libs'));

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

    done();
}

/* СБОРКА */
gulp.task('build', gulp.series(clean, 'img', 'fileinclude', 'sass', 'scripts', copy_files));


gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами
	gulp.watch('app/files/**/*.html', gulp.series('fileinclude'), browserSyncReload);
	gulp.watch('app/*.html', gulp.series(browserSyncReload));
	gulp.watch('app/img/sprites/**/*.png', gulp.parallel('sprite'));
	gulp.watch('app/js/**/*.js', gulp.series(browserSyncReload));
    // Наблюдение за другими типами файлов
});

gulp.task('default', gulp.parallel('watch', 'fileinclude', 'css-libs', browserSyncInit, 'scripts'));