<template>
    <swiper :options="swiperOption" class="banner">
        <!--转盘-->
        <swiper-slide class="cd">
            <!--外面的转盘-->
           <div class="cd-wrapper">
               <!--里面的图片-->
               <img src="" alt="">
           </div>
            <p>这里是描述</p>
        </swiper-slide>
        <!--歌词-->
        <swiper-slide class="lyric">
            <!--这里能滚动的歌词-->
            <ScrollView>
                <ul>
                    <li>xxxxxxxxxxxxxx</li>
                    <li>xxxxxxxxxxxxxx</li>
                    <li>xxxxxxxxxxxxxx</li>
                    <li>xxxxxxxxxxxxxx</li>
                    <li>xxxxxxxxxxxxxx</li>
                    <li>xxxxxxxxxxxxxx</li>
                    <li>xxxxxxxxxxxxxx</li>
                    <li>xxxxxxxxxxxxxx</li>

                </ul>
            </ScrollView>
        </swiper-slide>
        <!--分页器-->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
// 引入第三方的插件,去github查看文档有全局和局部注册
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ScrollView from '../ScrollView'
export default {
    name: 'PlayerMiddle',
    data () {
        return {
            // 属性跟上面绑定的
            swiperOption: {
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    bulletClass: 'my-bullet',
                    bulletActiveClass: 'my-bullet-active'
                },
                observer: true,
                observeParents: true,
                observeSlideChildren: true
            },
            currentLineNum: '0'
        }
    },
    // 注册下
    components: {
        Swiper,
        SwiperSlide,
        ScrollView,
    },
    methods: {

    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";

    .banner{
        // 默认界面,定位区域
        position: fixed;
        top: 150px;
        bottom: 250px;
        left: 0;
        right: 0;
        .cd{
            .cd-wrapper{
                // 居中
                margin: 0 auto;
                // 大圆圈,边框也是
                width: 500px;
                height: 500px;
                border-radius: 50%;
                border: 30px solid #fff;
                background: purple;
                // 动画
                animation: sport 3s linear infinite;
                animation-play-state: paused;
                // 激活状态下
                &.active{
                    animation-play-state: running;
                }
                // 圆圈里面的图片
                img{

                }
            }
            p{
                text-align: center;
                @include font_size($font_medium);
                @include font_color;
                margin-top: 50px;
            }
        }
        // 歌词界面
        .lyric{
            li{
                text-align: center;
                @include font_size($font_medium);
                @include font_color;
                margin: 10px 0;
            }
        }
    }
</style>


<style lang="scss">
    @import "../../assets/css/mixin";
    // 自定义轮播图的指示器
    .my-bullet{
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background: #fff;
        margin: 0 20px;
    }
    .my-bullet-active{
        width: 60px;
        @include bg_color;
    }
</style>
