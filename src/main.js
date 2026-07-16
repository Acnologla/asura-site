import "@/assets/main.css";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import posthog from "posthog-js";

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

import "buefy/dist/buefy.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronDown,
  faSun,
  faMoon,
  faPlusCircle,
  faMinusCircle,
  faChevronRight,
  faSearch,
  faGlobe,
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
  faSearch,
  faGlobe
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

posthog.init("phc_xE7gJ4Yds7ZLGBtxNkthEzK4S23a6fCNGm5fK95wtZnE", {
  api_host: "https://us.i.posthog.com",
  defaults: "2026-05-30",
  autocapture: false,
  capture_pageview: false,
  disable_session_recording: true,
  capture_performance: false,
  capture_exceptions: false,
  mask_personal_data_properties: true,
  custom_personal_data_properties: ["token"],
});

router.afterEach((to) => {
  posthog.capture("$pageview", {
    $current_url: `${window.location.origin}${to.path}`,
  });
});

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
