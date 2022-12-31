<template>
    <div class="bar">
        <span class="icon-shuffle" id="iconShuffle" @click="store.launchShuffle"></span>
        <span class="icon-cog" @click="store.launchSettings"></span>
        <span class="icon-game-controller"></span>
        <span class="icon-loop" id="iconLoop" @click="store.launchLoop"></span>
    </div>
</template>

<style scoped>

    .bar{
        display: flex;
        justify-content: center;
        position: relative;
        top: 1.5vh;
        color: white;
        width: 50%;
        height: 100%;
        margin: 0 auto;
        align-self: center;
        background-color: rgba(0, 0, 0, 0.20);
        border-radius: 36px;
    }

    .bar span{
        font-size: 1.4em;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        transition: background .5s;
    }
    .bar span:hover{
        cursor: pointer;
    }

    .icon-shuffle{
        border-radius: 36px 0px 0px 36px
    }
    .icon-loop{
        border-radius: 0px 36px 36px 0px
    }
    
    @media screen and (min-width: 768px) {
        .bar{
            width: 80%;
            margin: 0;
            height: 7%;
        }

        .bar .icon-cog{
            display: none;
        }
    }

</style>

<script>
    export default{
        name: "LowerBar"
    }
</script>

<script setup>
    import {Store} from "../store.js"
    const store = Store()
</script>