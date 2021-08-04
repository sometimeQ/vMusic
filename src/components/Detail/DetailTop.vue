<template>
    <div class="detail-top">
        <div class="image-conver">
            <img :src="path" alt="">
            <!--遮罩  ref = 其实ref除了可以获取本页面的dom元素，还可以拿到子组件中的data和去调用子组件中的方法-->
            <div class="mask" ref="mask"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DetailTop',
    props: {
        path: {
            type: String,
            default: '',
            require: true
        }
    },
    methods: {
        // 提供一个方法给外界调用
        changeMask (opacity) {
            console.log(opacity)
            // 获取到原生的元素
            this.$refs.mask.style.opacity = opacity
        }
    }
}
</script>

<style scoped lang="scss">
    .detail-top{
        width: 100%;
        height: 500px;
        position: relative;
        overflow: hidden;
        img{
            width: 100%;
        }
        .mask{
            position: absolute;
            left: 0;
            top: 0;
            background: #000000;
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }
</style>
