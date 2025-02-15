import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {Button, Modal, Carousel, Navbar, Input, Menu} from 'buefy'
import 'buefy/dist/buefy.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faSun, faMoon, faPlusCircle, faMinusCircle  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronDown, faSun, faMoon, faPlusCircle, faMinusCircle )
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Modal)
Vue.use(Carousel)
Vue.use(Navbar)
Vue.use(Input)
Vue.use(Menu)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
