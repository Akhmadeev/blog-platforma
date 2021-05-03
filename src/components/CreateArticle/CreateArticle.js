import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormArticle from '../FormArticle/FormArticle';
import Services from '../../ApiService';
import ErrorInternet from '../Error/ErrorInternet';
import { loginIn } from '../../routeType';

function CreateArticle() {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.toolkit.user);

  const onSubmit = (obj) => {
    const { title, description, body, ...tagArray } = obj;
    setIsLoading(true);
    const tagList = Object.values(tagArray);

    Services.createArticle(title, description, body, tagList)
      .then((result) => {
        const { slug } = result.article;
        setData(slug);
      })
      .catch(() => ErrorInternet());
  };

  if (!user.id) return <Redirect to={loginIn} />;

  if (data) return <Redirect to={`/articles/${data}`} />;

  return <FormArticle onSubmit={onSubmit} isLoading={isLoading} title="Create new article" />;
}

export default CreateArticle;
