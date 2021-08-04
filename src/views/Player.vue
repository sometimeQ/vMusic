<template>
    <div class="player">
        <NormalPlayer></NormalPlayer>
        <MiniPlayer></MiniPlayer>
        <ListPlayer></ListPlayer>
    </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
export default {
    name: 'Player',
    components: {
        MiniPlayer,
        NormalPlayer,
        ListPlayer,
    }
}
</script>

<style scoped lang="scss">
 .player{
     /*width: 100%;*/
     /*height: 100%;*/
     /*background: purple;*/
     position: fixed;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     background: pink;
 }
</style>
