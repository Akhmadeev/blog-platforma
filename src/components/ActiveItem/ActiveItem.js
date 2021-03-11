import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Spin, Alert } from 'antd';
import { format } from 'date-fns';
import './ActiveItem.scss';
import heart from './icon/Vector.svg';

import Services from '../../ApiService';


const List = ({ itemId, add_item }) => {

  const [article, setArticle] = useState([])

  const apiService = new Services();


  useEffect(() => {
    apiService
      .getItem(itemId, setArticle, add_item)
      .then((result) => {
        setArticle(result.article);
        add_item(result.article);
      })
  }, []);


  const item = (element) => {
    const { title, body, favoritesCount, slug, updatedAt } = element;
    const { username, image } = element.author;
    return (
      <div className="activeItem" key={slug}>
        <div className="activeItem_header">
          <div className="activeItem_left">
            <span className="activeItem_header_left_block">
              <span className="activeItem_title">{title} </span>{' '}
              <img className="activeItem_heart_img" src={heart} alt="like" />{' '}
              <span className="activeItem_like">{favoritesCount}</span>
            </span>
            <span className="activeItem_tag"> Tag</span>
            <span className="activeItem_text">{title}</span>
          </div>
          <div className="activeItem_right">
            <div className="activeItem_info_user">
              <div className="activeItem_info">
                <span className="activeItem_user_name">{username}</span>
                <span className="activeItem_date_post">{format(new Date(updatedAt), 'MMMM d, u')}</span>
              </div>
              <div>
                <img src={image} alt="logo" className="activeItem_user_logo" />
              </div>
            </div>
          </div>
        </div>
        <div className="activeItem_main">
          <ReactMarkdown children={body} />
        </div>
      </div>
    );
  };
  const errorSpin = () => (
    <div className="errorSpin">
      <Spin tip="Loading...">
        <Alert
          message="Попробуйте обновить страницу"
          description="Что-то пошло не так так, мы пробуем в этом разобраться"
          type="info"
        />
      </Spin>
    </div>
  );

  if (article.length < 1) return <div>{errorSpin()}</div>;

  return <div className="activeItem_block">{article && item(article)}</div>;
};


export default List;

List.defaultProps = {
  itemId: '',
  add_item: () => {},
};

List.propTypes = {
  add_item: PropTypes.func,
  itemId: PropTypes.string,
};