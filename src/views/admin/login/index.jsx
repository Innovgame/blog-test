import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "@/redux/auth/actions";
import { message, Button } from "antd";

@withRouter
@connect(null, {
  login
})
class Login extends Component {
  login = async () => {
    await this.props.login();
    message.success("login success");
    this.props.history.push("/examples");
  };

  render() {
    return (
      <div>
        Click button to login
        <Button onClick={this.login}>Login</Button>
      </div>
    );
  }
}

export default Login;
