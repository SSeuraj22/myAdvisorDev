# markdown-it-attrs-es5

[![npm version](https://img.shields.io/npm/v/markdown-it-attrs-es5.svg)](https://www.npmjs.com/package/markdown-it-attrs-es5) [![Build Status](https://travis-ci.org/compulim/markdown-it-attrs-es5.svg?branch=master)](https://travis-ci.org/compulim/markdown-it-attrs-es5)

This package is based on [`markdown-it-attrs`](https://npmjs.com/package/markdown-it-attrs). It did not expose an ES5 module. Importing the module directly or indirectly may break web apps running on ES5 browsers.

On install, this package will transpile your version of `markdown-it-attrs` to make it compatible with ES5 browsers.

Package authors should consider importing this package instead of `markdown-it-attrs`, so your packages will not break your users due to having `markdown-it-attrs` as a transient dependency.

## How to use

To install in your project, run:

```sh
npm install markdown-it-attrs markdown-it-attrs-es5
```

You can also use it in HTML:

```html
<script src="https://unpkg.com/markdown-it-attrs-es5/dist/markdown-it-attrs-es5.production.min.js"></script>
```

## How it works

On `postinstall`, this package will run Babel and Webpack to transpile `markdown-it-attrs` into a single file.

This package peer-depends on `markdown-it-attrs`. Thus, you can select your own version of `markdown-it-attrs`.

### Updating `markdown-it-attrs`

When you update `markdown-it-attrs`, re-run `npm install markdown-it-attrs-es5` to get the latest package transpiled.

## Alternatives

Instead of importing this package, there are alternative workarounds you can use.

### Including the source code

You can copy the source code of `markdown-it-attrs` into your web app and use your build pipeline transpile the original package.

Be sure to include the original license and continue to depends on the package to make sure `npm audit` will scan for vulnerabilities.

### Modify your bundler configuration

Webpack do not transpile code under `/node_modules/` unless specified explicitly. You can modify `webpack.config.js` to include `/node_modules/markdown-it-attrs/` and use `babel-loader` to transpile it on-the-fly.

## Contributions

Like us? [Star](https://github.com/compulim/markdown-it-attrs-es5/stargazers) us.

Want to make it better? [File](https://github.com/compulim/markdown-it-attrs-es5/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/markdown-it-attrs-es5/pulls) a pull request.
