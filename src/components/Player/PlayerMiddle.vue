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
            <p>{{getFirstLyric()}}</p>
        </swiper-slide>
        <!--歌词-->
        <swiper-slide class="lyric" ref="lyric">
            <!--这里能滚动的歌词-->
            <ScrollView ref="scrollView">
                <ul>
                    <!--:class="{'active' : currentLineNum === key}"  绑定一个类名显示高亮状态-->
                    <li v-for="(value, key) in currentLyric" :key="key" :class="{'active' : currentLineNum === key}">{{key}}---{{value}}</li>
                    <!--<li>xxxxxxxxxxxxxx</li>-->
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
            // 定义一个变量来接收高亮状态下的值
            currentLineNum: '0'
        }
    },
    // 父控件传递过来的歌曲播放的时间
    props: {
        currentTime: {
            type: Number,
            default: 0,
            require: true,
        }
    },
    // 自定义的方法
    methods: {
        getFirstLyric () {
            // 只需要第一段话,第一句歌词
            for (let key in this.currentLyric) {
                // console.log(this.currentLyric)
                // console.log(this.currentLyric[key])
                return this.currentLyric[key]
            }
        },
        // 提供一个外界的方法递归查找
        getActiveLineNum (lineNum) {
            // 吐过传递进来的行数不存在
            if (lineNum < 0) {
                // 返回默认的行数
                return this.currentLineNum
            }
            // 取出value,转换字符串
            let result = this.currentLyric[lineNum + '']
            // 如果是空的
            if (result === undefined || result === '') {
                // 代表不存在继续遍历,查找上一行的歌曲
                lineNum--
                return this.getActiveLineNum(lineNum)
            } else {
                return lineNum + ''
            }
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
        },
        // 当播放歌曲的时间改变后就读取 props 里面的currentTime 是父控件传递下来的值
        currentTime (newValue) {
            // console.log('播放时间改变啦')
            /*
            // 1.高亮歌词同步
            let lineNum = Math.floor(newValue) + ''
            let result = this.currentLyric[lineNum]
            if (result !== undefined && result !== '') {
                this.currentLineNum = lineNum
                // 2.歌词滚动同步
                let currentLyricTop = document.querySelector('li.active').offsetTop
                let lyricHeight = this.$refs.lyric.$el.offsetHeight
                 if (currentLyricTop > lyricHeight / 2) {
                     console.log('开始滚动')
                     this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
                 }
            }
             */

            // 1.高亮歌词同步,超过多少范围就自动轮播,向上滚动
            let lineNum = Math.floor(newValue)
            // 递归查找,排除某个时间段位空的key,这里是点击进度条,需要立即同步歌词的状态
            this.currentLineNum = this.getActiveLineNum(lineNum)
            // 2.歌词滚动同步
            let currentLyricTop = document.querySelector('.lyric .active').offsetTop
            // console.log(document.querySelector('.lyric .active'))
            // console.log(currentLyricTop)
            // console.log('xxxx')
            // 获取当前容器标签的高度
            let lyricHeight = this.$refs.lyric.$el.offsetHeight
            // console.log(lyricHeight)
            // 如果当前歌词的高度大于了当前容器高度的一半就开始滚动
            if (currentLyricTop > lyricHeight / 2) {
                // 差值就是需要滚动的
                this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
            } else {
                // 如果往回点就恢复到原来的位置
                this.$refs.scrollView.scrollTo(0, 0, 100)
            }
        },
        // 当歌词时间改变后，实时获取歌词的key,value，绑定便于高亮显示
        currentLyric () {
            // 绑定函数与key
            for (let key in this.currentLyric) {
                this.currentLineNum = key
                return
            }
        }
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
                &:last-of-type {
                    // 才能有效的滚动，显示完全
                    padding-bottom: 50%;
                }
                // 歌词高亮效果
                &.active{
                    color: #ffffff;
                }
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
