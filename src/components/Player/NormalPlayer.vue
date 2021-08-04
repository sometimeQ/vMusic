<template>
    <div class="normal-player">
        <!--容器-->
        <div class="player-wrapper">
            <PlayerHeader></PlayerHeader>
            <PlayerMiddle></PlayerMiddle>
            <PlayerBottom></PlayerBottom>
        </div>
    </div>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
export default {
    name: 'NormalPlayer',
    // 注册组件
    components: {
        PlayerHeader,
        PlayerMiddle,
        PlayerBottom
    }
}
</script>

<style scoped>

</style>
