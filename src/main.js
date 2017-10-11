import Vue from 'vue'
import vueRouter from 'vue-router'
import vueResource from 'vue-Resource'
import App from './App.vue'
import '../statics/css/main.less'
import routes from './config/routes'

Vue.use(vueRouter);
Vue.use(vueResource);

console.log(App);

const router = new vueRouter({
    routes
})

new Vue({
    el: '#app',
    router: router,
    render: c => c(App)
})