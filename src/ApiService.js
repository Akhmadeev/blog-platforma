export default class Services {
  baseUrl = 'https://conduit.productionready.io/api';

  requestApi = async (url, options) => {
    const body = await fetch(url, options);
    if (!body.ok) return body.status;
    const result = await body.json();
    return result;
  };

  getArticles = (page) => this.requestApi(`${this.baseUrl}/articles?offset=${page}&limit=10`);

  sendEditProfile (email, token, username, image) {
     return this.requestApi(`${this.baseUrl}/user`, {
       method: 'PUT',
       body: JSON.stringify({
         user: {
           email,
           token,
           username,
           bio: 'I work at statefarm',
           image,
         },
       }),
       headers: {
         'Content-type': 'application/json; charset=UTF-8',
         Authorization: `Token ${localStorage.getItem('token')}`,
       },
     });
  }
   

  getItem = (id) => this.requestApi(`${this.baseUrl}/articles/${id}`);

  sendUserInfo(email, password) {
    return this.requestApi(`${this.baseUrl}/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  sendRequestAuthorization(username, email, password) {
    return this.requestApi(`https://conduit.productionready.io/api/users`, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  getUser() {
    return this.requestApi(`${this.baseUrl}/user`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
  }

  getTags = () => this.requestApi(`${this.baseUrl}/tags`)
}

