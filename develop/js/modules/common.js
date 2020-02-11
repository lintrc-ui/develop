'use strict';

// Sync theme buttons
const themeButtons = document.querySelectorAll('.theme-button__check'),
			classTheme = 'is_light';

themeButtons.forEach(button => {
	button.addEventListener('click', el => {
		const setCheck = bool => {
			themeButtons.forEach(btn => {
				if (btn.id != el.target.id) { document.getElementById(btn.id).checked = bool; }
			});
		};

		if (!el.target.checked) { setCheck(false); }
		else { setCheck(true); }

		document.body.classList.toggle(classTheme);
	});
});

// closing the menu by clicking outside the zone
document.documentElement.addEventListener('click', el => {
	if (!el.target.closest('.menu')) {
		document.getElementById('menu').checked = false;
	}
});
