import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import * as action from '../../store/action';
import './Header.scss';
import logo from '../List/icon/Rectangle 1.svg';
import Services from '../../ApiService';

function Header({ delete_user, user_state, get_user }) {
  const [user, setUser] = useState({});

  const apiService = new Services();

  const {SubMenu} = Menu;

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

    if (Object.keys(user).length === 0) {
      apiService.getUser().then((result) => {
        get_user(result.user);  
        setUser(result.user);
      });
    }

    const { username, image } = user;

    if (username !== user_state.username) {
      apiService.getUser().then((result) => {
        get_user(result.user);
        setUser(result.user);
      });
    }
    
    return (
      <nav className="navigation_btn">
        <Link to="/new-article" className="btn_create_article">
          Create article
        </Link>
        <div className="header_user_info">
          <Menu>
            <SubMenu key="SubMenu" title={username}>
              <Menu.ItemGroup title={username}>
                <Menu.Item key="setting:1">
                  <Link to="/profile"> edit profile</Link>
                </Menu.Item>
                <Menu.Item key="setting:2">
                  <Link to="/my_article"> my article</Link>
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
          <div>
            <img src={image || logo} alt="logo" className="item_user_logo" />
          </div>
        </div>
        <Link to="/login-in" onClick={() => deleteInfo()} className="btn_log_out black">
          log Out
        </Link>
      </nav>
    );
  };

  useEffect(() => {
    content();
  }, [token]);

  return (
    <div className="header">
      <div className="header_menu">
        <span className="name_platform">
          <Link to="/articles" className="styleoff black">
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
  user_state: state.user,
});

export default connect(mapStateToProps, action)(Header);

Header.defaultProps = {
  delete_user: () => {},
  get_user: () => {},
  user_state: {},
};
Header.propTypes = {
  delete_user: PropTypes.func,
  get_user: PropTypes.func,
  user_state: PropTypes.object,
};