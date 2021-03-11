import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as action from '../../store/action';
import './Header.scss';
import logo from '../List/icon/Rectangle 1.svg'
import Services from '../../ApiService';

function Header({ delete_user, userStore }) {

  const [user, setUser] = useState({});

  const apiService = new Services();
  
  const deleteInfo = () => {
    localStorage.removeItem('token');
    setUser({});
    delete_user();
  };

  const token = localStorage.getItem('token');

  const content = () => {

    if (!token) {
      return (
        <nav className="navigation_btn">
          <Link to="/login-in" className="btn styleoff">
            Sign In
          </Link>
          <Link to="/login-up" className="btn styleoff">
            Sign Up
          </Link>
        </nav>
      );
    }

    if (Object.keys(user).length === 0) apiService.getUser().then((result) => setUser(result.user));
    
    const { username, image } = user;
    return (
      <nav className="navigation_btn">
        <Link to="/new-article" className="btn_create_article">
          Create article
        </Link>
        <Link to="/profile" className="header_user_info">
          <div className="item_info">
            <span className="item_user_name">{username}</span>
          </div>
          <div>
            <img src={image && logo} alt="logo" className="item_user_logo" />
          </div>
        </Link>
        <Link to="/login-in" onClick={() => deleteInfo()} className="btn_log_out styleoff">
          log Out
        </Link>
      </nav>
    );
  }

  useEffect(() => {
    content();
  }, [token, user, userStore]);

  return (
    <div className="header">
      <div className="header_menu">
        <span className="name_platform">
          <Link to="/articles" className="styleoff">
            Realworld Blog
          </Link>
        </span>
        {content()}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  error_reducer: state.error_reducer,
  userStore: state.user[0]
});

export default connect(mapStateToProps, action)(Header);

Header.defaultProps = {
  delete_user: () => {},
  userStore: {}
};
Header.propTypes = {
  delete_user: PropTypes.func,
  userStore: PropTypes.object
};