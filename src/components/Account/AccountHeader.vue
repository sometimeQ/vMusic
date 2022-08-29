<template>
    <Header class="header">
        <div slot="left" class="header-left" @click.stop="back"></div>
        <ul slot="center" class="header-title">
            <!--绑定类名的是需要一个对象  .stop禁止点击事件透传-->
            <li :class="{'active' : swichNumber === 0}" @click.stop="switchItem(0)">我喜欢的</li>
            <li :class="{'active' : swichNumber === 1}" @click.stop="switchItem(1)">最近听的</li>
        </ul>
        <div slot="right" class="header-right" @click.stop="more"></div>
    </Header>
</template>

<script>
import Header from '../Header'
export default {
    name: 'AccountHeader',
    components: { Header },
    data () {
        return {
            // 默认属性第一个
            swichNumber: 0,
        }
    },
    methods: {
        // 返回
        back () {
            window.history.back()
        },
        // 更多
        more () {
            console.log('点击啦')
        },
        // 切换中间
        switchItem (index) {
            // console.log('触发了吗?' + index)
            this.swichNumber = index
            // 触发父控件的方法
            this.$emit('switchItem', index)
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";

    .header{
        .header-left{
            @include bg_img('../../assets/images/back');
            width: 84px;
            height: 84px;
        }
        .header-right{
            width: 84px;
            height: 84px;
            @include bg_img('../../assets/images/more');
        }
        .header-title{
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ffffff;
            font-weight: bold;
            border-radius: 20px;
            border: 1px solid #ffffff;
            @include font_size($font_medium);
            @include no-wrap;
            height: 60px;
            margin-top: 20px;
            li{
                height: 60px;
                line-height: 60px;
                padding: 0 20px;
                &:nth-of-type(1) {
                    border-right: 1px solid #ffffff;
                }
                &.active{
                    background: rgb(255, 255, 255, 0.3);
                }
            }
        }
    }

</style>
