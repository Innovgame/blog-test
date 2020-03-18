import React, { Component } from "react";
import PropTypes from "prop-types";

import { Layout, Icon } from "antd";

import BlogHeader from "../header";
import "./index.less";

const { Content, Footer, Sider } = Layout;

class WebLayout extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <Layout>
        <div className="app-container">
          <BlogHeader />
          <Layout>
            <Content>{this.props.children}</Content>
            <Sider theme="dark">Sider</Sider>
          </Layout>
          <Footer style={{ textAlign: "center" }}>
            © 2020 <Icon type="user" /> Rekor
          </Footer>
        </div>
      </Layout>
    );
  }
}

export default WebLayout;
