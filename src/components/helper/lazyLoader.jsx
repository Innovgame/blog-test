import React, { Component, Suspense } from "react";
import Loadable from "react-loadable";
import Loading from "@/components/loading";

/**
 * 使用 webpack 的 import 方法实现动态加载组件！dynamic import
 * @param {Function} importComponent - example const xx = asyncComponent(() => import('./xxx'))
 */
export const asyncComponent = importComponent =>
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = { component: null };
    }
    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({ component });
    }

    render() {
      const RenderComponet = this.state.component;
      return RenderComponet ? <RenderComponet {...this.props} /> : <Loading />;
    }
  };

/**
 * 使用 react-loadable 实现代码分割
 * @param {Function} importComponent - example const xx = asyncComponent(() => import('./xxx'))
 */
export const lazyLoad = importComponent =>
  Loadable({
    loader: importComponent,
    loading: <div>loading...</div>
  });

// 使用 react.lazy...
export default WrappedComponent =>
  class extends Component {
    render() {
      return (
        <Suspense fallback={<Loading />}>
          <WrappedComponent {...this.props} />
        </Suspense>
      );
    }
  };
