import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import './createArticle.scss';
import FormArticle from '../FormArticle/FormArticle';
import Services from '../../ApiService';
import ErrorInternet from '../Error/ErrorInternet';

function CreateArticle() {

  const [data, setData] = useState(false);
  

  const apiService = new Services();

  const onSubmit = (obj) => {
    const { title, description, body, ...tagArray } = obj;

    const tagList = Object.values(tagArray);
    
    apiService
      .createArticle(title, description, body, tagList)
      .then((result) => {
        const { slug } = result.article;
        setData(slug);
      })
      .catch(() => ErrorInternet());
  };

 if (data) return <Redirect to={`/articles/${data}`} />;

  return (
    <FormArticle onSubmit={onSubmit} title="Create new article" />
  );
}

export default CreateArticle;
