import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    // state: 用于保存全局共享的数据
    state: {},
    // mutations: 用于保存修改全局共享的数据的方法
    mutations: {},
    // actions: 用于保存触发mutations中保存的方法的方法
    actions: {},
    // getters: 专门用于保存获取全局共享的数据的方法
    modules: {}
})
