import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../icon/Rectangle 1.svg';
import { articles, loginIn, loginUp, myArticles, newArticle, profile } from '../../routeType';
import { removeToken } from '../../localStorageServices';
import { delete_user, authentication_user } from '../../reduxToolkit/toolkitSlice';

function Header() {
  const { SubMenu } = Menu;

  // const error_reducer = useSelector((state) => state.toolkit.error_reducer);
  const user_state = useSelector((state) => state.toolkit.user);
  const authentication = useSelector((state) => state.toolkit.authentication);

  const dispatch = useDispatch();

  const deleteInfo = () => {
    removeToken();
    dispatch(delete_user());
    dispatch(authentication_user(false));
  };

  const content = () => {
    if (!authentication) {
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
  }, [user_state, authentication]);

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

export default Header;
