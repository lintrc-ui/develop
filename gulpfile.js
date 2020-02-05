'use strict';

const gulp = require('gulp');

require('./Tasks/config').forEach(taskPath => require(taskPath)());

gulp.task('dev', gulp.series(
	gulp.parallel('pages', 'styles', 'scripts', 'static:copy'),
	gulp.parallel('watch', 'serve')
));

gulp.task('build', gulp.series(
	'clean',
	gulp.parallel('pages', 'styles:production', 'scripts:production', 'static:production', 'images:production', 'favicon')
));

// Команда для сборки: gulp dev --catalog (или другой ключ с именем страницы)
// Команда для релиза (продакшена): npm run build
