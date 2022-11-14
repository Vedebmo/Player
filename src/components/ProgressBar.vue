<template>
    <hr>

    <!--Player-->
    <div class="player">
        <div class="left">
            <span class="icon-previous2"></span>
        </div>
        <div class="center icon-pause2X">
            <div class="triangle"></div>
        </div>
        <div class="right">
            <span class="icon-next2"></span>
        </div>
    </div>
</template>

<style scoped>
    hr{
        margin-top: .7em;
        border: 1px solid #66757F;
        width: 80%;
    }
    
    .player{
        width: 80%;
        display: flex;
        justify-content: center;
        /* height: calc(50vmax - 65vmin); */
        margin: auto;
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