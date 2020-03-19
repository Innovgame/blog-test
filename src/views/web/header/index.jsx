import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { Layout, Menu, Icon, Row, Col, Button, Dropdown, Avatar } from "antd";
import "./index.less";
import { logout } from "@/redux/auth/actions";

import menus from "./menu";
import AuthModal from "../authModal";
import { node } from "prop-types";

const Header = Layout.Header;

const NavBar = ({
  menus,
  currentSelectedKey = "/",
  mode = "horizontal",
  ...props
}) => (
  <Menu mode={mode} defaultSelectedKeys={[currentSelectedKey]} {...props}>
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
@withRouter
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
    let title = "";
    const matchMenu = menus.find(
      item => item.link === this.props.location.pathname
    );
    if (!!matchMenu) this.title = matchMenu.title;
    return (
      <Header className="header-container">
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col
            lg={{ span: 4 }}
            md={{ span: 4 }}
            xs={{ span: 0 }}
            style={{ color: "#fff" }}
          >
            header left
          </Col>
          <Col lg={{ span: 14 }} md={{ span: 14 }} xs={{ span: 0 }}>
            <NavBar
              menus={menus}
              currentSelectedKey={this.props.location.pathname}
            />
          </Col>
          <Col lg={{ span: 0 }} md={{ span: 0 }} xs={{ span: 10 }}>
            <Dropdown
              overlay={
                <NavBar
                  mode="vertical"
                  menus={menus}
                  currentSelectedKey={this.props.location.pathname}
                  style={{ width: 90, borderRadius: "5%" }}
                />
              }
              trigger={["click"]}
            >
              <div>
                <Button type="primary" ghost style={{ border: node }}>
                  {title}
                  <Icon type="caret-down" />
                </Button>
              </div>
            </Dropdown>
          </Col>
          <Col
            style={{ textAlign: "center" }}
            lg={{ span: 6 }}
            md={{ span: 6 }}
            xs={{ span: 14 }}
          >
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
              <div className="user-info">
                <Dropdown
                  placement="bottomCenter"
                  overlay={this.renderAvatarDropdownMenu()}
                >
                  <Avatar
                    className="user-avatar"
                    size="large"
                    style={{ backgroundColor: this.state.avatarColor }}
                  >
                    Rekor
                  </Avatar>
                </Dropdown>
              </div>
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
