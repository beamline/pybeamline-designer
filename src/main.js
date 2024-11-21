import { createApp } from 'vue'
import App from './App.vue'

// vuetify
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
loadFonts()

// codemirror
import VueCodemirror from 'vue-codemirror'
import { basicSetup } from 'codemirror'
import { python } from '@codemirror/lang-python'

createApp(App)
  .use(vuetify)
  .use(VueCodemirror, {
    disabled: true,
    extensions: [ basicSetup, python() ],
  })
  .mount('#app')
