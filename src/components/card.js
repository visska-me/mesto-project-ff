import { openImagePopup } from "../index.js";
import { likeCard, removeLikeCard, deleteCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

// Создаём карточки
export function createCard(
  cardData,
  userId,
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
  const cardLikeCount = cardElement.querySelector(".card__like-count");


  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCount.textContent = cardData.likes ? cardData.likes.length : 0;

  // Проверяем, лайкнул ли текущий пользователь эту карточку
  if (cardData.likes && cardData.likes.some(like => like._id === userId)) {
  likeButton.classList.add("card__like-button_is-active");
  }

  console.log("ID текущего пользователя:", userId);
console.log("ID владельца карточки:", cardData.owner._id);

  // Показываем кнопку удаления только для своих карточек
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", (evt) => {
      cbDeleteCard(cardData._id, cardElement);
    });
  } else {
    deleteButton.classList.add("card__delete-button_inactive");
  }

  // Ставим лайк
  likeButton.addEventListener("click", () => {
    cbToggleLike(likeButton);
  });

  // Добавляем обработчик для открытия попапа
  cardImage.addEventListener("click", () => {
      openImagePopup(cardData);
  });

  return cardElement;
}

export function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
};
