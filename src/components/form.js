export function openForm(name, cbFormEditProfile) {
  const form = document.forms[name];
  const inputs = [...form.querySelectorAll("input")];

  function getValues() {
    return inputs.reduce(
      (acc, input) => ({ ...acc, [input.name]: input.value }),
      {}
    );
  }

  function handleFormSubmit(evt) {
    evt.preventDefault(); // отменить стандартное поведение
    cbFormEditProfile(getValues());
    form.reset();
    form.removeEventListener("submit", handleFormSubmit);
  }

  form.addEventListener("submit", handleFormSubmit);
}
