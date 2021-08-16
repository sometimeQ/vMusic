<template>
    <!--包裹一个过度动画-->
    <transition :css="false" @enter="enter" @leave="leave">
        <!--这里的属性是取的mapGetters 映射的本地的全局属性 v-show="isShowListPlayer"-->
        <div class="list-player" v-show="isShowListPlayer">
            <div class="player-wrapper">
                <div class="player-top">
                    <div class="player-left">
                        <div class="mode loop" @click="mode" ref="mode"></div>
                        <p>顺序播放</p>
                        <!--                    <p>单曲播放</p>-->
                        <!--                    <p>随机播放</p>-->
                    </div>
                    <div class="player-right">
                        <div class="del" @click="delAll"></div>
                    </div>
                </div>
                <div class="player-middle">
                    <ScrollView ref="scrollView">
                        <ul ref="play">
                            <li class="item" v-for="(value, index) in songs" :key="value.id" @click="selectMusic(index)">
                                <div class="item-left">
                                    <div class="item-play" @click.stop="itemPlay(index)" v-show="currentIndex === index"></div>
                                    <p>{{value.name}}</p>
                                </div>
                                <div class="item-right">
                                    <div class="item-favorite" @click="favorite"></div>
                                    <div class="item-del" @click.stop="del(index)"></div>
                                </div>
                            </li>
<!--                            <li class="item">-->
<!--                                <div class="item-left">-->
<!--                                    <div class="item-play"></div>-->
<!--                                    <p>看看这是什么情况啊</p>-->
<!--                                </div>-->
<!--                                <div class="item-right">-->
<!--                                    <div class="item-favorite"></div>-->
<!--                                    <div class="item-del"></div>-->
<!--                                </div>-->
<!--                            </li>-->
                        </ul>
                    </ScrollView>
                </div>
                <div class="player-bottom">
                    <p @click.stop="hidden">关闭</p>
                </div>
            </div>
        </div>
    </transition>

</template>

<script>
import ScrollView from '../ScrollView'
import {mapActions, mapGetters} from 'vuex'
import modeType from '../../store/modeType'
// 引入动画组件
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
    name: 'ListPlayer',
    components: { ScrollView },
    methods: {
        // 映射本地的方法
        ...mapActions([
            'setListPlayer',
            'setModeType',
            'setIsPlaying',
            'setCurrentIndex',
            'setDelSong'
        ]),
        hidden () {
            // console.log('点击啦关闭按钮')
            // 隐藏播放列表
            this.setListPlayer(false)
        },
        // 删除全部
        delAll () {
            // 不传递就是全部删除
            this.setDelSong()
        },
        // 选中播放的索引
        selectMusic(index) {
            this.setCurrentIndex(index)
        },
        // 删除
        del(index) {
            // 删除远端的vue3存储的数据
            this.setDelSong(index)
            // 默认触发,解决第一首歌不播放的问题
            if (index === 0) {
                this.$emit('select')
            }
        },
        // 收藏，或者是喜欢
        favorite () {

        },
        // 进入动画
        enter (el, done) {
            Velocity(el, 'transition.perspectiveUpIn', {duration: 500}, function () {
                done()
            })
        },
        // 离开动画
        leave(el, done) {
            Velocity(el, 'transition.perspectiveUpOut', {duration: 500}, function () {
                done()
            })
        },
        mode () {
            // 这里的取出属性来判断赋值,然后在取出映射的本地的方法来赋值
            if (this.modeType === modeType.loop) {
                this.setModeType(modeType.one)
            } else if (this.modeType === modeType.one) {
                this.setModeType(modeType.random)
            } else if (this.modeType === modeType.random) {
                this.setModeType(modeType.loop)
            }
        },
        // 点击播放按钮的事件
        itemPlay (index) {
            // 获取属性,修改方法
            this.setIsPlaying(!this.isPlaying)
        }
    },
    // 计算属性
    computed: {
        ...mapGetters([
            // 映射的属性
            'isShowListPlayer',
            'modeType',
            'isPlaying',
            'songs',
            'currentIndex',
        ])
    },
    // 监听值改变
    watch: {
        modeType (newValue) {
            if (newValue === modeType.loop) {
                this.$refs.mode.classList.remove('random')
                this.$refs.mode.classList.add('loop')
            } else if (newValue === modeType.one) {
                this.$refs.mode.classList.remove('loop')
                this.$refs.mode.classList.add('one')
            } else if (newValue === modeType.random) {
                this.$refs.mode.classList.remove('one')
                this.$refs.mode.classList.add('random')
            }
        },
        // 这里保持和之前播放器界面同步
        isPlaying (newValue) {
            if (newValue) {
                this.$refs.play.classList.add('active')
            } else {
                this.$refs.play.classList.remove('active')
            }
        },
        // 显示即开始
        isShowListPlayer (newValue) {
            if (newValue) {
                this.$refs.scrollView.refresh()
            }
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
                overflow: hidden;
                ul{
                    &.active {
                        .item{
                            .item-play {
                                // 暂停按钮
                                @include bg_img('../../assets/images/small_pause')
                            }
                        }
                    }
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
