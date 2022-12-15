<template>
    <!-- <hr> -->
    <input type="range" id="range" @input="store.movingSong" value="0" step="any" :style="{ backgroundSize: store.rangeSize}">
    <!--Player-->
    <div class="player">
        <div class="left">
            <span class="icon-previous2" @click="store.previous()"></span>
        </div>

        <div class="center" @click="store.play">
            <div :class="store.icon"></div>
        </div>

        <div class="right">
            <span class="icon-next2" @click="store.next()"></span>
        </div>
    </div>
</template>

<style scoped>

    input[type="range"] {    
        margin: .8em auto;
        appearance: none;
        width: 80%;
        height: 4px;
        background: #66757F;
        border-radius: 5px;
        background-image: linear-gradient(#D2B8D3, #D2B8D3);
        background-repeat: no-repeat;
    }

    input[type="range"]:hover{
        cursor: pointer;
    }

    input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #D2B8D3;
        cursor: pointer;
        box-shadow: 0 0 2px 0 #66757F;
        transition: background .3s ease-in-out;
    }

    input[type=range]::-webkit-slider-runnable-track  {
        appearance: none;
        box-shadow: none;
        border: none;
        background: transparent;
    }
    
    .player{
        width: 80%;
        display: flex;
        justify-content: center;
        margin: 2vh auto;
    }
    .left, .right, .center{
        width: 2em;
        height: 2em;
        color: white;
        text-align: center;
        display: grid;
        place-items: center;
        font-size: 2.5em;
        margin: auto;
    }
    
    .center{
        color: white;
        text-align: center;
        background: #D2B8D3;
        border-radius: 68px;
        font-size: 2.5em;
    }

    .left span:hover, .right span:hover, .center:hover{
        cursor: pointer;
    }

    .triangle {
        position: relative;
        left: 7%;
        background-color: white;
        text-align: left;
    }

    .triangle:before, .triangle:after {
        content: '';
        position: absolute;
        background-color: inherit;
    }

    .triangle, .triangle:before, .triangle:after {
        width:  .6em;
        height: .6em;
        border-top-right-radius: 35%;
    }

    .triangle {
        transform: rotate(30deg) skewX(-30deg) scale(1,.866);
    }

    .triangle:before {
        transform: rotate(-135deg) skewX(-45deg) scale(1.414,.707) translate(0,-50%);
    }

    .triangle:after {
        transform: rotate(135deg) skewY(-45deg) scale(.707,1.414) translate(50%);
    }

</style>

<script>
    export default{
        name: "ProgressBar"
    }
</script>

<script setup>
    import {Store} from "../store.js"
    const store = Store()
</script>