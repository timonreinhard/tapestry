import Vue from 'vue'
import * as VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// When adding further locales, make sure to import
// the corresponding moment.js file as well (see above)
const locales = ['en']

// This actually requires all files during build-time
// See: https://webpack.github.io/docs/context.html#dynamic-require
locales.forEach(locale => {
  // Vue.locale(locale, require('./i18n/' + locale + '.json'))
})

Vue.config.lang = 'en'
Vue.config.fallbackLang = 'en'

// Apply to DOM
document.documentElement.setAttribute('lang', Vue.config.lang.substr(0, 2))
