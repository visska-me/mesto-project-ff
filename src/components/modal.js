const buttonsClosePopup = document.querySelectorAll(".popup__close");
buttonsClosePopup.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    closeModal(popup);
  });
});

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
  popup.addEventListener("click", closeByOverlayClick);
}

function closeByOverlayClick(evt) {
  const openPopup = document.querySelector(".popup_is-opened");
  if (evt.target === evt.currentTarget) {
    closeModal(openPopup);
  }
}

function closeByEsc(evt) {
  const openPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape") {
    closeModal(openPopup);
  }
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
  popup.removeEventListener("click", closeByOverlayClick);
}
