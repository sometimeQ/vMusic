<template>
    <div class="tabbar">
        <!--跳转路由,渲染成div标签-->
        <router-link class="item" tag="div" to="/recommend">
            <span>推荐</span>
        </router-link>
        <router-link class="item" tag="div" to="/singer">
            <span>歌手</span>
        </router-link>
        <router-link class="item" tag="div" to="/rank">
            <span>排行</span>
        </router-link>
        <router-link class="item" tag="div" to="/search">
            <span>搜索</span>
        </router-link>
    </div>
</template>

<script>
// 对外界暴露
export default {
    name: 'Tabbar',
}
</script>

<style lang="scss" scoped>
    // 引入混合样式
    @import "../assets/css/variable";
    @import "../assets/css/mixin";

    .tabbar {
        width: 100%;
        height: 84/100px;
        // 背景色
        @include bg_sub_color;
        display: flex;
        // 两侧的间隔相等
        justify-content: space-around;

        .item {
            span {
                // 行高
                line-height: 84px;
                // 字体大小
                @include font_size($font_medium);
                // 默认字体颜色
                @include font_color();
            }

            // 激活状态下的,路由自带的激活
            &.router-link-active {
                span {
                    @include font_active_color();
                }

                // 下划线
                border-bottom: 4px solid #000;
                @include border_color;
            }
        }
    }
</style>
