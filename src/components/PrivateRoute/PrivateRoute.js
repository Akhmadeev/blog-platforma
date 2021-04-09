/* eslint-disable */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../store/action';
import { loginIn } from '../../routeType';
import { authenticationState } from '../../storeSelectors';

const PrivateRoute = ({ component: Component, authentication, ...rest }) => (
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

const mapStateToProps = (state) => ({
  authentication: authenticationState(state)
});

export default connect(mapStateToProps, action)(PrivateRoute);
