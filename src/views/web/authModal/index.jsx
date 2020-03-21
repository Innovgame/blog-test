import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Modal, Input, Icon, Button } from "antd";

import { login, logout, register } from "@/redux/auth/actions";

@connect(null, {
  login,
  logout,
  register
})
class AuthModal extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
  };

  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const type = this.props.type;
    console.info("click button", type);
    type === "login"
      ? this.props.login({ ...this.state })
      : this.props.register({ ...this.state });
    this.props.handleClose();
  };

  render() {
    const text = this.props.type === "login" ? "登录" : "注册";
    return (
      <Modal
        title={text}
        width={320}
        footer={null}
        visible={this.props.visible}
        onCancel={() => this.props.handleClose()}
      >
        <Input
          name="username"
          type="username"
          style={{ marginBottom: 20 }}
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleChange}
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        />
        <Input
          name="password"
          type="password"
          style={{ marginBottom: 20 }}
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        />
        <Button
          style={{ width: "100%" }}
          type="primary"
          onClick={this.handleSubmit}
        >
          {text}
        </Button>
      </Modal>
    );
  }
}

export default AuthModal;
