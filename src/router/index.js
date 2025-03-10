import Vue from "vue";
import VueRouter from "vue-router";
import AllGalos from "../views/AllGalos.vue";
import Galos from "../views/Galos";
import Home from "../views/Home";
import Donate from "../views/Donate";
import Commands from "../views/Commands";

const RinhaTutorial = () => import("../views/RinhaTutorial");
const RinhaInfo = () => import("../views/RinhaInfo");
const CreateGalo = () => import("../views/CreateGalo");
const Terms = () => import("../views/Terms");
const Privacy = () => import("../views/Privacy");
const Trade = () => import("../views/Trade");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/terms",
    name: "Terms",
    component: Terms,
  },
  {
    path: "/trade",
    name: "Trade",
    component: Trade,
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: Privacy,
  },
  {
    path: "/commands",
    name: "Commands",
    component: Commands,
  },
  {
    path: "/galo",
    name: "Galo",
    component: Galos,
  },
  {
    path: "/galos",
    name: "Galos",
    component: AllGalos,
  },
  {
    path: "/donate",
    name: "Donate",
    component: Donate,
  },
  {
    path: "/tutorial",
    name: "RinhaTutorial",
    component: RinhaTutorial,
  },
  {
    path: "/info",
    name: "RinhaInfo",
    component: RinhaInfo,
  },
  {
    path: "/create",
    name: "CreateGalo",
    component: CreateGalo,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
