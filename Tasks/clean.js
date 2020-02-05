const publicDir = 'public',
			gulp = require('gulp'),
			del = require('del');

module.exports = () => {
	gulp.task('clean', () => del(publicDir));
};
