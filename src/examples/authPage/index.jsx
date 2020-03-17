import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button, message } from "antd";
import { logout } from "@/redux/auth/actions";

@withRouter
@connect(null, { logout })
class AuthPage extends Component {
  logout = async () => {
    await this.props.logout();
    message.success("logout success");
  };

  render() {
    return (
      <div>
        <h1>Protected Page</h1>
        <Button onClick={this.logout}>Logout</Button>
      </div>
    );
  }
}

export default AuthPage;
