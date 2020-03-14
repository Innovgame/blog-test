# Blog

## 创建并配置项目

### create-react-app

```sh
# 使用react cli 创建
$ create-react-app blog-project
$ cd blog-project
```

### eject project

自定义 webpack 的配置

```sh
# 已有的项目这个操作需要谨慎
$ npm run eject
```

### 安装依赖并配置.eslintrc

1. 配置 eslint

`.eslintrc.json`文件

```json
{
  "extends": ["react-app"],
  "globals": {},
  "rules": {
    "no-undef": "off",
    "no-restricted-globals": "off",
    "no-unused-vars": "off",
    "noHref": "off",
    "array-callback-return": "off",
    "jsx-a11y/anchor-has-content": "off",
    "anchor-is-valid": "off"
  }
}
```

2.安装部分依赖包
`package.json`文件

```diff
"dependencies": {
+   "antd": "^3.12.4",
+   "axios": "^0.18.0",
+   "react-redux": "^6.0.0",
+   "react-router-dom": "^4.3.1",
+   "redux": "^4.0.1",
+   "redux-thunk": "^2.3.0",
},
-  "eslintConfig": {
-    "extends": "react-app"
-  },

+  "devDependencies": {
+    "@babel/plugin-proposal-decorators": "^7.3.0",
+    "babel-plugin-import": "^1.11.0",
+    "less": "^3.9.0",
+    "less-loader": "^4.1.0",
+    "redux-devtools-extension": "^2.13.7",
+    "redux-logger": "^3.0.6"
+  }

```

### 配置部分设置

1.创建`.babelrc`

```json
{
  "presets": ["react-app"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    [
      "import",
      { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }
    ]
  ]
}
```

2.移除`package.json`中的`babel`字段

```diff
- "babel": {
-    "presets": [
-      "react-app"
-    ]
-  },
```

3.配置`/config/webpack.config.js`

```diff
...
// style files regexes
- const cssRegex = /\.css$/;
+ const cssRegex = /\.(css|less)$/;
...

// 增加一个less-loader
@ -101,6 +101,10 @@ module.exports = function(webpackEnv) {
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
+     {
+         loader: require.resolve('less-loader'),
+         options: cssOptions
+     },
    ].filter(Boolean);

...

// 设置一个别名
if (preProcessor) {
    loaders.push({
@ -265,6 +269,7 @@ module.exports = function(webpackEnv) {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    'react-native': 'react-native-web',
+   '@': paths.appSrc
    },

...
```

4.准备就绪测试使用 less 和 antd 组件

- 将 App.css 修改成 App.less 内容如下

```less
.App {
  .text-center {
    text-align: center;
  }
}
```

- 将 App.js 修改成 App.jsx

```jsx
import React from "react";
import logo from "./logo.svg";
import "./App.less";
import { Button } from "antd";

function App() {
  return (
    <div className="App">
      <p className="text-center">
        <Button type="primary">Antd Btn</Button>
      </p>
    </div>
  );
}

export default App;
```

- yarn start
