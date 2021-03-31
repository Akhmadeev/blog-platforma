import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import FormArticle from '../FormArticle/FormArticle';
import Services from '../../ApiService';
import ErrorInternet from '../Error/ErrorInternet';
import { loginIn } from '../../routeType';
import { userState } from '../../storeSelectors';

function CreateArticle({ user_state }) {

  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (obj) => {
    const { title, description, body, ...tagArray } = obj;
    setIsLoading(true)
    const tagList = Object.values(tagArray);

    Services.createArticle(title, description, body, tagList)
      .then((result) => {
        const { slug } = result.article;
        setData(slug);
      })
      .catch(() => ErrorInternet());
  };

  if (!user_state.id) return <Redirect to={loginIn} />;

  if (data) return <Redirect to={`/articles/${data}`} />;

  return <FormArticle onSubmit={onSubmit} isLoading={isLoading} title="Create new article" />;
}

const mapStateToProps = (state) => ({
  user_state: userState(state)
});

export default connect(mapStateToProps, action)(CreateArticle);

CreateArticle.defaultProps = {
  user_state: {},
};

CreateArticle.propTypes = {
  user_state: PropTypes.object,
};