import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// Supported application locales
const locales = ['en']

// This actually requires all files during build-time
// See: https://webpack.github.io/docs/context.html#dynamic-require
locales.forEach(locale => {
  Vue.locale(locale, require('./i18n/' + locale + '.json'))
})

Vue.config.fallbackLang = 'en'
Vue.config.lang = []
  .concat(
    navigator.languages,
    navigator.language,
    navigator.userLanguage,
    navigator.browserLanguage,
    navigator.systemLanguage
  )
  .filter(el => typeof el === 'string')
  .reduceRight((prev, current) =>
    locales.includes(current.substr(0, 2))
    ? current
    : prev
  , Vue.config.fallbackLang)

// Apply to DOM
document.documentElement.setAttribute('lang', Vue.config.lang.substr(0, 2))
