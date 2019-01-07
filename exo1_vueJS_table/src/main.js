import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import Router from 'vue-router'
import Home from './Home.vue'
import AppRestoDetail from './appRestoDetail.vue'
import MapV from './map.vue'
import 'vue-material/dist/vue-material.min.css'




Vue.use(VueMaterial)

Vue.use(Router)
const routes = [
  {path: '/',name: 'home', component: Home},
  {path: '/map', component: MapV},
  {path: '/resto/:id', name : 'detail', component: AppRestoDetail} ];
const router = new Router ({
  routes,
  mode:'history'
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
