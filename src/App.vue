<template>
  <div id="app">
    <!--使用下面的组件-->
    <MainHeader></MainHeader>
    <Tabbar></Tabbar>
    <!--指定路由的出口-->
    <router-view></router-view>
    <!--全局的播放器-->
    <Player></Player>
  </div>
</template>

<script>
// 先得引入需要的文件夹
import MainHeader from './components/MainHeader'
import Tabbar from './components/Tabbar'
import Player from './views/Player'

export default {
    name: 'App',
    // 添加组件
    components: {
        MainHeader,
        Tabbar,
        Player,
    },
}

</script>

<style lang="scss">

</style>
