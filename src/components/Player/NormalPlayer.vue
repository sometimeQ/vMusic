<template>
    <!--报过一个动画 忽略去css查找动画，节省性能-->
  <transition :css="false" @enter="enter" @leave="leave">
      <!--    <div class="normal-player" v-show="this.$store.getters.isFullScreen">-->
      <!--这里的this.isFullScreen 是 mapGetters里面映射的局部方法-->
      <div class="normal-player" v-show="this.isFullScreen">
          <!--容器-->
          <div class="player-wrapper">
              <PlayerHeader></PlayerHeader>
              <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
              <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
          </div>
          <!--背景-->
          <div class="player-bg">
<!--              <img src="http://p1.music.126.net/TnEJR5jDr1aHjZ-R-lBxkw==/109951166246959993.jpg" alt="">-->
              <img :src="currentSong.picUrl" alt="">
          </div>
      </div>
  </transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import {mapActions, mapGetters} from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
    name: 'NormalPlayer',
    // 注册组件
    components: {
        PlayerHeader,
        PlayerMiddle,
        PlayerBottom
    },
    props: {
        // 接收组件传递过来IDE
        totalTime: {
            type: Number,
            default: 0,
            require: true
        },
        currentTime: {
            type: Number,
            default: 0,
            require: true
        }
    },
    methods: {
        // 哪些方法映射成为局部的的方法
        ...mapActions([
            // 获取歌词信息映射的接口
            'getSongLyric'
        ]),
        // 进入的动画
        enter (el, done) {
            Velocity(el, 'transition.shrinkIn', { duration: 300 }, function () {
                // 动画完成的回调函数,参考官网vue.js过度动画
                done()
            })
        },
        // 离开的动画
        leave (el, done) {
            Velocity(el, 'transition.shrinkOut', { duration: 500 }, function () {
                done()
            })
        }
    },
    // 计算属性
    computed: {
        // 固定写法
        ...mapGetters([
            // 哪些属性映射成局部的, 这里需要映射getter.js里面的 isFullScreen
            /*
              isFullScreen (state) {
                   return state.isFullScreen
                }
             */
            'isFullScreen',
            'currentSong', // 获取当前播放的歌曲
        ])
    },
    // 观察者变化值
    watch: {
        // 只要当前播放歌曲信息变化了，即传入id调用歌词
        currentSong (newId) {
            if (newId.id === undefined) {
                return
            }
            // 调用歌词信息接口方法
            this.getSongLyric(newId.id)
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";
    .normal-player{
        // 内容的
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        @include bg_sub_color;
        .player-wrapper{
            width: 100%;
            height: 100%;
            // 层级关系，显示
            position: relative;
            z-index: 999;
        }
        .player-bg{
            // 看不到图片，需要子绝父相
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            img{
                height: 100%;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                filter: blur(10px);
            }
        }
    }

</style>
