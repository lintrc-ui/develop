document.querySelectorAll('.tabs').forEach(tabs => {
	const linkClass = 'tabs__main-link',
				links = tabs.querySelectorAll(`.${linkClass}`),
				contentClass = 'tabs__content',
				content = tabs.querySelectorAll(`.${contentClass}`),
				linkActive = `${linkClass}--active`,
				contentActive = `${contentClass}--active`;

	tabs.addEventListener('click', el => {
		let activeTabIndex;

		if (el.target.closest(`.${linkClass}`)) {
			activeTabIndex = [...links].indexOf(el.target.closest(`.${linkClass}`));

			for (const link of links) { link.classList.remove(linkActive); }
			links[activeTabIndex].classList.add(linkActive);

			for (const item of content) { item.classList.remove(contentActive); }
			content[activeTabIndex].classList.add(contentActive);
		}
		else if (el.target.closest('.tabs__inline-link') && window.innerWidth < 1024) {
			activeTabIndex = [...content].indexOf(el.target.closest(`.${contentClass}`));

			for (const link of links) { link.classList.remove(linkActive); }
			links[activeTabIndex].classList.add(linkActive);

			if (content[activeTabIndex].classList.contains(contentActive)) {
				content[activeTabIndex].classList.remove(contentActive);
			}
			else {
				for (const item of content) { item.classList.remove(contentActive); }
				content[activeTabIndex].classList.add(contentActive);
			}
		}
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth >= 1024) {
			let active = false;

			content.forEach(item => {
				if (item.classList.contains(contentActive)) { active = true; }
			});

			if (!active) {
				links.forEach((link, index) => {
					if (link.classList.contains(linkActive)) {
						content[index].classList.add(contentActive);
						active = true;
					}
				});
			}
		}
	});

});
