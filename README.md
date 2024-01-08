<div id="title" align="center">
    <img src="./logo.jpg" width="300">
    <h1>impress.js</h1>
</div>

<div id="badges" align="center">
    <img alt="Project License" src="https://img.shields.io/github/license/impress/impress.js.svg">
    <img alt="GitHub Repo size" src="https://img.shields.io/github/repo-size/impress/impress.js.svg">
    <img alt="GitHub Repo issues" src="https://img.shields.io/github/issues-pr-raw/impress/impress.js">
    <a href="https://circleci.com/gh/impress/impress.js"><img alt="CircleCI" src="https://circleci.com/gh/impress/impress.js.svg?style=svg"></a>
    <br>
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/impress/impress.js">
    <img alt="GitHub watchers" src="https://img.shields.io/github/watchers/impress/impress.js">
    <img alt="GitHub forks" src="https://img.shields.io/github/forks/impress/impress.js">
    <br>
    <img alt="GitHub all releases" src="https://img.shields.io/github/downloads/impress/impress.js/total?label=Downloads (total)">
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/downloads/impress/impress.js/latest/total?label=Downloads (latest)">
    <img alt="Latest release" src="https://img.shields.io/github/release/impress/impress.js.svg">
</div>

impress.js is a presentation framework written in JavaScript that uses the power of CSS3 transitions and transforms. It is inspired by the idea behind prezi.com

**WARNING**

impress.js may not help you if you have nothing interesting to say ;)


