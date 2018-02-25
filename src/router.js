import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from 'auth'
import { SessionStorage } from 'quasar'

Vue.use(VueRouter)

function load (component) {
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: load('welcome/welcome'), beforeEnter: checkAuth }, // Default
    { path: '/login', component: load('auth/login') },
    { path: '/register', component: load('auth/register') },
    {
      path: '/',
      component: load('layouts/menu'),
      beforeEnter: checkAuth,
      children: [
        { path: 'pound', component: load('doges/pound'), meta: { title: 'Adopt a Ðoge' } },
        { path: 'pack', component: load('owners/pack'), meta: { title: 'Your Pack' } },
        { path: 'date', component: load('doges/date'), meta: { title: 'Find Love' } },
        { path: 'profile', component: load('owners/profile'), meta: { title: 'Profile' } },
        // Perhaps move this outside of auth, allowing the public to check out pups.
        { path: 'doges/:id', component: load('doges/profile') }
      ]
    },
    { path: '*', component: load('error404') } // Not found
  ]
})

function checkAuth (to, from, next) {
  if (to.path === '/' && auth.user.authenticated) {
    next('/pack')
  }
  else if (!SessionStorage.get.item('id_token') && to.path !== '/') {
    console.log('not logged')
    next('/login')
  }
  else {
    next()
  }
}
