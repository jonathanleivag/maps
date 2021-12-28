import { createApp } from 'vue'
import App from './App.vue'
import vuex from './vuex'
import VueSweetalert2 from 'vue-sweetalert2'
import Swap from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import './style.css'

if (!navigator.geolocation) {
  Swap.fire('Error', 'Tu navegador no soporta geolocation', 'error')
  throw new Error('Tu navegador no soporta geolocation')
}

createApp(App)
  .use(vuex)
  .use(VueSweetalert2)
  .mount('#app')
