const logo = document.querySelector('.header__downLogo svg'); // Логотип
const popup = document.getElementById('logoPopup'); // Попап
const closePopup = document.getElementById('closePopup'); // Кнопка закрытия

// Открытие попапа при нажатии на логотип
logo.addEventListener('click', () => {
  popup.classList.add('show'); // Добавляем класс для показа
});

// Закрытие попапа при нажатии на кнопку
closePopup.addEventListener('click', () => {
  popup.classList.remove('show'); // Убираем класс для скрытия
});

// Закрытие попапа при клике вне изображения
popup.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.classList.remove('show'); // Убираем класс для скрытия
  }
});