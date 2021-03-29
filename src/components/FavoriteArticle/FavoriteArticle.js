import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './FavoriteArticle.scss';
import { message } from 'antd';
import likeActive from '../../icon/likeActive.svg';
import likeOff from '../../icon/likeOff.svg';
import Services from '../../ApiService';
import ErrorInternet from '../Error/ErrorInternet';

const FavoriteArticle = ({ slug }) => {
    
  const [like, setLike] = useState(false);
  const [countLike, setCountLike] = useState(0);

  const warning = () => {
    message.warning('Требуется авторизация');
  };

  useEffect(() => {
      Services.getArticle(slug).then((result) => {
        const { favorited, favoritesCount } = result.article;
        setLike(favorited);
        setCountLike(favoritesCount);
      });
    }, []);

  const rateArticle = () => {
    if (localStorage.getItem('token')) {
       if (like) {
        return Services.favoriteArticle(slug, 'DELETE')
          .then((result) => {
            const { favorited, favoritesCount } = result.article;
            setLike(favorited);
            setCountLike(favoritesCount);
          })
          .catch(() => ErrorInternet());
      }
    return Services.favoriteArticle(slug, 'POST')
      .then((result) => {
        const { favorited, favoritesCount } = result.article;
        setLike(favorited);
        setCountLike(favoritesCount);
      })
      .catch(() => ErrorInternet());
    }
    return warning()
  };

  return (
    <div className="favoriteArticle">
      <input
        type="image"
        className="heart_img"
        onClick={() => rateArticle()}
        src={like ? likeActive : likeOff}
        alt="like"
      />
      <span className="article_like">{countLike}</span>
    </div>
  );
};

export default FavoriteArticle;

FavoriteArticle.defaultProps = {
  slug: ''
};

FavoriteArticle.propTypes = {
  slug: PropTypes.string,
};