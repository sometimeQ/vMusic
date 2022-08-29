<template>
    <!--ref 有三种用法： 1、ref 加在普通的元素上，用this.ref.name 获取到的是dom元素-->
    <!--2、ref 加在子组件上，用this.ref.name 获取到的是组件实例，可以使用组件的所有方法。-->
    <!--3、如何利用 v-for 和 ref 获取一组数组或者dom 节点-->
    <!--配合$refs使用的-->
    <div id="wrapper" ref="wrapper">
        <!--滚动的内容不确定，放一个插槽占位，谁使用谁决定这里显示什么内容-->
        <slot></slot>
    </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
    name: 'ScrollView',
    // 由于此时html已经渲染出来了，所以可以直接操作dom节点,this.$refs操作减少节点的消耗
    mounted () {
        this.iscroll = new IScroll(this.$refs.wrapper, {
            click: true, // 设置下，不然里面的元素不能点击
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
            // console.log(mutationList)
            // console.log(this.iscroll.maxScrollY)
            // console.log(this.iscroll.maxScrollY)
            // console.log(observer)
            // 刷新后才能计算出准确的高度，才能滚动
            this.iscroll.refresh()
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
        // 自定义一个方法给外界调用的
        scrolling (fn) {
            // 滚动的时候
            this.iscroll.on('scroll', function () {
                // console.log(this.y)
                fn(this.y)
            })
        },
        // 提供给外界刷新下，不然滚动不了
        refresh () {
            // 延迟几秒加载完毕刷新
            setTimeout(() => {
                this.iscroll.refresh()
            }, 100)
        },
        // 提供外界方法用于歌词滚动
        scrollTo (x, y, t) {
            this.iscroll.scrollTo(x, y, t)
        }
    }
}
</script>

<!--iscroll的宽高等于容器的宽高-->
<style scoped>
    #wrapper{
        width: 100%;
        height: 100%;
    }
</style>
