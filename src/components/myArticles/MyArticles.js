import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import Item from '../Item/Item';
import Services from '../../ApiService';
import SpinErr from '../SpinErr/SpinErr';

const MyArticles = ({ user }) => {
  const [array, setArray] = useState([]);

  const apiService = new Services();

  useEffect(() => {
    apiService
      .articlesList(user.username)
      .then((result) => setArray(result.articles))
      .catch(() => SpinErr());
    
  }, []);

  if (array.length < 1) return <div>{SpinErr()}</div>;

  return (
    <div className="list">
      {array.map((element) => (
        <Item key={element.slug} element={element} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({ user: state.user,});

export default connect(mapStateToProps, action)(MyArticles);

MyArticles.defaultProps = {
  user: {},
};

MyArticles.propTypes = {
  user: PropTypes.object,
};
