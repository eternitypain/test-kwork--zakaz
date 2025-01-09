// GLOBAL VALUES
const body = document.querySelector('body');
// временно проставлено вручную, будто бы мы находимcя на странице "Журнал ФИО"
// в дальнейшем нужно будет определять страницу по урлу



let initialInnerWidth = window.innerWidth;
let initialOuterWidth = window.outerWidth;
let initialDevicePixelRatio = window.devicePixelRatio;

setScaleFactor();
window.addEventListener('resize', setScaleFactor);

function setScaleFactor() {
	// Определяем масштабирование на основе ширины экрана
	const winScale = window.innerWidth < 1080 ? 1 : window.devicePixelRatio;


	// Устанавливаем --scale-factor в CSS
	document.documentElement.style.setProperty('--scale-factor', winScale);

	const delEditIconsSize = `${20 / 1536 * window.innerWidth}px`;
	document.documentElement.style.setProperty('--base-icon-size', delEditIconsSize);

	const tasselIconSize = `${16 / 1536 * window.innerWidth}px`;
	document.documentElement.style.setProperty('--tassel-icon-size', tasselIconSize);


	// Проверка на изменение масштаба
	const currentDevicePixelRatio = window.devicePixelRatio;

	if (currentDevicePixelRatio !== initialDevicePixelRatio) {
		console.log('Skip font scaling adjustment due to browser zoom');
		// Обновляем начальное значение для следующих проверок
		initialDevicePixelRatio = currentDevicePixelRatio;
	} else {
		if (window.innerWidth >= 1536) {
			body.style.fontSize = `calc(27px / var(--scale-factor))`;
		} else if (window.innerWidth <= 640) {
			body.style.fontSize = `calc(18px / var(--scale-factor))`;
		} else {
			body.style.fontSize = `calc(27px / var(--scale-factor))`;
		}
	}

	// Отключаем transition временно при изменении масштаба
	document.documentElement.classList.add('no-transition');
	setTimeout(() => {
		document.documentElement.classList.remove('no-transition');
	}, 0); // Пауза в 0 секунд перед включением transition обратно
}

// const currentNumber = window.innerWidth > 1921 ? 44 : 48;
// document.querySelectorAll('.tooltip-b').forEach((el) => {
// 	el.style.bottom = `calc(${-(currentNumber - 8) / 1536 * window.innerWidth}px / var(--scale-factor))`;
// })
// const currentNumber = window.innerWidth > 1921 ? 44 : 48;
// const posTootip = `${-currentNumber / 1536 * window.innerWidth}px`;
// document.documentElement.style.setProperty('--pos', posTootip);
// document.querySelectorAll('.icon-delete svg').forEach((el) => {
// 	el.style.width = `calc(${20 / 1536 * window.innerWidth}px / var(--scale-factor))`
// 	el.style.height = `calc(${20 / 1536 * window.innerWidth}px / var(--scale-factor))`
// })
// document.querySelectorAll('.icon-edit svg').forEach((el) => {
// 	el.style.width = `calc(${20 / 1536 * window.innerWidth}px / var(--scale-factor))`
// 	el.style.height = `calc(${20 / 1536 * window.innerWidth}px / var(--scale-factor))`
// })

function adjustPanelPadding() {
	const panel = document.querySelector('.third-panel.journals.panels__panel');
	const firstTab = panel.querySelector('.third-panel__tab');
	const lastTab = panel.querySelector('.third-panel__tab.more');

	if (firstTab && lastTab) {
		const firstTabText = firstTab.querySelector('.third-panel__tab-text');
		const lastTabText = lastTab.querySelector('.third-panel__tab-text');

		// Получаем координаты и размеры элементов
		const firstTabRect = firstTab.getBoundingClientRect();
		const firstTabTextRect = firstTabText.getBoundingClientRect();
		const lastTabRect = lastTab.getBoundingClientRect();
		const lastTabTextRect = lastTabText.getBoundingClientRect();

		// Вычисляем расстояния
		const leftPaddingCompensation = firstTabTextRect.left - firstTabRect.left;
		const rightPaddingCompensation = lastTabRect.right - lastTabTextRect.right;

		// Переводим компенсацию в пиксели в vw
		const vwUnit = window.innerWidth / 100;
		const leftPaddingCompensationVw = leftPaddingCompensation / vwUnit;
		const rightPaddingCompensationVw = rightPaddingCompensation / vwUnit;

		// Устанавливаем значения через custom properties
		panel.style.setProperty('--left-padding-compensation', `${leftPaddingCompensationVw}vw`);
		panel.style.setProperty('--right-padding-compensation', `${rightPaddingCompensationVw}vw`);

		// Устанавливаем padding через custom properties
		const basePaddingVW = window.innerWidth <= 640 ? 1.5 : 2.2;

		if (window.innerWidth >= 1300 && window.devicePixelRatio >= 1.25) {
			if (window.devicePixelRatio === 1.25) {
				const maxShiftWidth = 1800; // Максимальная ширина окна, для которой используется сдвиг
				const minShiftWidth = 1300; // Минимальная ширина окна, при которой используется сдвиг
				const scaleFactor = Math.min(Math.max((window.innerWidth - minShiftWidth) / (maxShiftWidth - minShiftWidth), 0), 1);
				const translateX = scaleFactor * -0.6; // Сдвиг на основе масштаба
				firstTab.style.transform = `translateX(${translateX}vw)`;
			}
			if (window.devicePixelRatio === 1.5) {
				const maxShiftWidth = 1500; // Максимальная ширина окна, для которой используется сдвиг
				const minShiftWidth = 1300; // Минимальная ширина окна, при которой используется сдвиг
				const scaleFactor = Math.min(Math.max((window.innerWidth - minShiftWidth) / (maxShiftWidth - minShiftWidth), 0), 1);
				const translateX = scaleFactor * -0.6; // Сдвиг на основе масштаба
				firstTab.style.transform = `translateX(${translateX}vw)`;
			}
		} else {
			panel.style.paddingLeft = `calc(${basePaddingVW}vw - var(--left-padding-compensation))`;
			panel.style.paddingRight = `calc(${basePaddingVW}vw - var(--right-padding-compensation))`;
			firstTab.style.transform = `translateX(calc(-0px / var(--scale-factor)))`;
		}
	}
}

// Функция для создания тоста
function showToast(title = 'error', text = '', message = '') {
	const toastContainer = document.getElementById('toast-container');

	// Создаём элемент тоста
	const toast = document.createElement('div');
	toast.className = 'toast';

	// Добавляем заголовок и текст ошибки
	toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-text">${text}</div>
        <div class="toast-text">${message}</div>
    `;

	// Добавляем тост в контейнер
	toastContainer.appendChild(toast);

	// Удаляем тост через 2 секунды
	setTimeout(() => {
		toast.remove();
	}, 2000);
}