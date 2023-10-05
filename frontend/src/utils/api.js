export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
  }
  
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  
  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._handleResponse);
  }
  
  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._handleResponse);
  }
  
  setUserInfo(name, about) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about
      }),
    })
      .then(this._handleResponse);
  }
  
  setUserAvatar(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar
      }),
    })
      .then(this._handleResponse);
  }
  
  addNewCard(data) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(this._handleResponse);
  }
  
  putLike(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(this._handleResponse);
  }
  
  deleteLike(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(this._handleResponse);
  }
  
  changeLikeCardStatus(cardId, like) {
    if (like) {
        return this.putLike(cardId);
    } else {
        return this.deleteLike(cardId);
    }
  }

  deleteCard(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(this._handleResponse);
  }
};

export const api = new Api({
  baseUrl: 'https://api.dissonator.students.nomoredomainsrocks.ru',
});