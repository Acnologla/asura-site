import "@/assets/tailwind.css";
import "@/assets/bulma.css";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import {
  Button,
  Modal,
  Carousel,
  Navbar,
  Input,
  Menu,
  Checkbox,
  Select,
  Field,
  Tabs,
} from "buefy";

//import "buefy/dist/buefy.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronDown,
  faSun,
  faMoon,
  faPlusCircle,
  faMinusCircle,
  faChevronRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDiscord } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faChevronDown,
  faSun,
  faMoon,
  faPlusCircle,
  faMinusCircle,
  faChevronRight,
  faGithub,
  faDiscord,
  faSearch
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Modal);
Vue.use(Carousel);
Vue.use(Navbar);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Field);
Vue.use(Input);
Vue.use(Tabs);
Vue.use(Menu);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
