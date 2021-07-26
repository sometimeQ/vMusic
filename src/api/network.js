// 导入模块
import axios from 'axios'
// import Vue from 'vue'

// 进行全局的配置
axios.defaults.baseURL = 'http://localhost:3000'
// 配置超时时间
axios.defaults.timeout = 3000
// 添加请求拦截器,在请求或响应被 then 或 catch 处理前拦截它们
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config
},function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
})

// 封装自己的get/post方法,暴露给外界
export default {
    /*
    * Get方法
    * path: 路径
    * data入参
    */
    get: function (path= '', data= {}) {
        // 返回一个异步的Promise
        return new Promise(function (resolve, reject) {
            // 开始发送请求
            axios.get(path, {
                params: data,
            }).then(function (response) {
                resolve(response.data)
            }).catch(function (error) {
                reject(error)
            })
        })
    },
    /*
    * Post方法
    * data入参
    */
    post: function (path = '', data = {}) {
        return new Promise(function (resolve, reject) {
        // 开始post请求
            axios.post(path, data).then(function (response) {
                // 返回数据
                resolve(response.data)
            }).catch(function (error) {
                reject(error)
            })
        })
    },
    /**
     * 处理并发请求的助手函数
     *
     */
    all: function (list) {
        return new Promise(function (resolve, reject) {
            axios.all(list).then(function (response) {
                // 两个请求现在都执行完成
                resolve(response.data)
            }).catch(function (error) {
                reject(error)
            })
        })
    }


}

