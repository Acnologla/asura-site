import Vue from 'vue'
import VueRouter from 'vue-router'
import Galos from "../views/Galos"
import Home from '../views/Home'
import Donate from "../views/Donate"
import Commands from "../views/Commands"


const RinhaTutorial = () => import("../views/RinhaTutorial")
const RinhaInfo = () => import("../views/RinhaInfo")
const CreateGalo = () => import("../views/CreateGalo")
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/commands",
    name: "Commands",
    component: Commands
  },
  {
    path: "/galos",
    name: "Galos",
    component: Galos
  },
  {
    path: "/donate",
    name: "Donate",
    component: Donate
  },
  {
    path: "/tutorial",
    name: "RinhaTutorial",
    component: RinhaTutorial
  },
  {
    path: "/info",
    name: "RinhaInfo",
    component: RinhaInfo
  },
  {
    path: "/create",
    name: "CreateGalo",
    component: CreateGalo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: "/asura-site",
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
