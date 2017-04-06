# Tapestry

A minimal dashboard for [openHAB](http://www.openhab.org) built with [Vue.js](https://vuejs.org) + [Vuex](https://vuex.vuejs.org/).

### Supported Item Types

- [ ] Color
- [x] Contact
- [ ] DateTime
- [ ] Dimmer
- [ ] Group
- [x] Number
- [ ] Player
- [ ] Rollershutter
- [x] String
- [x] Switch

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

# configure the API endpoint (defaults to localhost:8080)
npm config set tapestry:target http://<ip-address>:<port>

# serve with hot reload at localhost:3000
npm start

# run tests continously
npm run test:watch

# run tests
npm test

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Contributing

Contributions in form of code, UI design, documentation or bug reports are very welcome. The maintainer however asks you to create issues and discuss them before introducing new features or substantial changes.


## Licenses

This software is published under the [Mozilla Public License Version 2.0](LICENSE).

All icons included in this repository are licensed under [CC 3.0 BY](https://creativecommons.org/licenses/by/3.0/).
Please see [src/assets/icons/CREDITS.md](src/assets/icons/CREDITS.md) for attributions.
