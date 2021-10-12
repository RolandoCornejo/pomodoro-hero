import { createApp } from 'vue'
import App from './App.vue'
import Unicon from 'vue-unicons'
import './registerServiceWorker'
import { uniPlay, uniPause, uniSetting, uniRedo, uniDollarAlt, uniQuestionCircle, uniSquareFull, uniCheckSquare, uniPlus, uniTrashAlt, uniBitcoin, uniPaypal, uniInfoCircle } from 'vue-unicons/dist/icons'

Unicon.add([uniPlay, uniPause, uniSetting, uniRedo, uniDollarAlt, uniQuestionCircle, uniSquareFull, uniCheckSquare, uniPlus, uniTrashAlt, uniBitcoin, uniPaypal, uniInfoCircle])

createApp(App).use(Unicon).mount('#app')