const gulp = require('gulp'),
			browserSync = require('browser-sync').create(),
			publicDir = 'public';

module.exports = () => {
	gulp.task('serve', () => {
    browserSync.init({
			server: {
				baseDir: publicDir,
				index: 'index.html' // менять в зависимости от текущей страницы, находящейся в разработке
			},
			port: 5500,
			notify: false,
			browser: ['opera', 'firefox'],
			ui: false,
			logLevel: 'warn'
		});

		browserSync.watch(`${publicDir}/**/*`).on('change', browserSync.reload);
	})
};
