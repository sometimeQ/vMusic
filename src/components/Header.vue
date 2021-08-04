<template>
        <div class="header" @click="changeTheme">
            <!--注意点: 不能直接插槽设置样式-->
            <div class="left">
                <slot name="left">左边</slot>
            </div>
            <slot name="center">中间</slot>
            <div class="right">
                <slot name="right">右边</slot>
            </div>
        </div>
</template>

<script>
// 暴露出去
export default {
    name: 'Header',
    // 自定义数据的
    data () {
        return {
        // 自定义属性
            themes: ['theme', 'theme1', 'theme2'],
            // 定义一个默认的索引
            index: 0
        }
    },
    // 自定义方法实现data里面的数据的
    methods: {
        // 实现上面按钮点击的方法
        changeTheme () {
            this.index++
            if (this.index >= this.themes.length) {
                // 重置
                this.index = 0
            }
            // 设置主题色，从数组中取出
            document.documentElement.setAttribute('data-theme', this.themes[this.index])
        }
    }
}
</script>

<!--这里的告诉使用什么语言-->
<style scoped lang="scss">
    // 报错问题
    //  error  in ./src/components/Header.vue?vue&type=style&index=0&id=61dd7a3d&scoped=true&lang=scss&
    // npm i postcss-pxtorem@4.0.1
    // 引入sass文件开始布局
    @import "../assets/css/mixin";
    @import "../assets/css/variable";

    .header {
        width: 100%;
        height: 100px;
        // 背景色
        @include bg_color();
        // 水平布局
        display: flex;
        justify-content: space-between;
        .left, .right {
            width: 84px;
            height: 84px;
            margin-top: 8px;
        }
    }

</style>
