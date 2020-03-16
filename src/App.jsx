import React, { Comment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import routes from "@/routes/config";
import "./App.less";

function renderRoutes(routes, contextPath) {
  const children = [];

  const renderRoute = (item, routeContextPath) => {
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
}

function App() {
  const children = renderRoutes(routes, "/");
  console.info(children);
  return (
    // <div className="App">
    //   {/* <CounterDemo></CounterDemo> */}
    // </div>
    <BrowserRouter>{children}</BrowserRouter>
  );
}

export default App;
