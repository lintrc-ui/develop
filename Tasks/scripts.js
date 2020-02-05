const gulp = require('gulp'),
			$ = require('gulp-load-plugins')(),
			paths = require('./paths'),
			orderScripts = require(paths['scripts'].scriptsList),
			flag = require('yargs').argv;

gulp.task('scripts:auxiliary', () => {
	return gulp.src(paths['scripts'].auxiliary)
		.pipe(gulp.dest(paths['scripts'].public))
		.pipe($.debug({ title: 'Auxiliary' }));
});


gulp.task('scripts:dev', () => {
	const pages = [];

	// Получаем название ключей из файла order-scripts.js
	for (const key in orderScripts) { pages.push(key); }

	let buildPage = orderScripts[pages[0]],
			prefix = pages[0];

	// На основании ключа устанавливаем порядок файлов для конкретной страницы
	pages.forEach(pageScripts => {
		if (flag[pageScripts]) {
			buildPage = orderScripts[pageScripts];
			prefix = pageScripts;
		}
	});

	return gulp.src(buildPage)
		.pipe($.plumber({
			errorHandler: $.notify.onError(err => {
				return {
					title: 'Ошибка в скриптах',
					message: err.message
				};
			})
		}))
		.on('data', file => console.log(file.relative))
		.pipe($.concat(prefix + paths['scripts'].outputFile))
		.pipe($.terser({
			toplevel: true,
			safari10: true,
			keep_classnames: true
		}))
		.pipe($.plumber.stop())
		.pipe(gulp.dest(paths['scripts'].public))
		.pipe($.debug({ title: 'Scripts' }));
});


gulp.task('scripts:build', callback => {
	const pages = [];

	// Получаем название ключей из файла order-scripts.js
	for (const key in orderScripts) { pages.push(key); }

	let buildPage = orderScripts[pages[0]],
			prefix = pages[0];

	// Устанавливаем порядок файлов для каждой страницы и создаём отдельные файлы
	pages.forEach(pageScripts => {
		buildPage = orderScripts[pageScripts];
		prefix = pageScripts;

		gulp.src(buildPage)
		.pipe($.plumber({
			errorHandler: $.notify.onError(err => {
				return {
					title: 'Ошибка в скриптах',
					message: err.message
				};
			})
		}))
		.on('data', file => console.log(file.relative))
		.pipe($.concat(prefix + paths['scripts'].outputFile))
		.pipe($.terser({
			toplevel: true,
			safari10: true,
			keep_classnames: true
		}))
		.pipe($.plumber.stop())
		.pipe(gulp.dest(paths['scripts'].public))
		.pipe($.debug({ title: 'Scripts' }));
	});

	callback();
});


module.exports = () => {
	gulp.task('scripts', gulp.series('scripts:auxiliary', 'scripts:dev'));
	gulp.task('scripts:production', gulp.series('scripts:auxiliary', 'scripts:build'));
};

