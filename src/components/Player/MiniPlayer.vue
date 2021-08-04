<template>
    <div class="mini-player">
        <div class="player-wrapper">
            <div class="mini-left">
                <img src="https://p2.music.126.net/kQEL3K6v4NissqBkuXI3Jw==/109951166186628307.jpg" alt="">
                <div class="player-title">
                    <h3>xxxxx</h3>
                    <p>描述文件</p>
                </div>
            </div>
            <div class="mini-right">
                <div class="play"></div>
                <!--阻止事件冒泡  @click.stop-->
                <div class="list" @click.stop="showList"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MiniPlayer',
    methods: {
        showList () {
            console.log('点击啦更多的列表')
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

</style>
