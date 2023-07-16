# abort-controller-es5

[![npm version](https://img.shields.io/npm/v/abort-controller-es5.svg)](https://www.npmjs.com/package/abort-controller-es5) [![Build Status](https://travis-ci.org/compulim/abort-controller-es5.svg?branch=master)](https://travis-ci.org/compulim/abort-controller-es5)

This package is based on [`abort-controller`](https://npmjs.com/package/abort-controller). Although the original package contains an [ES5 bundle](https://unpkg.com/abort-controller/dist/abort-controller.umd.js), it did not contains an ES5 module. Importing the module directly or indirectly may break web apps running on ES5 browsers.

On install, this package will transpile your version of `abort-controller` to make it compatible with ES5 browsers.

Package authors should consider importing this package instead of `abort-controller`, so your packages will not break your users due to having `abort-controller` as a transient dependency.

## How to use

To install in your project, run:

```sh
npm install abort-controller abort-controller-es5
```

In your code:

```js
const controller = new AbortController();

controller.signal.addEventListener('abort', event => {
  // Handle abort signal
});

controller.abort();
```

You can also use it in HTML:

```html
<script src="https://unpkg.com/abort-controller-es5/dist/abort-controller-es5.production.min.js"></script>
```

## How it works

On `postinstall`, this package will run Babel and Webpack to transpile `abort-controller` into a single file.

This package peer-depends on `abort-controller`. Thus, you can select your own version of `abort-controller`.

### Updating `abort-controller`

When you update `abort-controller`, re-run `npm install abort-controller-es5` to get the latest package transpiled.

## Alternatives

Instead of importing this package, there are alternative workarounds you can use.

### Including the source code

You can copy the source code of `abort-controller` into your web app and use your build pipeline transpile the original package.

Be sure to include the original license and continue to depends on the package to make sure `npm audit` will scan for vulnerabilities.

### Modify your bundler configuration

Webpack do not transpile code under `/node_modules/` unless specified explicitly. You can modify `webpack.config.js` to include `/node_modules/abort-controller/` and `/node_modules/event-target-shim/` (its dependencies) and use `babel-loader` to transpile it on-the-fly.

## Contributions

Like us? [Star](https://github.com/compulim/abort-controller-es5/stargazers) us.

Want to make it better? [File](https://github.com/compulim/abort-controller-es5/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/abort-controller-es5/pulls) a pull request.
