<template>
    <div class="player-bottom">
        <div class="bottom-progress">
            <!--时间-->
            <span ref="eleCurrentTime">00:00</span>
            <!--总的进度条-->
            <div class="progress-bar" @click="progressClick" ref="progressBar">
                <!--走到哪里的的长度-->
                <div class="progress-line" ref="progressLine">
                    <!--小圆点-->
                    <div class="progress-dot"></div>
                </div>
            </div>
            <!--总时间-->
            <span ref="eleTotalTime">00:00</span>
        </div>
        <div class="bottom-controll">
            <!--添加一个 ref,用于方便获取元素dom进行操作-->
            <div class="mode loop" ref="mode" @click="mode"></div>
            <div class="prev" @click="prev"></div>
            <div class="play" @click="play" ref="play"></div>
            <div class="next" @click="next"></div>
            <div class="favorite"></div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import modeType from '../../store/modeType'
import { formartTime } from '../../tools/tools'
export default {
    name: 'PlayerBottom',
    props: {
        totalTime: {
            type: Number,
            default: 0,
            require: true
        },
        currentTime: { // 当前音乐播放的时间
            type: Number,
            default: 0,
            require: true
        }
    },
    methods: {
        // 获取actions里面的方法
        ...mapActions([
            'setIsPlaying',
            'setModeType',
            'setCurrentIndex',
            'setCurrentTime'
        ]),
        // 上面标签绑定的方法
        play () {
            // this.isPlaying 是getter里面的属性,点击设置是否正在播放
            this.setIsPlaying(!this.isPlaying)
        },
        // 控制上一手的
        prev () {
            // 设置点击的索引, this.currentIndex 就是全局vuex的属性
            this.setCurrentIndex(this.currentIndex -1)
        },
        // 下一首
        next () {
            this.setCurrentIndex(this.currentIndex + 1)
        },
        // 播放模式的点击事件
        mode () {
            // 改变方法,获取getter属性, this.modeType,传递值
            if (this.modeType === modeType.loop) {
                this.setModeType(modeType.one)
            } else if (this.modeType === modeType.one) {
                this.setModeType(modeType.random)
            } else if (this.modeType === modeType.random) {
                this.setModeType(modeType.loop)
            }
        },
        // 背景线的点击事件
        progressClick (e) {
            // 计算进度条的位置
            // 1.1 获取背景线条的总宽度
            let normalLeft = this.$refs.progressBar.offsetLeft
            // 获取点击距离屏幕左边的位置
            let eventLeft = e.pageX
            // 计算差值得到点击的宽度,
            let clickLeft = eventLeft - normalLeft
            // console.log(normalLeft)
            // console.log('分割线')
            // console.log(eventLeft)
            let progressWidth = this.$refs.progressBar.offsetWidth
            // 计算比例
            let value = clickLeft / progressWidth
            // 计算前景的宽度
            this.$refs.progressLine.style.width = value * 100 + '%'
            console.log(value * 100)

            // 1.2 计算该从什么时候播放,当前音乐的总时间 * 点击的比例
            let currentTime = this.totalTime * value
            // 保存
            this.setCurrentTime(currentTime)
        }
    },
    computed: {
        // 获取getter.js里面的属性
        ...mapGetters([
            'isPlaying',
            'modeType',
            'currentIndex'
        ])
    },
    // 实时监听状态改变
    watch: {
        // mapGetters 是这里面的方法
        isPlaying (newValue) {
            if (newValue) {
                // 改变播放图标的图片
                this.$refs.play.classList.add('active')
            } else {
                this.$refs.play.classList.remove('active')
            }
        },
        // 监听播放模式的属性方法getter.js里面的
        modeType (value) {
            // 切换图标即可,添加类名即可
            if (value === modeType.loop) {
                // 获取绑定的元素
                this.$refs.mode.classList.remove('random')
                this.$refs.mode.classList.add('loop')
            } else if (value === modeType.one) {
                this.$refs.mode.classList.remove('loop')
                this.$refs.mode.classList.add('one')
            } else if (value === modeType.random) {
                this.$refs.mode.classList.remove('one')
                this.$refs.mode.classList.add('random')
            }
        },
        // 只要总时间变化了
        totalTime (newValue) {
            console.log('总实际哦按比' + newValue)
            // 转化时间
            let time = formartTime(newValue)
            // 拼接总时长
            this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second
        },
        // 当前音乐播放的时间
        currentTime (newVaule) {
            // 格式化当前播放的时间
            let time = formartTime(newVaule)
            // 设置当前播放的音乐的时间
            this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second
            // 根据当前播放的时间计算进度条的比例
            let value = newVaule / this.totalTime * 100
            this.$refs.progressLine.style.width = value + '%'
        }

    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";

    .player-bottom{
        // 固定定位到底部,高度由控件撑起来
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        .bottom-progress{
            width: 80%;
            // 水平居中
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                @include font_size($font_samll);
                @include font_color;
            }
            .progress-bar{
                // 总的进度条
                width: 100%;
                margin: 0 10px;
                height: 10px;
                background: #ffffff;
                .progress-line{
                    width: 0%; // 10%
                    height: 100%;
                    background: #cccccc;
                    position: relative;
                    .progress-dot{
                        position: absolute;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #fff;
                        // 距离
                        left: 100%;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
            }
        }
        // 底部工具锯条
        .bottom-controll{
            width: 80%;
            margin: 0 auto;
            padding: 50px 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            div{
                width: 84px;
                height: 84px;
            }
            // 单独设置图片
            .mode{
                &.loop{
                    @include bg_img('../../assets/images/loop')
                }
                &.one{ // 单曲循环
                    @include bg_img('../../assets/images/one')
                }
                &.random{ // 随机播放
                    @include bg_img('../../assets/images/shuffle')
                }
            }
            .prev{
                @include bg_img('../../assets/images/prev')
            }
            .play{
                @include bg_img('../../assets/images/play');
                // 激活状态下的图标
                &.active{
                    @include bg_img('../../assets/images/pause')
                }
            }
            .next{
                @include bg_img('../../assets/images/next')
            }
            .favorite{
                @include bg_img('../../assets/images/un_favorite');
                &.active{
                    @include bg_img('../../assets/images/favorite')
                }
            }
        }
    }

</style>
