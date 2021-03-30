import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import FormArticle from '../FormArticle/FormArticle';
import Services from '../../ApiService';
import SpinErr from '../Error/SpinErr';
import { loginIn } from '../../routeType';
import { userState } from '../../storeSelectors';
import Warning from '../Error/Warning';

const EditArticle = ({ slugId, user_state }) => {
  const [data, setData] = useState(false);
  const [article, setArticle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (obj) => {
    const { title, description, body, ...tagArray } = obj;
    setIsLoading(true);
    const tagList = Object.values(tagArray);
    Services.editArticle(title, description, body, slugId, tagList)
      .then((result) => {
        const { slug } = result.article;
        setData(slug);
      })
      .catch(() => <Warning />);
  };
  
  useEffect(() => {
    Services.getArticle(slugId).then((result) => {
      setArticle(result.article);
    })
    .catch(() => Warning())
  }, []);

  const { title, body, description, tagList } = article;

  if (data) return <Redirect to={`/articles/${data}`} />;

  if (!user_state.id) return <Redirect to={loginIn} />;

  if (!article) return SpinErr();

  return (
    <FormArticle
      onSubmit={onSubmit}
      title="Edit article"
      inputTitle={title}
      inputDescription={description}
      inputBody={body}
      isLoading={isLoading}
      tagList={tagList}
    />
  );
};
const mapStateToProps = (state) => ({
  user_state: userState(state)
});

export default connect(mapStateToProps, action)(EditArticle);


EditArticle.defaultProps = {
  slugId: '',
  user_state: {}
};

EditArticle.propTypes = {
  slugId: PropTypes.string,
  user_state: PropTypes.object,
};