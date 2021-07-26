<template>
    <!--swiper的bug,如果数据是从网络获取的, 那么自动轮播到最后一页之后就不轮播了-->
    <!--只需要在swiper组件上面加上v-if="数据.length > 0"-->
    <swiper :options="swiperOptions">
        <swiper-slide>Slide 1</swiper-slide>
        <!--分页器-->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
// 引入第三方的插件,去github查看文档有全局和局部注册
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

export default {
    name: 'Banner',
    // 自定义的数据,github官网有
    data() {
        return {
            swiperOptions: {
                loop: true, // 循环模式选项
                autoplay: {
                    delay: 1000, // 自动切换的时间间隔，单位ms
                    stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
                    disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
                },
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination'
                },
                observer: true,
                observeParents: true,
                observeSlideChildren: true
            }
        }
    },
    // 组父子组件的关系可以总结为 props向下传递，事件向上传递。父组件通过 props 给子组件下发数据，子组件通过事件给父组件发送消息
    // props的值可以是两种，一种是字符串数组，一种是对象
    props: {
        banners: {
            types: [],
            default: () => [],
            require: true, // 必须传值
        },
    },
    // 注册下
    components: {
        swiper,
        swiperSlide
    }
}
</script>

<style scoped>

</style>
