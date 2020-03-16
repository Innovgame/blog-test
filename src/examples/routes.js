import React, { lazy } from "react";

import Layout from "@/components/layout";
import ExamplePage from "./index";
import CounterDemo from "@/components/counter-demo";
import FormBuilder from "./formBuilder";
import CodeSplitting from "./codeSplitting";

const LazyDemo = lazy(() => import("./codeSplitting/demo"));
const RouteLazy = name => () => {
  return <LazyDemo name={name} />;
};

export default {
  path: "examples",
  component: Layout,
  childRoutes: [
    {
      path: "",
      component: ExamplePage,
      name: "Example Page"
    },
    {
      path: "count",
      component: CounterDemo,
      name: "Count Page"
    },
    {
      path: "form/:formId",
      name: "form Page",
      component: FormBuilder
    },
    {
      path: "code-splitting",
      component: CodeSplitting
    },
    {
      path: "lazy-demo",
      component: RouteLazy("react route lazy")
    }
  ]
};
