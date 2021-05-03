import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ArticlePart from '../ArticlePart/ArticlePart';
import Services from '../../ApiService';
import SpinErr from '../Error/SpinErr';

const MyArticles = () => {
  const user = useSelector((state) => state.toolkit.user);

  const [array, setArray] = useState([]);

  useEffect(() => {
    Services.articlesList(user.username)
      .then((result) => setArray(result.articles))
      .catch(() => SpinErr());
  }, []);

  if (array.length < 1) return <div>{SpinErr()}</div>;

  return (
    <div className="list">
      {array.map((element) => (
        <ArticlePart key={element.slug} element={element} />
      ))}
    </div>
  );
};

export default MyArticles;
