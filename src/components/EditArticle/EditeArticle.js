import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import FormArticle from '../FormArticle/FormArticle';
import Services from '../../ApiService';
import SpinErr from '../SpinErr/SpinErr';

const EditArticle = ({ slugId }) => {
  const [data, setData] = useState(false);
  const [article, setArticle] = useState(false)

  const apiService = new Services();

  const onSubmit = (obj) => {
    const { title, description, body, ...tagArray } = obj;

    const tagList = Object.values(tagArray);
    apiService.editArticle(title, description, body, slugId, tagList).then((result) => {
      const { slug } = result.article;
      setData(slug);
    });
  };
  useEffect(() => {
    apiService.getItem(slugId).then((result) => {
      setArticle(result.article);
    });
},[])

    const { title, body, description } = article;

  if (data) return <Redirect to={`/articles/${data}`} />;
  
  if (!article) return SpinErr();

  return (
    <FormArticle
      onSubmit={onSubmit}
      title="Edit article"
      inputTitle={title}
      inputDescription={description}
      inputBody={body}
    />
  );
};

export default EditArticle;


EditArticle.defaultProps = {
  slugId: '',
};

EditArticle.propTypes = {
  slugId: PropTypes.string,
};