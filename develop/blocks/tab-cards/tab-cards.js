document.querySelectorAll('.tabs').forEach(tabs => {
	tabs.addEventListener('click', el => {
		if (el.target.classList.contains('tabs__main-link') || el.target.classList.contains('tabs__inline-link')) {
			el.stopPropagation();

			const mainLinks = tabs.querySelectorAll('.tabs__main-link'),
						tabsContent = tabs.querySelectorAll('.tabs__content'),
						inlineLinks = tabs.querySelectorAll('.tabs__inline-link');

			let activeTabIndex;

			if (el.target.closest('.tabs__list')) { activeTabIndex = [...mainLinks].indexOf(el.target); }
			else { activeTabIndex = [...tabsContent].indexOf(el.target.parentElement); }

			for (const item of tabsContent) { item.classList.remove('tabs__content--active'); }
			tabsContent[activeTabIndex].classList.add('tabs__content--active');

			for (const link of mainLinks) { link.classList.remove('tabs__main-link--active'); }
			mainLinks[activeTabIndex].classList.add('tabs__main-link--active');

			for (const link of inlineLinks) { link.classList.remove('tabs__inline-link--active'); }
			inlineLinks[activeTabIndex].classList.add('tabs__inline-link--active');
		}
	});
});
