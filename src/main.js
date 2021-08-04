import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局的样式,解决frame不对
import './assets/css/base.css'
import VueLazyload from 'vue-lazyload'


// 根据图片懒加载文档来使用
Vue.use(VueLazyload, {
    // 可以通过配置loading来设置图片还未加载好之前的占位图片
    loading: require('./assets/images/loading.png')
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
