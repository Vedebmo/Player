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
        height: 5vh;
        margin: auto;
        background-color: rgba(0, 0, 0, 0.20);
        border-radius: 36px;
    }

    .bar span{
        font-size: 1.4em;
        margin: auto;
    }

</style>

<script>
    export default{
        name: "LowerBar"
    }
</script>