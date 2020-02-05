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
