const path = require("path");

const {camelCase} = require("camel-case");

const webpack = require("webpack");
const {merge} = require("webpack-merge");

const pkg = require("./package.json");

const name = camelCase(pkg.name);

const exposes = {
  "./utils/log-hello": "./src/utils/log-hello.js",
  "./utils/version": "./src/utils/version.js",
  "./google-analytics": "./src/ga.js"
};

const asyncExternals = {
  'google-analytics': `promise new Promise((resolve) => {
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.onload = function () {
      resolve(window.ga)
    }
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
});`
}


/** @type {webpack.Configuration} */
const baseConfig = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
};

/** @type {webpack.Configuration} */
const browserConfig = {
  output: {
    path: path.resolve("./dist/browser"),
  },
  externals: asyncExternals,
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name,
      filename: "remote-entry.js",
      exposes
    }),
  ],
};

/** @type {webpack.Configuration} */
const nodeConfig = {
  target: "node",
  output: {
    path: path.resolve("./dist/node"),
  },
  externals: asyncExternals,
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name,
      filename: "remote-entry.js",
      library: {type: "commonjs"},
      exposes,
    }),
  ],
};

module.exports = [
  merge(baseConfig, browserConfig),
  // merge(baseConfig, nodeConfig),
];
