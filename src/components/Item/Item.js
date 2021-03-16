import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './Item.scss';
import FavoriteArticle from '../FavoriteArticle/FavoriteArticle';

const Item = ({ element }) => {
  
  const { title, body, slug, updatedAt } = element;
  const { username, image } = element.author;

  const shortText = (text) => text.split(' ').slice(0, 14).join(' ');

  return (
    <div className="item" key={slug}>
      <div className="item_left">
        <span className="article_title">
          <span className="title">
            <Link to={`/articles/${slug}`} className="link_active_item">
              {title}
            </Link>
          </span>
          <FavoriteArticle  slug={slug}/>
        </span>
        <span className="item_tag"> Tag</span>
        <span className="article_text">{shortText(body)}</span>
      </div>
      <div className="item_right">
        <div className="item_info_user">
          <div className="item_info">
            <span className="item_user_name">{username}</span>
            <span className="item_date_post">{format(new Date(updatedAt), 'MMMM d, u')} </span>
          </div>
          <div>
            <img src={image} alt="logo" className="item_user_logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;

Item.defaultProps = {
  element: {},
};

Item.propTypes = {
  element: PropTypes.object,
};
