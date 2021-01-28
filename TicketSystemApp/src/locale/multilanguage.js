import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: localStorage.getItem("lang") || 'nl',
    messages: {
        'en': require('./en.json'),
        'nl': require('./nl.json')
    }
})

if (module.hot) {
    module.hot.accept(['./en.json', './nl.json'], () => {
        i18n.setLocaleMessage('en', require('./en.json'))
        i18n.setLocaleMessage('nl', require('./nl.json'))
    })
}

export default i18n
