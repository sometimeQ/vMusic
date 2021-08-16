<template>
    <div class="player">
        <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
        <MiniPlayer></MiniPlayer>
        <ListPlayer @select="play"></ListPlayer>
        <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
    </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import mode from '../store/modeType'
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'Player',
    components: {
        MiniPlayer,
        NormalPlayer,
        ListPlayer,
    },
    data () {
        return {
            totalTime: 0, // 总时长
            currentTime: 0, // 当前的播放时间
        }
    },
    methods: {
        ...mapActions(
            ['setCurrentIndex']
        ),
        play () {
            // console.log('ccccc')
            if (this.currentIndex === 0) {
                console.log('当歌曲为0')
                // 看是否能播放
                this.$refs.audio.ondurationchange = () => {
                // 判断当前的歌曲是否正在播放
                    if (this.isPlaying) {
                        // console.log('mmmm')
                        this.$refs.audio.play()
                    } else {
                        // console.log('wwwww')
                        this.$refs.audio.pause()
                    }
                }
            }
        },
        timeupdate (e) {
            // 获取当前歌曲播放的事件存储
            // console.log(e.target.currentTime)
            this.currentTime = e.target.currentTime
        },
        end () {
            // 歌曲播放完毕的调用, 判断播放模式是什么根据播放即可
            if (this.modeType === mode.loop) {
                this.setCurrentIndex(this.currentIndex + 1)
            } else if (this.modeType === mode.one) {
                this.$refs.audio.play()
            } else if (this.modeType === mode.random) {
                // 随机播放的方法
                let index = this.getRandomIntInclusive(0, this.songs.length - 1)
                this.setCurrentIndex(index)
            }
        }
    },
    computed: {
        ...mapGetters([
            'currentSong',
            'isPlaying',
            'currentIndex',
            'modeType',
            'songs',
            'curTime'
        ])
    },
    watch: {
        // 只要观察属性变化即开始播放音乐
        isPlaying (newVaule, oldValue) {
            if (newVaule) {
                console.log('播放了')
                this.$refs.audio.play()
            } else {
                console.log('暂停了')
                this.$refs.audio.pause()
            }
        },
        curTime (newValue) {
            // 设置点击进度条变化后的观察值的变化
            this.$refs.audio.currentTime = newValue
        },
        // 如果切换了索引
        currentIndex (newValue, oldValue) {
            // console.log('xxxx1111')
            // console.log(newValue)
            // console.log(oldValue)
            /*
            注意点: 在iOS中系统不会自动加载歌曲, 所以oncanplay不会自动执行
            https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html
            在PC端和Android端, 系统会自动加载歌曲, 所以oncanplay会自动被执行
            解决方案: 如何监听iOS中Audio的歌曲是否已经准备好了, 通过ondurationchange事件来监听
              ondurationchange事件什么时候执行: 当歌曲加载完成之后执行, 因为只有歌曲加载完成之后才能获取到歌曲的总时长
      */

            // console.log('当前的索引变化是否触发了')

            // 看是否能播放
            this.$refs.audio.ondurationchange = () => {
                // 获取当前歌曲的总时间,切换每一首歌曲就切换
                this.totalTime = this.$refs.audio.duration
                // 判断当前的歌曲是否正在播放
                if (this.isPlaying) {
                    console.log('currentIndex变化 ==> 播放了')
                    this.$refs.audio.play()
                } else {
                    console.log('currentIndex变化 ==> 暂停')
                    this.$refs.audio.pause()
                }
            }
        }
    },
    mounted () {
        // 页面初始化完成后,获取默认的播放时间
        this.$refs.audio.ondurationchange = () => {
            console.log('xx1')
            console.log(this.$refs.audio.duration)
            this.totalTime = this.$refs.audio.duration
        }
    }
}
</script>

<style scoped lang="scss">

</style>
