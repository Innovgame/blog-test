import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import routes from "@/routes/config";
import "./App.less";

@connect(
  state => ({
    isLogin: state.auth.isLogin
  }),
  null
)
class App extends Component {
  // 如果路由为 protected 且未登录时, 则定向到登录页
  // admin 且未登录时 定向到登录页
  authHandler = (item, routePath) => {
    if (
      (item.protected || routePath.includes("admin")) &&
      !this.props.isLogin
    ) {
      item = {
        ...item,
        component: () => <Redirect to="/login" />,
        children: []
      };
    }
  };
  render() {
    const renderRoutes = (routes, contextPath) => {
      const children = [];

      const renderRoute = (item, routeContextPath) => {
        let newContextPath = item.path
          ? `${routeContextPath}/${item.path}`
          : routeContextPath;
        newContextPath = newContextPath.replace(/\/+/g, "/");
        // auth handler
        this.authHandler(item, newContextPath);

        if (/^\//.test(item.path)) {
          newContextPath = item.path;
        } else {
          newContextPath = `${routeContextPath}/${item.path}`;
        }

        newContextPath = newContextPath.replace(/\/+/g, "/");

        if (item.component && item.childRoutes) {
          const childRoutes = renderRoutes(item.childRoutes, newContextPath);

          children.push(
            <Route
              key={newContextPath}
              path={newContextPath}
              render={props => (
                <item.component {...props}>{childRoutes}</item.component>
              )}
            />
          );
        } else if (item.component) {
          children.push(
            <Route
              key={newContextPath}
              component={item.component}
              path={newContextPath}
              exact
            />
          );
        } else if (item.childRoutes) {
          item.childRoutes.forEach(r => renderRoute(r, newContextPath));
        }
      };

      routes.forEach(item => renderRoute(item, contextPath));

      return <Switch>{children}</Switch>;
    };

    const children = renderRoutes(routes, "/");

    return (
      // <div className="App">
      //   {/* <CounterDemo></CounterDemo> */}
      // </div>
      <BrowserRouter>{children}</BrowserRouter>
    );
  }
}

export default App;
