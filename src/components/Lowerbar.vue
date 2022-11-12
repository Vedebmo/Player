<template>
    <div class="bar">
        <span class="icon-shuffle"></span>
        <span class="icon-cog"></span>
        <span class="icon-game-controller"></span>
        <span class="icon-loop"></span>
    </div>
</template>

<style scoped>

    .bar{
        display: flex;
        justify-content: center;
        color: white;
        width: 50%;
        height: 7%;
        margin: auto auto 2.5vh auto;
        background-color: rgba(0, 0, 0, 0.20);
        border-radius: 36px;
    }

    .bar span{
        font-size: 1.4em;
        margin: auto;
    }
    
    @media screen and (min-width: 768px) {
        .bar{
            width: 80%;
            margin-bottom: 3em;
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