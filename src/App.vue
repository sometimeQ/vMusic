<template>
  <div id="app">
    <!--使用下面的组件-->
    <Header></Header>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
// 先得引入需要的文件夹
import Header from './components/Header'
import Tabbar from './components/Tabbar'

export default {
    name: 'App',
    // 添加组件
    components: {
        Header,
        Tabbar,
    },
}

</script>

<style lang="scss">


</style>
