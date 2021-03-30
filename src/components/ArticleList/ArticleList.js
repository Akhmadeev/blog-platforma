import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination} from 'antd';
import * as action from '../../store/action';
import ArticlePart from '../ArticlePart/ArticlePart';
import './ArticleList.scss';
import SpinErr from '../Error/SpinErr';
import { pageState, arrayItemState } from '../../storeSelectors';

const ArticleList = ({ arrayItem, edit_page }) => {
  if (arrayItem.length < 1) return <div>{SpinErr()}</div>;

  const renderItems = () => arrayItem.map((element) => <ArticlePart key={element.slug} element={element} />);

  return (
    <div>
      <div className="list">{arrayItem && renderItems()}</div>
      <div className="pagination">
        <Pagination
          size="small"
          total={500}
          onChange={(page) => {
            edit_page(page);
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  edit_page: pageState(state),
  arrayItem: arrayItemState(state),
});

export default connect(mapStateToProps, action)(ArticleList);

ArticleList.defaultProps = {
  arrayItem: [],
  edit_page: () => {},
};

ArticleList.propTypes = {
  arrayItem: PropTypes.array,
  edit_page: PropTypes.func,
};
