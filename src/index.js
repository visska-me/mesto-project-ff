import "./index.css";
import { initialCards } from "./scripts/cards";
import { createCard, deleteCard, toggleLike } from "./components/card";
import { openModal, closeModal } from "./components/modal";

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
const formEditProfile = document.forms["edit-profile"];
const popupEditProfileName = formEditProfile.querySelector(
  ".popup__input_type_name"
);
const popupEditProfileDescription = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const formAddCard = document.forms["new-place"];
const popupAddCardTitle = formAddCard.querySelector(
  ".popup__input_type_card-name"
);
const popupAddCardImageLink = formAddCard.querySelector(
  ".popup__input_type_url"
);

// Слушатели кнопок
// Редактировать профиль
buttonEditProfile.addEventListener("click", () => {
  popupEditProfileName.value = profileTitle.textContent;
  popupEditProfileDescription.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

// Добавить карточку
buttonAddCard.addEventListener("click", () => {
  openModal(popupAddCard);
});

// Обработчик кнопки внутри формы
function handleFormEditProfile(evt) {
  evt.preventDefault(); // отменить стандартное поведение
  profileTitle.textContent = popupEditProfileName.value;
  profileDescription.textContent = popupEditProfileDescription.value;
  closeModal(popupEditProfile);
}

formEditProfile.addEventListener("submit", handleFormEditProfile);

function handleFormAddCard(evt) {
  evt.preventDefault();
  const cardData = {
    "place-name": popupAddCardTitle.value,
    link: popupAddCardImageLink.value,
  };
  const cardElement = createCard(
    cardData,
    deleteCard,
    toggleLike,
    openImagePopup
  );
  cardList.prepend(cardElement);
  formAddCard.reset();
  closeModal(popupAddCard);
}

formAddCard.addEventListener("submit", handleFormAddCard);

// Колбэки Card
function openImagePopup(cardImage) {
  popupCardImage.src = cardImage.link;
  popupCardTitle.textContent = cardImage["place-name"];
  popupCardImage.alt = cardImage["place-name"];
  openModal(popupImage);
}

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData,
    deleteCard,
    toggleLike,
    openImagePopup
  );
  cardList.append(cardElement);
});
