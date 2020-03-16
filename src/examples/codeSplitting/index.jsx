import React, { Component, lazy } from "react";
import Lazy, { asyncComponent } from "@/components/helper/lazyLoader";

const WebpackDemo = asyncComponent(() => import("./demo")); // 异步读取组件 webpack
const ReactLazyDemo = lazy(() => import("./demo"));

@Lazy
class CodeSplitting extends Component {
  render() {
    return (
      <div>
        <h1>Code Splitting</h1>
        <WebpackDemo name="webpack" />
        <br />
        <ReactLazyDemo name="react lazy" />
      </div>
    );
  }
}

export default CodeSplitting;
