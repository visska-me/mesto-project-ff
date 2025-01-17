const cardTemplate = document.querySelector("#card-template").content;
// Создаём карточки
export function createCard(cardData, cbDelete, cbLike, cbImage) {
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
    cbDelete(cardElement);
  });

  // Ставим лайк
  likeButton.addEventListener("click", () => {
    cbLike(likeButton);
  });

  // Добавляем обработчик для открытия попапа
  cardImage.addEventListener("click", () => {
    cbImage(cardData);
  });

  return cardElement;
}
