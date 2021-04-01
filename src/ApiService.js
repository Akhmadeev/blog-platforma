import { getToken } from './localStorageServices';

class Services {
  baseUrl = 'https://conduit.productionready.io/api';

  token = `Token ${getToken()}`;

  requestApi = async (url, options) => {
    const body = await fetch(`${this.baseUrl}${url}`, options);
    if (!body.ok) throw new Error();
    const result = await body.json();
    return result;
  };

  getArticles = (page) =>
    this.requestApi(`/articles?limit=10&offset=${page}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: this.token,
      },
    });

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
        Authorization: this.token,
      },
    });
  }

  getArticle = (id) => {
    if (localStorage.getItem('token')) {
      return this.requestApi(`/articles/${id}`, {
        headers: {
          Authorization: this.token,
        },
      });
    }
    return this.requestApi(`/articles/${id}`);
  };

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
    return this.requestApi(`/users`, {
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
        Authorization: this.token,
      },
    });
  }

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
        Authorization: this.token,
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
        Authorization: this.token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  deleteArticle(slug) {
    return this.requestApi(`/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: this.token,
      },
    });
  }

  articlesList = (name) =>
    this.requestApi(`/articles?author=${name}`, {
      headers: {
        Authorization: this.token,
      },
    });

  favoriteArticle = (slug, event) =>
    this.requestApi(`/articles/${slug}/favorite`, {
      method: event,
      headers: {
        Authorization: this.token,
      },
    });
}

export default new Services();
