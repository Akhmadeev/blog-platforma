import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import './App.scss';
import Header from '../Header/Header';
import List from '../List/List';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Article from '../Article/Article';
import Services from '../../ApiService';
import CreateArticle from '../CreateArticle/CreateArticle';
import EditProfile from '../EditProfile/EditProfile';
import MyArticles from '../myArticles/MyArticles';
import SpinErr from '../Error/SpinErr';
import EditArticle from '../EditArticle/EditeArticle';

function App({ add_items, page, error, get_user }) {
  const apiService = new Services();

  const [pageNumber, setPageNumber] = useState(1);
  const [userState, setUserState] = useState({});

  useEffect(() => {
    if (localStorage.getItem('token')) {
      apiService.getUser().then((result) => {
        get_user(result.user);
        setUserState(result.user);
      });
    }
  }, []);

  useEffect(() => {
    const offset = page * 10 - 10;
    setPageNumber(offset);
    apiService
      .getArticles(pageNumber, add_items, error)
      .then((result) => {
        add_items(result.articles);
      })
      .catch(() => error());
  }, [page]);

  if (localStorage.getItem('token')) {
  if (Object.keys(userState).length < 1) return SpinErr();
} 

  return (
    <div className="App">
      <Router>
        <Header />
        <Route path="/articles" exact component={List} />
        <Route
          path="/articles/:slug"
          exact
          render={({ match }) => {
            const { slug } = match.params;
            return <Article itemId={slug} />;
          }}
        />
        <Route
          path="/articles/:slug/edit"
          render={({ match }) => {
            const { slug } = match.params;
            return <EditArticle slugId={slug} />;
          }}
        />
        <Route path="/my_article" component={MyArticles} />
        <Route path="/new-article" component={CreateArticle} />
        <Route path="/profile" component={EditProfile} />
        <Route path="/login-up" component={SignUp} />
        <Route path="/login-in" component={SignIn} />
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  page: state.getPage,
});

export default connect(mapStateToProps, action)(App);

App.defaultProps = {
  add_items: () => {},
  error: () => {},
  page: 1,
  get_user: () => {},
};

App.propTypes = {
  add_items: PropTypes.func,
  error: PropTypes.func,
  page: PropTypes.number,
  get_user: PropTypes.func,
};