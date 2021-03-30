import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import * as action from '../../store/action';
import './Header.scss';
import logo from '../../icon/Rectangle 1.svg';
import { articles, loginIn, loginUp, myArticles, newArticle, profile } from '../../routeType';
import { userState, errorState } from '../../storeSelectors';
import {  removeToken } from '../../localStorageServices';


function Header({ delete_user, user_state }) {
  const { SubMenu } = Menu;

  const deleteInfo = () => {
    removeToken()
    delete_user();
  };

  const content = () => {
    if (!user_state.id) {
      return (
        <nav className="navigation_btn">
          <Link to={loginIn} className="btn styleoff">
            Sign In
          </Link>
          <Link to={loginUp} className="btn styleoff">
            Sign Up
          </Link>
        </nav>
      );
    }

    const { username, image } = user_state;

    return (
      <nav className="navigation_btn">
        <Link to={newArticle} className="btn_create_article">
          Create article
        </Link>
        <div className="header_user_info">
          <Menu>
            <SubMenu key="SubMenu" title={username}>
              <Menu.ItemGroup title={username}>
                <Menu.Item key="setting:1">
                  <Link to={profile}> edit profile</Link>
                </Menu.Item>
                <Menu.Item key="setting:2">
                  <Link to={myArticles}> my article</Link>
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
          <div>
            <img src={image || logo} alt="logo" className="item_user_logo" />
          </div>
        </div>
        <Link to={loginIn} onClick={() => deleteInfo()} className="btn_log_out black">
          log Out
        </Link>
      </nav>
    );
  };

  useEffect(() => {
    content();
  }, [ user_state]);

  return (
    <div className="header">
      <div className="header_menu">
        <span className="name_platform">
          <Link to={articles} className="styleoff black">
            Realworld Blog
          </Link>
        </span>
        {content()}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  error_reducer: errorState(state),
  user_state: userState(state),
});

export default connect(mapStateToProps, action)(Header);

Header.defaultProps = {
  delete_user: () => {},
  user_state: {},
};
Header.propTypes = {
  delete_user: PropTypes.func,
  user_state: PropTypes.object,
};
