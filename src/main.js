import { createApp } from 'vue'
import App from './App.vue'
import Unicon from 'vue-unicons'
import { uniPlay, uniPause, uniSetting, uniRedo, uniDollarAlt, uniQuestionCircle } from 'vue-unicons/dist/icons'
import './registerServiceWorker'
Unicon.add([uniPlay, uniPause, uniSetting, uniRedo, uniDollarAlt, uniQuestionCircle])

createApp(App).use(Unicon).mount('#app')
