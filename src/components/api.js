export const BASE_URL = "https://nomoreparties.co/v1/wff-cohort-31";
export const TOKEN = "cb9524e5-e106-46f1-9342-c7a78b66bd78";

// Запрос информации о пользователе
export function getUserInfo() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function changeUserInfo(profilTitle, profileDescription) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: profilTitle,
      about: profileDescription,
    }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

// Запрос карточек
export function getCards() {
  return fetch(`${BASE_URL}/cards`, {
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function addCard(name, link) {
  const cardData = { name, link };
  return fetch(`${BASE_URL}/cards`, {
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(cardData),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function likeCard(CardID) {
  return fetch(`${BASE_URL}/cards/likes/` + CardID, {
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    method: "PUT",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function removeLikeCard(CardID) {
  return fetch(`${BASE_URL}/cards/likes/` + CardID, {
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function deleteCard(CardID) {
  return fetch(`${BASE_URL}/cards/` + CardID, {
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    method: "DELETE", 
}).then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
});
}

export function changeProfileImage(link) {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    method: "PATCH", 
    body: JSON.stringify({
      avatar: link,
    })
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}