***THIS VERSION IS UNSTABLE AND INCOMPLETE. Please use the [upstream version](https://github.com/impress/impress.js) (V2.0.0)!***

A rewrite of this README file is also ongoing, therefore it also contains comments and some unfinished sections, as well as the fact that it looks kinda awful with the partial changes that I have made so far.

We are also switching to TS as the main impress development language, but you can still develop plugins in JS, if you wish!

# Getting Started with impress.js
Welcome to impress.js, the impressive JavaScript framework, that allows you to build presentations for web browsers. 

## Browser support
Since impress.js is designed to show of the power of modern CSS, we cannot guarantee that it will run in older browser. Whilst we try not to intentionally not support browsers, some features might not work well on all browsers, especially with V3.x. For example, Internet Explorer is known to not work with V3.x, so if you really NEED to use that browser, please use V2.x. impress.js works best with the latest versions of Chrome, Firefox and most likely also with the latest versions of Safari.

## Quick Start
You can visit our website at [https://impress.js.org](https://impress.js.org) to learn more about the project, where you can also find helpful resources for getting started, like the [Getting Started Guide](/docs/GettingStarted.md) and [Documentation](/docs/DOCUMENTATION.md), but rendered as HTML instead of MarkDown, as it is here on GitHub.


## A very quick quick start
Copy one of the code snippets below to the header of your impress.js presentation's HTML file.
- V3.0.0:
```
<script src="https://cdn.jsdelivr.net/gh/impress/impress.js@3.0.0/dist/impress.min.js"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/impress/impress.js@3.0.0/dist/impress.min.css"
```
- V2.0.0: 
```
<script src="https://cdn.jsdelivr.net/gh/impress/impress.js@2.0.0/js/impress.js"/>
```
- V1.1.0:
```
<script src="https://cdn.jsdelivr.net/gh/impress/impress.js@1.1.0/js/impress.js"/>
```
- Upstream:
```
<script src="https://cdn.jsdelivr.net/gh/impress/impress.js/dist/impress.min.js"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/impress/impress.js/dist/impress.min.css"
```

We do not recommend using the Upstream version, as there might be breaking changes coming or features might be temporarily broken due to only partially finished feature updates. Whilst this shouldn't happen normally, please be aware of that risk when using Upstream.

### Using a self-hosted version of impress.js
You can download impress.js from the releases tab. Some older versions might not have the `impress.js` file in the releases, you will be required to extract it from the source code archive. You can find the file in the `js` folder. New versions include the `impress.js`, `impress.min.js`, `impress.css` and `impress.min.css` files in the assets.


# Documentation

You can find the entire documentation of impress.js on our [website](https://impress.js.org/docs) or in the [DOCUMENTATION.md](/docs/DOCUMENTATION.md) file

The [HTML source code](index.html) of the official [impress.js demo](http://impress.js.org/) serves as a good example usage and contains comments explaining various features of impress.js. For more information about styling you can look into [CSS code](css/impress-demo.css) which shows how classes provided by impress.js can be used. Last but not least [JavaScript code of impress.js](js/impress.js) has some useful comments if you are interested in how everything works. Feel free to explore!

# Official demo

[impress.js demo](http://impress.js.org/) by [@bartaz](http://twitter.com/bartaz)

## Examples and demos

The [Classic Slides](http://impress.js.org/examples/classic-slides/) demo is targeted towards beginners, or can be used as a template for presentations that look like the traditional PowerPoint slide deck. Over time, it also grew into the example presentation that uses most of the features and addons available.

More examples and demos can be found on [Examples and demos wiki page](http://github.com/impress/impress.js/wiki/Examples-and-demos).

Feel free to add your own example presentations (or websites) there.

## Other tutorials and learning resources

If you want to learn even more there is a [list of tutorials and other learning resources](https://github.com/impress/impress.js/wiki/impress.js-tutorials-and-other-learning-resources)
on the wiki, too.

There is also a book available about [Building impressive presentations with impress.js](http://www.packtpub.com/building-impressive-presentations-with-impressjs/book) by Rakhitha Nimesh Ratnayake.

You may want to check out the sibling project [Impressionist](https://github.com/henrikingo/impressionist): a 3D GUI editor that can help you in creating impress.js presentations.

## Mailing list

You're welcome to ask impress.js related questions on the [impressionist-presentations](https://groups.google.com/forum/#!forum/impressionist-presentations) mailing list.

TODO: We should migrate to a different kind of mailing list

# Contributing
## Cloning impress.js locally

    git clone --recursive https://github.com/impress/impress.js.git
    cd impress.js

Note: For a minimal checkout, omit the `--recursive` option. This will leave out extra plugins.

## Details
For developers, once you've made changes to the code, you should run these commands for testing:

    npm install
    npm run all

Note that running `firefox qunit_test_runner.html` is usually more informative than running `karma` with `npm run test`. They both run the same tests.

More info about the [src/](src/) directory can be found in [src/plugins/README.md](src/plugins/README.md).

## Requirements
TODO: Check that these requirements are still ok
* &gt;= node 7.6
* npm

# REPOSITORY STRUCTURE

* [index.html](index.html): This is the official impress.js demo, showcasing all of the features of the original impress.js, as well as some new plugins as we add them.
  * As already mentioned, this file is well commented and acts as the official tutorial.
* [examples/](examples/): Contains several demos showcasing additional features available.
  * [Classic Slides](examples/classic-slides/index.html) is a simple demo that you can use as template if you want to create very simple, rectangular, PowerPoint-like presentations.
* [src/](src/): The main file is [src/impress.js](src/impress.js). Additional functionality is implemented as plugins in [src/plugins/](src/plugins/).
  * See [src/plugins/README.md](src/plugins/README.md) for information about the plugin API and how to write plugins.
* [test/](test/): Contains QUnit and Syn libraries that we use for writing tests, as well as some test coverage for core functionality. (Yes, more tests are much welcome.) Tests for plugins are in the directory of each plugin.
* [js/](js/): Contains [js/impress.js](js/impress.js), which contains a concatenation of the core `src/impress.js` and all the plugins. Traditionally this is the file that you'll link to in a browser. In fact both the demo and test files do exactly that.
* [css/](css/): Contains a CSS file used by the demo. This file is **not required for using impress.js** in your own presentations. Impress.js creates the CSS it needs dynamically.
* [extras/](extras/) contains plugins that for various reasons aren't enabled by default. You have to explicitly add them with their own `script` element to use them.
* [build.js](build.js): Simple build file that creates `js/impress.js`. It also creates a minified version `impress.min.js`, but that one is not included in the github repository.
* [package.json](build.js): An NPM package specification. This was mainly added so you can easily install [buildify](https://www.npmjs.com/package/buildify) and run `node build.js`. Other than the build process, which is really just doing roughly `cat src/impress.js src/plugins/*/*.js > js/impress.js`, and testing, `impress.js` itself doesn't depend on Node or any NPM modules.

# About impress.js
## ABOUT THE NAME

impress.js name is [courtesy of @skuzniak](http://twitter.com/skuzniak/status/143627215165333504).

It's an (un)fortunate coincidence that an Open/LibreOffice presentation tool is called Impress ;)

## Reference API

See the [Reference API](DOCUMENTATION.md)

## Browser support (again, but for devs)

impress.js uses the following CSS and JavaScript features

* [DataSet API](http://caniuse.com/#search=dataset)
* [ClassList API](http://caniuse.com/#search=classlist)
* [CSS 3D Transforms](http://caniuse.com/#search=css%203d)
* [CSS Transitions](http://caniuse.com/#search=css%20transition)

# Copyright and License

Copyright 2011-2012 Bartek Szopka (@bartaz), 2016-2023 Henrik Ingo (@henrikingo) and [85+ other contributors](https://github.com/impress/impress.js/graphs/contributors)

Released under the MIT [License](LICENSE)
