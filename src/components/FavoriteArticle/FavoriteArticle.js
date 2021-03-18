import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './FavoriteArticle.scss';
import likeActive from './icon/likeActive.svg';
import likeOff from './icon/likeOff.svg';
import Services from '../../ApiService';
import ErrorInternet from '../SpinErr/ErrorInternet';

const FavoriteArticle = ({ slug }) => {

  const apiService = new Services();
    
  const [like, setLike] = useState(false);
  const [countLike, setCountLike] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      apiService.getItemAuthorization(slug).then((result) => {
        const { favorited, favoritesCount } = result.article;
        setLike(favorited);
        setCountLike(favoritesCount);
      });
    } else {
      apiService.getItem(slug).then((result) => {
        const { favoritesCount } = result.article;
        setCountLike(favoritesCount);
      });
    }
  }, []);

  const rateArticle = () => {
    if (localStorage.getItem('token')) {
       if (like) {
        return apiService
          .favoriteArticle(slug, 'DELETE')
          .then((result) => {
            const { favorited, favoritesCount } = result.article;
            setLike(favorited);
            setCountLike(favoritesCount);
          })
          .catch(() => ErrorInternet());
      }
    return apiService
      .favoriteArticle(slug, 'POST')
      .then((result) => {
        const { favorited, favoritesCount } = result.article;
        setLike(favorited);
        setCountLike(favoritesCount);
      })
      .catch(() => ErrorInternet());
    }
    return setLike(false)
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