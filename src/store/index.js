import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getter from './getter'
import mutations from './mutations'
import action from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
    // 把各自的封装成了一个对象，这样就便于管理
    state: state,
    mutations: mutations,
    actions: action,
    getters: getter,


    /*
  // state: 用于保存全局共享的数据
  state: {
    isFullScreen: false
  },
  // mutations: 用于保存修改全局共享的数据的方法
  mutations: {
    changeFullScreen (state, flag) {
      state.isFullScreen = flag
    }
  },
  // actions: 用于保存触发mutations中保存的方法的方法
  actions: {
    setFullScreen ({ commit }, flag) {
      commit('changeFullScreen', flag)
    }
  },
  // getters: 专门用于保存获取全局共享的数据的方法
  getters: {
    isFullScreen (state) {
      return state.isFullScreen
    }
  }
   */

    /*
    // state: 用于保存全局共享的数据
    state: {},
    // mutations: 用于保存修改全局共享的数据的方法
    mutations: {},
    // actions: 用于保存触发mutations中保存的方法的方法
    actions: {},
    // getters: 专门用于保存获取全局共享的数据的方法
    //modules: {}
     */
})
