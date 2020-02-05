const gulp = require('gulp'),
			$ = require('gulp-load-plugins')(),
			paths = require('./paths'),
			del= require('del');

// Для добавления тегов из favicon.html в html страницы проекта, внутри каждой страницы в теге `head` должны находиться комментарии:
// <!-- inject:head:favicons -->
// <!-- endinject -->
// Между ними и будут вставляться теги иконок

// Настройки favicons. Использовать в задачах, что нужно, остальное будет по умолчанию
// Данные из объекта в задачах не используются, приведены для справки
const config = {
	appName: 'My App', // Название проекта
	appShortName: 'App', // Короткое название проекта (опционально). Если нет. используется полное имя
	appDescription: 'This is my application', // Описание проекта
	dir: 'auto', // Основное направление текста для appName, appShortName и appDescription
	version: '1.0', // Версия проекта
	url: 'https://github.com/lintrc-ui/rules/', // Ссылка на проект
	developerName: 'Aleksi Magner', // Имя разработчика
	developerURL: 'https://aleksimagner.github.io/w/', // Адрес разработчика
	lang: 'en-US', // Основной язык для appName и appShortName
	start_url: '/?homescreen=1', // Начальный URL при запуске приложения с устройства
	path: './favicons/', // Путь для переопределения пути значков по умолчанию
	scope: '/', // набор URL, которые браузер рассматривает в вашем приложении
	display: 'browser', // Предпочтительный режим отображения: "fullscreen", "standalone", "minimal-ui" или "browser"
	orientation: 'any', // Ориентация по умолчанию: "any", "natural", "portrait" или "landscape"
	logging: false, // Выводить логи в консоль?
	appleStatusBarStyle: 'black-translucent', // Стиль для строки состояния Apple: "black-translucent", "default", "black"
	pixel_art: false, // Сохраняет пиксели "острыми" при увеличении для пиксельной графики. Поддерживается только в оффлайн режиме
	loadManifestWithCredentials: true, // Браузеры не отправляют куки при получении манифеста, включите это, чтобы исправить это
	theme_color: '#fafafa', // Цвет темы пользователя, например, в переключателе задач Android
	background: '#00bcd4', // Цвет фона для плоских иконок
	icons: {
		// Опции для платформ:
		// `boolean` или `{ offset, background, mask, overlayGlow, overlayShadow }`
		// - offset - смещение в процентах
		// - background:
		//   * false - используется по умолчанию
		//   * true - принудительное использование по умолчанию, например установить фон для иконок Android
		//   * color - установить фон для указанных значков
		// - mask - применить маску, чтобы создать круглый значок (по умолчанию применяется для Firefox). `boolean`
		// - overlayGlow - применить эффект свечения после применения маски (применяется по умолчанию для Firefox). `boolean`
		// - overlayShadow - применить тень после применения маски .`boolean`
		android: true, // Создать иконку для домашнего экрана Android
		appleIcon: true, // Создать иконку для Apple touch
		appleStartup: true, // Создать изображение для запуска Apple
		coast: true, // Создать иконку для Opera
		firefox: true, // Создать иконку для Firefox OS
		windows: true, // Создать иконку плитки Windows 8
		yandex: true, // Создать иконку Яндекс браузера
		favicons: true // Создать обычную favicon.ico
	},
	pipeHTML: true, // создавать HTML
	html: 'favicon.html', // имя и расположение файла со сгенерированными тегами иконок
	replace: true // заменять код
};

module.exports = () => {
	// Создание иконок из исходного файла
	gulp.task('favicon:generate', () => {
		return gulp.src(paths['favicon'].develop)
			.pipe($.favicons({
				appName: 'Lintrc UI',
				appDescription: 'Visual configuration of linter language for programming and markup languages with user interface (UI)',
				url: 'https://github.com/lintrc-ui/rules/',
				developerName: 'Aleksi Magner',
				developerURL: 'https://aleksimagner.github.io/w/',
				path: './favicons/',
				display: 'browser',
				orientation: 'any',
				logging: false,
				appleStatusBarStyle: 'black-translucent',
				loadManifestWithCredentials: true,
				theme_color: '#fff',
				background: '#263238',
				icons: {
					android: true,
					appleIcon: true,
					appleStartup: true,
					coast: true,
					firefox: true,
					favicons: true,
					yandex: true,
					windows: true
				},
				pipeHTML: true,
				html: 'favicon.html',
        replace: true
			}))
			.pipe(gulp.dest(paths['favicon'].public));
	});


	// Вставляет содержимое сгенерированного файла `favicon.html` в `index.html`
	gulp.task('favicon:inject', () => {
		return gulp.src(paths['favicon'].watch)
			.pipe($.inject(gulp.src(`${paths['favicon'].public}favicon.html`), {
				starttag: '<!-- inject:head:favicons -->',
				transform: (filePath, file) => file.contents.toString('UTF-8') // return file contents as string
			}))
			.pipe(gulp.dest(paths['pages'].public));
	});


	// Удаляет сгенерированный файл `favicon.html` за ненадобностью
	gulp.task('favicon:del', () => del(`${paths['favicon'].public}favicon.html`));


	// Последовательный запуск задач для продакшена
	gulp.task('favicon', gulp.series('favicon:generate', 'favicon:inject', 'favicon:del'));
};
