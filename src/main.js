import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from'vue-router'
import Routes from './routes'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueResource);

var router=new VueRouter({
    routes: Routes,
    mode: 'history'
});
new Vue({
    el: '#app',
    render: h => h(App),
    router:router,
})


