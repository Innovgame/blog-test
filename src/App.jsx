import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import routes from "@/routes/config";
import "./App.less";
import Loading from "@/components/loading";

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
}

function App() {
  const children = renderRoutes(routes, "/");
  console.info(children);
  return (
    // <div className="App">
    //   {/* <CounterDemo></CounterDemo> */}
    // </div>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </BrowserRouter>
  );
}

export default App;
