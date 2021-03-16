import React from 'react';
import { Spin, Alert } from 'antd';

const SpinErr = () => (
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

export default SpinErr;