/* eslint-disable */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loginIn } from '../../routeType';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authentication = useSelector((state) => state.toolkit.authentication);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authentication) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: loginIn,
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
