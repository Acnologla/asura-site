import Vue from 'vue'
import VueRouter from 'vue-router'
import Galos from "../views/Galos"
import Home from '../views/Home'
import Donate from "../views/Donate"
import Commands from "../views/Commands"

const RinhaTutorial = () => import("../views/RinhaTutorial")

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
