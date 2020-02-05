const gulp = require('gulp'),
			paths = require('./paths');

module.exports = () => {
	gulp.task('watch', () => {
		gulp.watch(paths['pages'].watch, gulp.series('pages'));
		gulp.watch(paths['styles'].watch, gulp.series('styles'));
		gulp.watch(paths['scripts'].watch, gulp.series('scripts'));
		gulp.watch([paths['static'].watch, paths['images'].watch], gulp.series('static:copy'));
	})
};
