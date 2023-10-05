const baseUrl = "https://api.dissonator.students.nomoredomainsrocks.ru"

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

export const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
      .then(checkResponse);
  };
  
  export const login = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
      .then(checkResponse)
      .then((data) => {
        if (data.token){
          localStorage.setItem('jwt', data.token);
          return data;
        }
      });
  };
  
  export const checkToken = () => {
    const token = localStorage.getItem('jwt');
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(checkResponse);
  };