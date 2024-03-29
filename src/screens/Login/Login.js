import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Redirect } from "react-router-dom";

import { AuthService } from "../../services";
import LoginForm from "./components/LoginForm";
import "./Login.css";

const Login = () => {
  const [userInfo, setUserInfo] = useState(AuthService.get());

  useEffect(() => {
    AuthService.onChange("login", () => {
      setUserInfo(AuthService.get());
    });

    return () => {
      AuthService.deleteKey("login");
    };
  }, []);

  const renderRedirect = () => {
    if (userInfo) {
      return <Redirect to={"/"} />;
    }
    return null;
  };

  return (
    <>
      {renderRedirect()}
      <Row className={"h-100"} type="flex" justify="center" align="middle">
        <Col span={7}>
          <p className={"title"}>I Tower</p>
          <LoginForm />
        </Col>
      </Row>
    </>
  );
};

export default Login;
