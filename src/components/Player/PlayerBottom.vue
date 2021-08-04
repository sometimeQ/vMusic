<template>
    <div class="player-bottom">
        <div class="bottom-progress">
            <!--时间-->
            <span>00:00</span>
            <!--总的进度条-->
            <div class="progress-bar">
                <!--走到哪里的的长度-->
                <div class="progress-line">
                    <!--小圆点-->
                    <div class="progress-dot"></div>
                </div>
            </div>
            <!--总时间-->
            <span>04:30</span>
        </div>
        <div class="bottom-controll">
            <div class="mode loop"></div>
            <div class="prev"></div>
            <div class="play"></div>
            <div class="next"></div>
            <div class="favorite"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PlayerBottom'
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
                        width: 10px;
                        height: 10px;
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
