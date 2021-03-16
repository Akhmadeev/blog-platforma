import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './FavoriteArticle.scss';
import likeActive from './icon/likeActive.svg';
import likeOff from './icon/likeOff.svg';
import Services from '../../ApiService';

const FavoriteArticle = ({ slug }) => {

  const apiService = new Services();
    
  const [like, setLike] = useState(false);
    const [countLike, setCountLike] = useState(0);
    
    useEffect(() => {
      apiService.getItem(slug).then((result) => {
        const { favorited, favoritesCount } = result.article;
        setLike(favorited);
        setCountLike(favoritesCount);
      });
    }, []);

  const rateArticle = () => {
    if (like) {
      return apiService
        .favoriteArticle(slug, 'DELETE')
        .then((result) => {
          const { favorited, favoritesCount } = result.article;
          setLike(favorited);
          setCountLike(favoritesCount);
        })
        .catch(() => console.log('err'));
    }
    return apiService
      .favoriteArticle(slug, 'POST')
      .then((result) => {
        const { favorited, favoritesCount } = result.article;
        setLike(favorited);
        setCountLike(favoritesCount);
      })
      .catch(() => console.log('err'));
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