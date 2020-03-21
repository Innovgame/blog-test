import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "@/redux/auth/actions";
import { message, Button, Input, Icon } from "antd";

import logo from "@/logo.svg";
import "./index.less";

@withRouter
@connect(null, {
  login
})
class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = async () => {
    await this.props.login();
    message.success("login success");
    this.props.history.push("/examples");
  };

  handleChange = () => {
    console.info("username or password change");
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-form">
          <img src={logo} alt="logo" className="App-logo" />
          <Input
            size="large"
            style={{ marginBottom: 25 }}
            type="username"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            prefix={
              <Icon type="user" style={{ color: "rgba(0, 0, 0, 0.25)" }} />
            }
          />
          <Input
            size="large"
            style={{ marginBottom: 25 }}
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            prefix={
              <Icon type="user" style={{ color: "rgba(0, 0, 0, 0.25)" }} />
            }
          />
          <Button
            style={{ width: "100%" }}
            size="large"
            type="primary"
            onClick={this.handleSubmit}
          >
            登录
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
