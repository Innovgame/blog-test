import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import SideBarNav from "../siderBar";

const { Sider, Header, Content, Footer } = Layout;

class AdminLayout extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  state = { collapsed: false };

  render() {
    return (
      <div className="">
        <Layout>
          <Sider collapsible trigger={null} collapsed={this.state.collapsed}>
            <SideBarNav />
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: "0 16px" }}>
              {/* <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle} /> */}
              header bar
            </Header>
            <Content>{this.props.children}</Content>
            <Footer style={{ textAlign: "center" }}>
              React-Admin ©2020 Created by innovgame@163.com{" "}
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default AdminLayout;
