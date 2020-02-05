const gulp = require('gulp'),
			paths = require('./paths'),
			$ = require('gulp-load-plugins')(),
			mediaQueries = require('gulp-group-css-media-queries');

$.sass.compiler = require('node-sass');

module.exports = () => {
	gulp.task('styles', () => {
		return gulp.src(paths['styles'].develop)
			.on('data', file => console.log(file.relative))
			.pipe($.plumber({
				errorHandler: $.notify.onError(err => {
					return {
						title: 'Ошибка в стилях',
						message: err.message
					};
				})
			}))
			.pipe($.sourcemaps.init())
			.pipe($.sass(
				{
					outputStyle: 'nested',
					includePaths: [paths['styles'].watch],
					indentType: 'tab',
					indentWidth: 1,
					precision: 3,
					sourceComments: true
				}
			))
			.pipe($.autoprefixer({
				cascade: false,
				grid: 'autoplace'
			}))
			.pipe(mediaQueries())
			.pipe($.plumber.stop())
			.pipe($.sourcemaps.write())
			.pipe(gulp.dest(paths['styles'].public))
			.pipe($.debug({
				title: 'Styles'
			}));
	});


	gulp.task('styles:production', () => {
		return gulp.src(paths['styles'].develop)
			.pipe($.plumber({
				errorHandler: $.notify.onError(err => {
					return {
						title: 'Ошибка в стилях',
						message: err.message
					};
				})
			}))
			.pipe($.sass(
				{
					includePaths: [paths['styles'].watch],
					precision: 3
				}
			))
			.pipe($.autoprefixer({
				cascade: false,
				grid: 'autoplace'
			}))
			.pipe(mediaQueries())
			.pipe($.csso({
				sourceMap: false
			}))
			.pipe($.plumber.stop())
			.pipe(gulp.dest(paths['styles'].public));
	});
};
