<template>
  <div id="app">
    <!--使用下面的组件-->
    <MainHeader></MainHeader>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
// 先得引入需要的文件夹
import MainHeader from './components/MainHeader'
import Tabbar from './components/Tabbar'


export default {
    name: 'App',
    // 添加组件
    components: {
        MainHeader,
        Tabbar,
    },
}

</script>

<style lang="scss">
body{
  margin: 0;
  padding: 0;
}

</style>
