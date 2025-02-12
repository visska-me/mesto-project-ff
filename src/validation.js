// Очищает валидацию формы
export function clearValidation(form, validationSettings) {
  const inputList = Array.from(form.querySelectorAll(validationSettings.inputSelector));
  const submitButton = form.querySelector(validationSettings.submitButtonSelector);

  inputList.forEach((input) => {
    hideInputError(form, input, validationSettings); // Убираем сообщение об ошибке
    input.setCustomValidity(""); // Сбрасываем кастомные ошибки (если были)
  });
  toggleButtonState(inputList, submitButton, validationSettings); // проверяет невалидные поля в форме
}

// Включает валидацию для всех форм
export function enableValidation(validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach(formElement => setEventListeners(formElement, validationSettings)); //добавляет обработчики для каждой формы
}

// Добавляет обработчики для всех инпутов
function setEventListeners(form, validationSettings) {
  const inputList = Array.from(form.querySelectorAll(validationSettings.inputSelector));
  const submitButton = form.querySelector(validationSettings.submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, validationSettings); // проверяет валидность
      toggleButtonState(inputList, submitButton, validationSettings); //вкл/выкл кнопку
    });
  });
}

// Вкл или выкл кнопку отправки
function toggleButtonState(inputList, submitButton, validationSettings) {
  if (hasInvalidInput(inputList)) { // проверяем есть ли невалид поля
    submitButton.disabled = true; // отключаем кнопку
    submitButton.classList.add(validationSettings.inactiveButtonClass);
  }
  else {
    submitButton.disabled = false; // включаем кнопку
    submitButton.classList.remove(validationSettings.inactiveButtonClass);
  }
}

// Проверяет есть ли невалидное поле и блокирует кнопку
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

// Проверяет валиден ли код
function isValid(form, input, validationSettings) {
  setValidationMessage(input); // устанавливает сообщ об ошибке
  if (!input.validity.valid) {
    showInputError(form, input, validationSettings); // если поле невалидное, показ ошибку
  } 
  else {
    hideInputError(form, input, validationSettings); // есди поле валидное, скрывает ошибку
  }
}

// Делает сообщение об ошибке
function setValidationMessage(inputElement) {
  if (inputElement.validity.patternMismatch) { //если есть ошибка
    inputElement.setCustomValidity(inputElement.dataset.errorMessage); // Используем data-error-message
  } else {
    inputElement.setCustomValidity(""); // сбрасывается ошибка
  }
}

// Показывает сообщение об ошибке
function showInputError(formElement, inputElement, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_error');
  errorElement.textContent = inputElement.validationMessage; // добавляет текст ошибки
  errorElement.classList.add(validationSettings.errorClass); // добавляет класс ошибки
}

// Скрывает сообщение об ошибке
function hideInputError(formElement, inputElement, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_error'); 
  errorElement.classList.remove(validationSettings.errorClass); // убирает класс ошибки
  errorElement.textContent = ''; // очищает текст ошибки
};

