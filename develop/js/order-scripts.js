const paths = require('../../Tasks/paths');

// В качестве ключей указать имя страницы
// В качестве значений - скрипты, необходимые для данной страницы
// Команда для сборки: gulp scripts --catalog (или другой ключ с именем страницы). По умолчанию (без ключей) - первый в списке
module.exports = {
	index: [
		`${paths['scripts'].modules}/js/modules/common.js`,
		`${paths['scripts'].modules}/blocks/tab-cards/tab-cards.js`
	]
};
