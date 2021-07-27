<template>
    <div id="wrapper" ref="wrapper">
        <slot>xxxxxxxxxxxx</slot>
    </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
    name: 'ScrollView',
    // 由于此时html已经渲染出来了，所以可以直接操作dom节点,this.$refs操作减少节点的消耗
    mounted () {
        this.iscroll = new IScroll(this.$refs.wrapper, {
            mouseWheel: true, // 禁用鼠标的滚轮
            scrollbar: false, // 禁用滚动条
            probeType: 3,
            // 解决拖拽卡顿问题
            scrollX: false,
            scrollY: true, // y方向滚动
            disablePointer: true,
            disableTouch: false,
            disableMouse: true
        })

        // 1.创建一个观察者的对象
        /*
            MutationObserver构造函数只要监听到了指定内容发生了变化,就会执行传入的回调函数
            MutationList: 发生变化的数组
            observer:观察者对象
        */
        let observer = new MutationObserver((mutationList, observer) => {
            console.log(mutationList)
            console.log(this.iscroll.maxScrollY)
            console.log(this.iscroll.maxScrollY)
            console.log(observer)
        })
        // 2.告诉观察者对象我们需要观察什么内容
        let config = {
            childList: true, // 观察目标子节点的变化，是否有添加或者删除
            subtree: true, // 观察后代节点，默认为 false
            attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
        }
        // 3.告诉观察者对象,我们需要观察谁,需要观察什么内容
        /*
            第一个参数: 告诉观察者对象我们需要观察谁
            第二个参数: 告诉观察者对象我们需要观察什么内容
        */
        observer.observe(this.$refs.wrapper, config)
    },
    methods: {
        scrolling (fn) {
            // 滚动的时候
            this.scrolling.on('scroll', function () {
                console.log(this.y)
                fn(this.y)
            })
        }
    }
}
</script>

<style scoped>
    #wrapper{
        width: 100%;
        height: 100%;
    }
</style>
