import React, { Suspense, Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import routes from "@/routes/config";
import "./App.less";
import Loading from "@/components/loading";

@connect(
  state => ({
    isLogin: state.auth.isLogin
  }),
  null
)
class App extends Component {
  render() {
    const renderRoutes = (routes, contextPath) => {
      const children = [];

      const renderRoute = (item, routeContextPath) => {
        // auth handler
        if (item.protected && !this.props.isLogin) {
          item = {
            ...item,
            component: () => <Redirect to="/admin/login" />,
            children: []
          };
        }

        let newContextPath;
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
          if (typeof item.component === "function") {
            children.push(
              <Route
                key={newContextPath}
                component={item.component}
                path={newContextPath}
                exact
              />
            );
          } else {
            children.push(
              <Route
                key={newContextPath}
                path={newContextPath}
                component={() => <item.component />}
                exact
              />
            );
          }
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
      <BrowserRouter>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
