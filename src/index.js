import "./index.css";
import { cardTemplate, createCard, toggleLike } from "./components/card";
import { openModal, closeModal } from "./components/modal";
import { clearValidation, enableValidation } from "./validation";
import { getUserInfo, getCards, addCard, changeUserInfo, deleteCard } from "./components/api";

// Получаем элементы из DOM
const cardList = document.querySelector(".places__list");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
// const buttonSubmit = document.querySelector(".popup__button");

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

// Запускаем валидацию для всех форм
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationSettings);


// Загружаем всё сразу - инфо о пользователе и карточки
Promise.all([getUserInfo(), getCards()])
  .then(([userData, cards]) => {
    updateProfileData(userData);
    const userId = userData._id;
    cards.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        userId,
        deleteCard,
        toggleLike,
        openImagePopup
      );
      cardList.append(cardElement);
    });
  })
  .catch((err) => console.log(err));

// Обновляем инфо о пользователе
function updateProfileData(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
}

// Добавяем слушатели кнопок - обработчики событий
// Кнопка Редактировать профиль
buttonEditProfile.addEventListener("click", () => {
  popupEditProfileName.value = profileTitle.textContent;
  popupEditProfileDescription.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationSettings);
  openModal(popupEditProfile);
});

// Кнопка Добавить карточку
buttonAddCard.addEventListener("click", () => {
  formAddCard.reset();
  clearValidation(popupAddCard, validationSettings);
  openModal(popupAddCard);
});

// Обработчики формы - при нажатии на кнопку Сохранить внутри формы
// Форма редактирования профиля
function handleFormEditProfile(evt) {
  evt.preventDefault(); // отменить стандартное поведение
    // Проверяем, валидна ли форма
    if (!formEditProfile.checkValidity()) {
      return; // Если форма невалидна, то не отправляем
    }
  const newName = popupEditProfileName.value;
  const newAbout = popupEditProfileDescription.value;
  changeUserInfo(newName, newAbout)
  .then((updatedData) => {
    profileTitle.textContent = updatedData.name;
    profileDescription.textContent = updatedData.about;
    closeModal(popupEditProfile);
  })
    .catch((err) => {
      console.log(err);
    });
}
formEditProfile.addEventListener("submit", handleFormEditProfile);

// Форма добавления карточки
function handleFormAddCard(evt) {
  evt.preventDefault();

  const cardData = {
    "place-name": popupAddCardTitle.value,
    link: popupAddCardImageLink.value,
  };

  addCard(cardData["place-name"], cardData.link)
    .then((cardData) => {
      const userId = cardData.owner._id;
      return createCard(cardData, userId, deleteCard, toggleLike, openImagePopup);
    })
    .then((cardElement) => {
      cardList.prepend(cardElement);
      formAddCard.reset();
      closeModal(popupAddCard);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки:", error);
      console.error("Детали ошибки:", error.message);
    });
}

formAddCard.addEventListener("submit", handleFormAddCard);

// Открытие модального окна с картинкой
export function openImagePopup(cardData) {
  popupCardImage.src = cardData.link;
  popupCardTitle.textContent = cardData.name;
  popupCardImage.alt = cardData.name;
  openModal(popupImage);
}