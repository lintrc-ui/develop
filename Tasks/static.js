const gulp = require('gulp'),
			paths = require('./paths'),
			$ = require('gulp-load-plugins')();

gulp.task('copy:staticDir', () => {
	return gulp.src(paths['static'].develop, { since: gulp.lastRun('copy:staticDir') })
		.pipe($.plumber({
			errorHandler: $.notify.onError(err => {
				return {
					title: 'Ошибка при перемещении статических файлов',
					message: err.message
				};
			})
		}))
		.pipe($.newer(paths['static'].public))
		.on('data', file => console.log(file.relative))
		.pipe($.plumber.stop())
		.pipe(gulp.dest(paths['static'].public))
		.pipe($.debug({ title: 'Static copy' }));
});

gulp.task('copy:images', () => {
	return gulp.src(paths['images'].develop, { since: gulp.lastRun('copy:images') })
		.pipe($.plumber({
			errorHandler: $.notify.onError(err => {
				return {
					title: 'Ошибка при перемещении изображений',
					message: err.message
				};
			})
		}))
		.pipe($.newer(paths['images'].public))
		.on('data', file => console.log(file.relative))
		.pipe($.plumber.stop())
		.pipe(gulp.dest(paths['images'].public))
		.pipe($.debug({ title: 'Static copy' }));
});

module.exports = () => {
	gulp.task('static:copy', gulp.series('copy:staticDir', 'copy:images'));
	gulp.task('static:production', gulp.series('copy:staticDir'));
};
