import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './FavoriteArticle.scss';
import { message } from 'antd';
import likeActive from '../../icon/likeActive.svg';
import likeOff from '../../icon/likeOff.svg';
import Services from '../../ApiService';
import ErrorInternet from '../Error/ErrorInternet';
import { getToken } from '../../localStorageServices';

const FavoriteArticle = ({ slug, count, favoritedLike }) => {
  
  const [like, setLike] = useState(false);
  const [countLike, setCountLike] = useState(0);

   useEffect(() => {
     setLike(favoritedLike);
     setCountLike(count);
   }, []);

  const token = getToken();

  const warning = () => {
    message.warning('Требуется авторизация');
  };

  const rateArticle = () => {
    if (token) {
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
    return warning();
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
  slug: '',
  count: 0,
  favoritedLike: false,
};

FavoriteArticle.propTypes = {
  slug: PropTypes.string,
  count: PropTypes.number,
  favoritedLike: PropTypes.bool,
};