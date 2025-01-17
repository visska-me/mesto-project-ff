import "./index.css";
import { initialCards } from "./scripts/cards";
import { createCard } from "./components/create-card";
import { openModal, closeModal } from "./components/modal";
import { openForm } from "./components/form";

// Получаем шаблон и список карточек из DOM
const cardList = document.querySelector(".places__list");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popupCardImage = popupImage.querySelector(".popup__image");
const popupCardTitle = popupImage.querySelector(".popup__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Обработчики форм
function handleFormEditProfile(userData) {
  profileTitle.textContent = userData["name"];
  profileDescription.textContent = userData["description"];
  closeModal(popupEditProfile);
}

function handleFormNewCard(cardData) {
  const newCard = createCard(cardData, cardDelete, cardLike, cardImage);
  cardList.prepend(newCard);
  closeModal(popupAddCard);
}

// Слушатели кнопок
// Редактировать профиль
buttonEditProfile.addEventListener("click", () => {
  openModal(popupEditProfile);
  openForm("edit-profile", handleFormEditProfile);
});

// Добавить карточку
buttonAddCard.addEventListener("click", () => {
  openModal(popupAddCard);
  openForm("new-place", handleFormNewCard);
});

// Колбэки Card
function cardDelete(cardElement) {
  cardElement.remove();
}
function cardLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
function cardImage(cardImage) {
  popupCardImage.src = cardImage.link;
  popupCardTitle.textContent = cardImage["place-name"];
  popupCardImage.alt = cardImage["place-name"];
  openModal(popupImage);
}

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, cardDelete, cardLike, cardImage);
  cardList.append(cardElement);
});
