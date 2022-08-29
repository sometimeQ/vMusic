<template>
    <!--使用我们自定义的vue组件包裹起来-->
    <Header class="header">
<!--        <div><slot name="left" class="header-left"></slot></div>-->
<!--        &lt;!&ndash;标题&ndash;&gt;-->
<!--        <p><slot name="center" class="header-title"></slot>someOne 音乐</p>-->
<!--        <div><slot name="right" class="heaer-right" @click.stop="accountClick"></slot></div>-->

        <div slot="left" class="header-left"></div>
        <p slot="center" class="header-title">someOne 音乐</p>
        <div slot="right" class="header-right" @click.stop="accountClick"></div>
    </Header>
</template>

<script>
// 引入header组件
import Header from './Header'
// 暴露
export default {
    name: 'MainHeader',
    components: {
        Header
    },
    // 实现自定义的方法
    methods: {
        accountClick () {
            // 跳转路由,拿到router地址跳转
            // console.log('看看是否点击了反应')
            this.$router.push('/account')
        }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable.scss";
@import "../assets/css/mixin.scss";

    .header{
        .header-left{
            @include bg_img('../assets/images/logo');
            width: 84px;
            height: 84px;
        }
        .header-right{
            @include bg_img('../assets/images/account');
            width: 84px;
            height: 84px;
        }
        .header-title{
            margin-top: 5px;
            text-align: center;
            line-height: 84px;
            color: #ffff;
            font-weight: bold;
            @include font_size($font_medium)
        }
    }
</style>
