<template>
    <div class="list-player">
        <div class="player-wrapper">
            <div class="player-top">
                <div class="player-left">
                    <div class="mode loop"></div>
                    <p>顺序播放</p>
<!--                    <p>单曲播放</p>-->
<!--                    <p>随机播放</p>-->
                </div>
                <div class="player-right">
                    <div class="del"></div>
                </div>
            </div>
            <div class="player-middle">
                <ScrollView>
                    <ul>
                        <li class="item">
                            <div class="item-left">
                                <div class="item-play"></div>
                                <p>mmmmmmmmmm</p>
                            </div>
                            <div class="item-right">
                                <div class="item-favorite"></div>
                                <div class="item-del"></div>
                            </div>
                        </li>
                        <li class="item">
                            <div class="item-left">
                                <div class="item-play"></div>
                                <p>看看这是什么情况啊</p>
                            </div>
                            <div class="item-right">
                                <div class="item-favorite"></div>
                                <div class="item-del"></div>
                            </div>
                        </li>
                    </ul>
                </ScrollView>
            </div>
            <div class="player-bottom">
                <p @click.stop="hidden">关闭</p>
            </div>
        </div>
    </div>
</template>

<script>
import ScrollView from '../ScrollView'
export default {
    name: 'ListPlayer',
    components: { ScrollView },
    methods: {
        hidden () {
            console.log('点击啦关闭按钮')
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";

    .list-player{
        width: 100%;
        // 定位到底部
        position: fixed;
        left: 0;
        bottom: 0;
        @include bg_sub_color;
        .player-wrapper{
            // 上
            .player-top{
                width: 100%;
                height: 100px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .player-left{
                    display: flex;
                    align-items: center;
                    padding-left: 20px;
                    .mode{
                        width: 56px;
                        height: 56px;
                        margin-right: 20px;
                        &.loop{
                            @include bg_img('../../assets/images/small_loop');
                        }
                        &.one{
                            @include bg_img('../../assets/images/small_one');
                        }
                        &.random{
                            @include bg_img('../../assets/images/small_shuffle');
                        }
                    }
                    p{
                        @include font_size($font_medium_s);
                        @include font_color;
                    }
                }
                // 顶部右边的删除图标
                .player-right{
                    .del{
                        width: 84px;
                        height: 84px;
                        @include bg_img('../../assets/images/small_del');
                    }
                }
            }
            // 中
            .player-middle{
                height: 700px;
                ul{

                }
                .item{
                    height: 100%;
                    border-top: 1px solid #cccccc;
                    border-bottom: 1px solid #cccccc;
                    display: flex;
                    justify-content: space-between;
                    padding: 20px 40px;
                    box-sizing: border-box;
                    .item-left{
                        width: 70%;
                        display: flex;
                        align-items: center;
                        .item-play{
                            width: 56px;
                            height: 56px;
                            margin-right: 20px;
                            @include bg_img('../../assets/images/small_play')
                        }
                        p{
                            width: 80%;
                            @include font_size($font_medium_s);
                            @include font_color;
                            @include no-wrap;
                        }
                    }
                    .item-right{
                        display: flex;
                        align-items: center;
                        .item-favorite{
                            width: 56px;
                            height: 56px;
                            @include bg_img('../../assets/images/small_un_favorite');
                            // 激活状态下的图片
                            &.active{
                                @include bg_img('../../assets/images/small_favorite');
                            }
                        }
                        .item-del{
                            width: 70px;
                            height: 70px;
                            margin-left: 20px;
                            margin-right: -30px;
                            box-sizing: border-box;
                            @include bg_img('../../assets/images/small_del');
                        }
                    }
                }
            }
            // 底部的关闭布局
            .player-bottom{
                width: 100%;
                height: 100px;
                line-height: 100px;
                @include bg_color;
                p{
                    text-align: center;
                    color: #ffffff;
                    @include no-wrap;
                    @include font_size($font_medium);
                }
            }
        }
    }


</style>
