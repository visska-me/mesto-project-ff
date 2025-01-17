export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  const closeModalButton = popup.querySelector(".popup__close");

  function handleCloseButton() {
    closeModal(popup);
  }

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeModal(popup);
    }
  }

  function handleEscape(evt) {
    if (evt.key === "Escape") {
      closeModal(popup);
    }
  }

  popup._removeHandlers = () => {
    closeModalButton.removeEventListener("click", handleCloseButton);
    popup.removeEventListener("click", handleOverlayClick);
    document.removeEventListener("keydown", handleEscape);
  };

  closeModalButton.addEventListener("click", handleCloseButton);
  popup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscape);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  if (typeof popup._removeHandlers === "function") {
    popup._removeHandlers();
    delete popup._removeHandlers();
  }
}
