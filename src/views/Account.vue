<template>
    <div class="account">
        <AccountHeader @switchItem="switchItem"></AccountHeader>
        <!--switchNum传递值到子组件-->
        <AccountBottom :switchNum="switchNum"></AccountBottom>
    </div>
</template>

<script>
import AccountHeader from '../components/Account/AccountHeader'
import AccountBottom from '../components/Account/AccountBottom'
export default {
    name: 'Account',
    components: {
        AccountHeader,
        AccountBottom
    },
    methods: {
        switchItem (index) {
            // 接收accountHeader传递过来的方法参数
            console.log(index)
            this.switchNum = index
        }
    },
    data () {
        return {
            switchNum: 0,
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../assets/css/mixin";
    @import "../assets/css/variable";
    .account{
        // 固定定位，不然点击进来的撑不满屏幕，上面的之前的导航栏还存在
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        @include bg_sub_color;
    }
</style>
