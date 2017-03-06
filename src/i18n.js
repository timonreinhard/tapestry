import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueMoment from 'vue-moment'
import moment from 'moment'
import 'moment/locale/de'

Vue.use(VueI18n)
Vue.use(VueMoment, { moment })

// When adding further locales, make sure to import
// the corresponding moment.js file as well (see above)
const locales = ['en']

// This actually requires all files during build-time
// See: https://webpack.github.io/docs/context.html#dynamic-require
locales.forEach(locale => {
  Vue.locale(locale, require('./i18n/' + locale + '.json'))
})

// Leverage moment.js to auto-detect browser locale
Vue.config.lang = moment.locale()
Vue.config.fallbackLang = 'en'

// Apply to DOM
document.documentElement.setAttribute('lang', Vue.config.lang.substr(0, 2))
