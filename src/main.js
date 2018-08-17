import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
// import moment from 'moment/moment'
// moment.locale('zh-cn');
//
// Vue.use(moment);

Vue.prototype.myurl='http://192.168.0.109:3000/'

Vue.prototype.globalMove = function (callback) {
    document.onmousemove = function (e) {
        callback(e);
    }
}


Vue.prototype.globalStopMove = function (callback) {
    document.onmouseup = function () {
        callback();
    }
}

Vue.prototype.axios=axios;
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.filter('moment', function (value) {
    return value.split('T')[0]
})




new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
