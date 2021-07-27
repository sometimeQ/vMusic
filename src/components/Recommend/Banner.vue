<template>
    <!--swiper的bug,如果数据是从网络获取的, 那么自动轮播到最后一页之后就不轮播了-->
    <!--只需要在swiper组件上面加上v-if="数据.length > 0"-->
    <swiper :options="swiperOptions" class="banner" v-if="banners.length > 0">
        <!--key需要一个唯一的-->
        <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
            <a :href="value.url">
                <img :src="value.pic" alt="">
            </a>
        </swiper-slide>
        <!--分页器-->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
// 引入第三方的插件,去github查看文档有全局和局部注册
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

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
        Swiper,
        SwiperSlide
    }
}
</script>

<style scoped lang="scss">
    .banner{
        .item{
            img{
                // 设置图片的宽度，高度
                width: 100%;
                height: 300px;
            }
        }
    }
</style>


<style lang="scss">
@import "../../assets/css/mixin";
/*注意点: 如果想覆盖swiper的样式, 那么style标签不能是scoped的, 否则无法覆盖*/
    .banner{
        // 小圆点
        .swiper-pagination-bullet{
            width: 16px;
            height: 16px;
            background: #ffff;
            opacity: 1; // 透明度为1
        }
        // 激活状态下的
        .swiper-pagination-bullet-active{
            @include bg_color
        }
    }
</style>
