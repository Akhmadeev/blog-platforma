export default class Services {
  baseUrl = 'https://conduit.productionready.io/api';

  requestApi = async (url, options) => {
    const body = await fetch(`${this.baseUrl}${url}`, options);
    if (!body.ok) return body.status;
    const result = await body.json();
    return result;
  };

  getArticles = (page) => this.requestApi(`/articles?offset=${page}&limit=10`);

  sendEditProfile(email, token, username, image) {
    return this.requestApi(`/user`, {
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

  getItemAuthorization = (id) =>
    this.requestApi(`/articles/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });

  getItem = (id) => this.requestApi(`/articles/${id}`);

  sendUserInfo(email, password) {
    return this.requestApi(`/users/login`, {
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
    return this.requestApi(`/user`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
  }

  getTags = () => this.requestApi(`/tags`);

  createArticle(title, description, body, tagList) {
    return this.requestApi(`/articles`, {
      method: 'POST',
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList,
        },
      }),
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  editArticle(title, description, body, slug, tagList) {
    return this.requestApi(`/articles/${slug}`, {
      method: 'PUT',
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList,
        },
      }),
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  deleteArticle(slug) {
    return this.requestApi(`/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
  }

  articlesList = (name) => this.requestApi(`/articles?author=${name}`);

  favoriteArticle = (slug, event) =>
    this.requestApi(`/articles/${slug}/favorite`, {
      method: event,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
}

