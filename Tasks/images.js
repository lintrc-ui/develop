const gulp = require('gulp'),
			paths = require('./paths'),
			$ = require('gulp-load-plugins')();

module.exports = () => {
	gulp.task('images:production', () => {
		return gulp.src(paths['images'].develop)
			.on('data', file => console.log(file.relative))
			.pipe($.plumber({
				errorHandler: $.notify.onError(err => {
					return {
						title: 'Ошибка в изображениях',
						message: err.message
					};
				})
			}))
			.pipe($.imagemin([
				$.imagemin.gifsicle({ interlaced: true }),
				$.imagemin.mozjpeg({ quality: 75, progressive: true }),
				$.imagemin.optipng({ optimizationLevel: 3 })
			]))
			.pipe($.plumber.stop())
			.pipe(gulp.dest(paths['images'].public))
			.pipe($.debug({
				title: 'Images'
			}));
	});
};
