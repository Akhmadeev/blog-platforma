import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination, Spin, Alert } from 'antd';
import * as action from '../../store/action';
import Item from '../Item/Item'
import './List.scss';
import Services from '../../ApiService';

const List = ({ arrayItem, edit_page }) => {
  const errorSpin = () => (
    <div className="errorSpin">
      <Spin tip="Loading...">
        <Alert
          message="Попробуйте обновить страницу"
          description="Что-то пошло не так так, мы пробуем в этом разобраться"
          type="info"
        />
      </Spin>
    </div>
  );

  const apiService = new Services();

  apiService.getTags().then((response) => console.log(response));


  if (arrayItem.length < 1) return <div>{errorSpin()}</div>;

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