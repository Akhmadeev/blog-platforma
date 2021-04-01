import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import './App.scss';
import Header from '../Header/Header';
import ArticleList from '../ArticleList/ArticleList';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Article from '../Article/Article';
import Services from '../../ApiService';
import CreateArticle from '../CreateArticle/CreateArticle';
import EditProfile from '../EditProfile/EditProfile';
import MyArticles from '../MyArticles/MyArticles';
import EditArticle from '../EditArticle/EditeArticle';
import SpinErr from '../Error/SpinErr';
import {
  articles,
  articlesSlug,
  articlesSlugEdit,
  myArticles,
  newArticle,
  profile,
  loginIn,
  loginUp,
} from '../../routeType';
import PrivateRoute from '../../PrivateRoute';
import { pageState } from '../../storeSelectors';
import Warning from '../Error/Warning';
import { getToken } from '../../localStorageServices';

function App({ add_items, page, error, get_user, authentication_user }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [userState, setUserState] = useState({});

  const token = getToken();

  useEffect(() => {
    if (token) {
      Services.getUser()
        .then((result) => {
          get_user(result.user);
          setUserState(result.user);
          authentication_user(true);
        })
        .catch(() => <Warning />);
    }
  }, []);

  useEffect(() => {
    const offset = page * 10 - 10;
    setPageNumber(offset);
    Services.getArticles(pageNumber, add_items, error)
      .then((result) => {
        add_items(result.articles);
      })
      .catch(() => error());
  }, [page]);

  if (token) {
    if (Object.keys(userState).length < 1) return SpinErr();
  }

  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/" exact component={ArticleList} />
        <Route path={articles} exact component={ArticleList} />
        <Route
          path={articlesSlug}
          exact
          render={({ match }) => {
            const { slug } = match.params;
            return <Article itemId={slug} />;
          }}
        />
        <Route
          path={articlesSlugEdit}
          render={({ match }) => {
            const { slug } = match.params;
            return <EditArticle slugId={slug} />;
          }}
        />
        <PrivateRoute component={MyArticles} path={myArticles} />
        <PrivateRoute path={newArticle} component={CreateArticle} />
        <PrivateRoute path={profile} component={EditProfile} />
        <Route path={loginUp} component={SignUp} />
        <Route path={loginIn} component={SignIn} />
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  page: pageState(state),
});

export default connect(mapStateToProps, action)(App);

App.defaultProps = {
  add_items: () => {},
  error: () => {},
  page: 1,
  get_user: () => {},
  authentication_user: () => {},
};

App.propTypes = {
  add_items: PropTypes.func,
  error: PropTypes.func,
  page: PropTypes.number,
  get_user: PropTypes.func,
  authentication_user: PropTypes.func,
};
