import React from 'react';
import {
  asyncComponent as lazy
} from '@/components/helper/lazyLoader';

import Layout from "@/components/examples/layout";
import ExamplePage from "./index";
import CounterDemo from "@/components/counter-demo";
import FormBuilder from "./formBuilder";
import CodeSplitting from "./codeSplitting";
import AuthPage from './authPage';
const Write = lazy(() => import('./markdown/write'));
const Show = lazy(() => import('./markdown/show'));

const LazyDemo = lazy(() => import("./codeSplitting/demo"));
const RouteLazy = name => () => ( <
  LazyDemo name = {
    name
  }
  />
);

export default {
  path: "examples",
  component: Layout,
  childRoutes: [{
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
      // component: LazyDemo
    },
    {
      path: 'auth',
      component: AuthPage,
      protected: true
    },
    {
      path: 'markdown',
      childRoutes: [{
        path: "write",
        component: Write
      }, {
        path: 'show',
        component: Show
      }]
    }
  ]
};
