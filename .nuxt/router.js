import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3daa344b = () => interopDefault(import('..\\pages\\config.vue' /* webpackChunkName: "pages_config" */))
const _08580298 = () => interopDefault(import('..\\pages\\pop.vue' /* webpackChunkName: "pages_pop" */))
const _80a4fe4e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/config",
    component: _3daa344b,
    name: "config"
  }, {
    path: "/pop",
    component: _08580298,
    name: "pop"
  }, {
    path: "/",
    component: _80a4fe4e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
