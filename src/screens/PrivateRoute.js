import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthService } from "../services/authService";

const PrivateRoute = props => {
  const [userInfo, setUserInfo] = useState(AuthService.get());

  useEffect(() => {
    AuthService.onChange("privateRoute", () => {
      setUserInfo(AuthService.get());
    });

    return () => {
      AuthService.deleteKey("privateRoute");
    };
  }, []);

  const renderComponent=()=>{
      if(userInfo){
          return (props.children)
      }
      return (<Redirect to="login" />)
  }

  return (
    <Route
      {...props.rest}
      render={({ location }) =>

          renderComponent()

      }
    />
  );
};

export default PrivateRoute;
