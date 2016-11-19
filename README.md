# Tapestry

A _prototypical_ dashboard for [openHAB](http://www.openhab.org) built with [Vue.js](https://vuejs.org) + [Vuex](https://vuex.vuejs.org/).

## Installation

### From source

```bash
# clone this repo
git clone https://github.com/timonreinhard/tapestry.git
cd tapestry

# install dependencies
npm install

# build for production with minification
npm run build

# copy to openHAB static web folder
cp -a dist/ /path/to/openhab/conf/html/tapestry
```

## Development

Start by forking this repo and cloning the fork.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# configure the API endpoint (defaults to localhost:8080)
npm config set tapestry:target <ip-address>:<port>

# serve with hot reload at localhost:3000
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Contributing

Contributions in form of code, UI design, documentation or bug reports are very welcome. The maintainer however asks you to create issues and discuss them before introducing new features or substantial changes.


## Licenses

This software is published under the [Mozilla Public License Version 2.0](LICENSE).

All icons included in this repository are licensed under [CC 3.0 BY](https://creativecommons.org/licenses/by/3.0/).
Please see [src/assets/icons/CREDITS.md](src/assets/icons/CREDITS.md) for attributions.
