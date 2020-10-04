import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ authed, component: Component, ...rest }) {
  return <Route
    {...rest}
    render={(props) => (
      authed === true 
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }}
        />)}
  />;
}

export default PrivateRoute;
