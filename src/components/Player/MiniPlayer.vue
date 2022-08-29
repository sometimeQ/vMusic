<template>
    <!--控制 isShowMiniPlayer 是否显示，这里绑定的是mapGetters里面的全局变量，即属性-->
    <div class="mini-player" v-show="isShowMiniPlayer">
        <div class="player-wrapper">
            <div class="mini-left">
<!--                <img src="https://p2.music.126.net/kQEL3K6v4NissqBkuXI3Jw==/109951166186628307.jpg" alt="" ref="cd">-->
                <img :src="currentSong.picUrl" ref="cd">
                <div class="player-title">
                    <h3>{{currentSong.name}}</h3>
                    <p>{{currentSong.singer}}</p>
                </div>
            </div>
            <div class="mini-right">
                <div class="play" @click="play" ref="play"></div>
                <!--阻止事件冒泡  @click.stop-->
                <div class="list" @click.stop="showList"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'MiniPlayer',
    methods: {
        // 映射本地的方法
        ...mapActions([
            /*
            这里映射的这个方法是actions.js里面的以下方法,该方法也触发了mutations内部的方法,详见vuex mapAction
            setListPlayer({commit}, flag) {
                // 触发mutatioons里面的方法 commit固定于法
                commit(SET_LIST_PLAYER, flag)
            }
           */
            'setListPlayer',
            // 'setMiniPlayer',
            'setIsPlaying'
        ]),
        showList () {
            // console.log('点击啦更多的列表')
            this.setListPlayer(true)
        },
        // 顶部标签绑定的方法
        play () {
            this.setIsPlaying(!this.isPlaying)
        }
    },
    // 计算属性
    computed: {
        ...mapGetters([
            // 映射本地的属性
            'isShowMiniPlayer',
            'isPlaying',
            'currentSong'
        ])
    },
    // 实时监听isPlaying的属性状态
    watch: {
        isPlaying (newValue) {
            // 改变播放图标状态
            if (newValue) {
                // 图片旋转状态
                this.$refs.cd.classList.add('active')
                // 播放图标装填
                this.$refs.play.classList.add('active')
            } else {
                this.$refs.cd.classList.remove('active')
                this.$refs.play.classList.remove('active')
            }
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";

    .mini-player{
        // 定位到底部
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 150px;
        .player-wrapper{
            width: 100%;
            height: 100%;
            @include bg_color;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .mini-left{
                display: flex;
                padding-left: 30px;
                width: 50%;
                img{
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    margin-right: 20px;
                    animation: sport 3s linear infinite;
                    animation-play-state: paused;
                    // 激活状态下的执行动画
                    &.active{
                        animation-play-state: running;
                    }
                }
                // 文字信息
                .player-title{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    @include no-wrap;
                    h3{
                        @include font_size($font_medium);
                        @include font_color;
                    }
                    p{
                        @include font_size($font_medium_s);
                        @include font_color;
                    }
                }
            }
            // 右边的图片
            .mini-right{
                display: flex;
                align-items: center;
                .play{
                    width: 84px;
                    height: 84px;
                    @include bg_img('../../assets/images/play');
                    &.active{
                        @include bg_img('../../assets/images/pause')
                    }
                }
                .list{
                    width: 120px;
                    height: 120px;
                    @include bg_img('../../assets/images/list')
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
