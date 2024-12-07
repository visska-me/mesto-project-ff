// Получаем шаблон и список карточек из DOM
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

// Создаём карточки
function createCard(cardData, onDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // Заполняем данные карточки
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link; // Устанавливаем ссылку на изображение
  cardImage.alt = cardData.name; // Альтернативный текст изображения
  cardTitle.textContent = cardData.name; // Название карточки

  // Добавляем обработчик для удаления карточки
  deleteButton.addEventListener('click', () => {
    onDelete(cardElement); // Вызов переданного колбэка
  });
  return cardElement;
}
// Удаление карточки
function handleCardDelete(cardElement) {
  cardElement.remove();
}

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, handleCardDelete);
  cardList.append(cardElement);
});