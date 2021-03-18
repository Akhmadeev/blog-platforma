import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination} from 'antd';
import * as action from '../../store/action';
import Item from '../Item/Item';
import './List.scss';
import SpinErr from '../Error/SpinErr';

const List = ({ arrayItem, edit_page }) => {


  if (arrayItem.length < 1) return <div>{SpinErr()}</div>;

  return (
    <div>
      <div className="list">{arrayItem && arrayItem.map((element) => <Item key={element.slug} element={element} />)}</div>
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
  edit_page: state.getPage,
  arrayItem: state.getItem,
});

export default connect(mapStateToProps, action)(List);

List.defaultProps = {
  arrayItem: [],
  edit_page: () => {}
};

List.propTypes = {
  arrayItem: PropTypes.array,
  edit_page: PropTypes.func
};
