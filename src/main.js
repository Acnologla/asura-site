import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import "./assets/variables.scss"
import 'buefy/dist/buefy.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false

Vue.use(Buefy)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
