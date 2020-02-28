import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthService } from "../../services/authService";

//FIXME: e chuyển lại màn hình này vào phần screens nhé, e xoá folder này đi
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

  return (
    <Route
      {...props.rest}
      render={({ location }) =>
        //tránh sử dụng ternary operator trong lúc render
        //nên tách thành hàm riêng
        userInfo ? props.children : <Redirect to="login" />
      }
    />
  );
};

export default PrivateRoute;
