import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Layout, Menu, Icon, Row, Col, Button, Dropdown, Avatar } from "antd";
import "./index.less";
import { logout } from "@/redux/auth/actions";

import menus from "./menu";
import AuthModal from "../authModal";

const Header = Layout.Header;

const NavBar = ({ menus }) => (
  <Menu mode="horizontal" defaultSelectedKeys={[menus[0]["link"]]}>
    {menus.map(nav => (
      <Menu.Item key={nav.link}>
        <Link to={nav.link}>
          {nav.icon && <Icon type={nav.icon} />}
          <span className="nav-text">{nav.title}</span>
        </Link>
      </Menu.Item>
    ))}
  </Menu>
);

// use for Avatar
const colorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];

@connect(state => ({ isLogin: state.auth.isLogin }), {
  logout
})
class BlogHeader extends Component {
  state = {
    loginModalVisible: false,
    registryModalVisible: false,
    avatarColor: colorList[Math.floor(Math.random() * 4)]
  };

  handleCloseRegistry = () => {
    this.handleClose("registry");
  };
  handleCloseLogin = () => {
    this.handleClose("login");
  };

  handleClose = type => {
    const visible = `${type}ModalVisible`;
    this.setState({
      [visible]: false
    });
  };

  renderAvatarDropdownMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <span className="user-logout" onClick={this.props.logout}>
            退出登录
          </span>
        </Menu.Item>
      </Menu>
    );
  };

  showLoginModal = () => {
    this.setState({
      loginModalVisible: true
    });
  };

  showRegistryModal = () => {
    this.setState({
      registryModalVisible: true
    });
  };

  render() {
    const { loginModalVisible, registryModalVisible } = this.state;
    return (
      <Header className="header-container">
        <Row>
          <Col lg={{ span: 4 }} md={{ span: 4 }} xs={{ span: 0 }}></Col>
          <Col lg={{ span: 14 }} md={{ span: 14 }} xs={{ span: 0 }}>
            <NavBar menus={menus} />
          </Col>
          <Col lg={{ span: 0 }} md={{ span: 0 }} xs={{ span: 10 }}></Col>
          <Col lg={{ span: 6 }} md={{ span: 6 }} xs={{ span: 14 }}>
            {!this.props.isLogin ? (
              <div className="nav-auth">
                <Button
                  type="primary"
                  ghost
                  size="small"
                  style={{ marginRight: 20 }}
                  onClick={this.showLoginModal}
                >
                  登录
                </Button>
                <Button
                  type="primary"
                  ghost
                  size="small"
                  style={{ marginRight: 20 }}
                  onClick={this.showRegistryModal}
                >
                  注册
                </Button>
              </div>
            ) : (
              <Dropdown
                placement="bottomCenter"
                overlay={this.renderAvatarDropdownMenu()}
              >
                <Avatar
                  className="user-avatar"
                  size="large"
                  style={{ backgroundColor: this.state.avatarColor }}
                ></Avatar>
              </Dropdown>
            )}
          </Col>
        </Row>
        {
          <AuthModal
            visible={loginModalVisible}
            type="login"
            handleClose={this.handleCloseLogin}
          />
        }
        {
          <AuthModal
            visible={registryModalVisible}
            type="registry"
            handleClose={this.handleCloseRegistry}
          />
        }
      </Header>
    );
  }
}

export default BlogHeader;
