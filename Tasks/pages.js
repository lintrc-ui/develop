const gulp = require('gulp'),
			paths = require('./paths'),
			$ = require('gulp-load-plugins')();

module.exports = () => {
	gulp.task('pages', () => {
		return gulp.src(paths['pages'].develop)
			.on('data', file => console.log(file.relative))
			.pipe($.plumber({
				errorHandler: $.notify.onError(err => {
					return {
						title: 'Ошибка в Pug',
						message: err.message
					};
				})
			}))
			.pipe($.pug(
				{
					pretty: true
				}
			))
			.pipe($.plumber.stop())
			.pipe(gulp.dest(paths['pages'].public))
			.pipe($.debug({
				title: 'Pages'
			}))
	});
};
