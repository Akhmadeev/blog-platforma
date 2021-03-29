import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import ArticlePart from '../ArticlePart/ArticlePart';
import Services from '../../ApiService';
import SpinErr from '../Error/SpinErr';
import { userState } from '../../storeSelectors';

const MyArticles = ({ user }) => {
  const [array, setArray] = useState([]);

  useEffect(() => {
    Services.articlesList(user.username)
      .then((result) => setArray(result.articles))
      .catch(() => SpinErr());
    
  }, []);

  if (array.length < 1) return (<div>{SpinErr()}</div>);

  return (
    <div className="list">
      {array.map((element) => (
        <ArticlePart key={element.slug} element={element} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({ user: userState(state)});

export default connect(mapStateToProps, action)(MyArticles);

MyArticles.defaultProps = {
  user: {},
};

MyArticles.propTypes = {
  user: PropTypes.object,
};
