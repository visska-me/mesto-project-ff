const cardTemplate = document.querySelector("#card-template").content;
// Создаём карточки
export function createCard(
  cardData,
  cbDeleteCard,
  cbToggleLike,
  cbOpenImagePopup
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Заполняем данные карточки
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData["place-name"];
  cardTitle.textContent = cardData["place-name"];

  // Удаление карточки
  deleteButton.addEventListener("click", () => {
    cbDeleteCard(cardElement);
  });

  // Ставим лайк
  likeButton.addEventListener("click", () => {
    cbToggleLike(likeButton);
  });

  // Добавляем обработчик для открытия попапа
  cardImage.addEventListener("click", () => {
    cbOpenImagePopup(cardData);
  });

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
