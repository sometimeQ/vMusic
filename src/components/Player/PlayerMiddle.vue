<template>
    <swiper :options="swiperOption" class="banner">
        <!--转盘-->
        <swiper-slide class="cd">
            <!--外面的转盘 ref 绑定一个获取元素-->
           <div class="cd-wrapper" ref="cdWrapper">
               <!--里面的图片-->
<!--               <img src="http://p1.music.126.net/G9zHEGlfLM-P7Ve29mo6tA==/109951166250020573.jpg" alt="">-->
               <img :src="currentSong.picUrl" alt="">
           </div>
            <p>{{getFirstLyric}}</p>
        </swiper-slide>
        <!--歌词-->
        <swiper-slide class="lyric">
            <!--这里能滚动的歌词-->
            <ScrollView>
                <ul>
<!--                    :class="{'active' : currentLineNum === key}"-->
                    <li v-for="(value, key) in currentLyric" :key="key" >{{value}}</li>
<!--                    <li>xxxxxxxxxxxxxx</li>-->
<!--                    <li>xxxxxxxxxxxxxx</li>-->
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
import {mapGetters} from 'vuex'

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
    // 自定义的方法
    methods: {
        getFirstLyric () {
            // 只需要第一段话

        }
    },
    // 注册下
    components: {
        Swiper,
        SwiperSlide,
        ScrollView,
    },
    // getter setter
    computed: {
        ...mapGetters([
            'isPlaying',
            'currentSong',
            'currentLyric',
        ])
    },
    // 实时监听变化即触发
    watch: {
        // 这个是上面mapGetter里面的方法 isPlaying
        // 新值，旧值
        isPlaying(newValue, oldValue) {
            // console.log(newValue)
            // console.log(oldValue)
            // console.log('.采购员法')
            // 获取原生的元素, 上面的监听会返回新值是否发生变化
            if (newValue) {
                this.$refs.cdWrapper.classList.add('active')
            } else {
                this.$refs.cdWrapper.classList.remove('active')
            }
        }
    },
    mounted () {
        console.log('xxxmmmm')
        console.log(this.currentLyric)
        console.log('kkkkkk')
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
                /*background: purple;*/
                overflow: hidden;
                // 动画
                animation: sport 3s linear infinite;
                animation-play-state: paused;
                // 激活状态下
                &.active{
                    animation-play-state: running;
                }
                // 圆圈里面的图片
                img{
                    width: 100%;
                    height: 100%;
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

    // 动画
    @keyframes sport {
        from{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
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
