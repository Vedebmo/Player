<template>
    <div class="app2" id="app2" style="z-index: -10;">
        <div class="modal" :style="{opacity: store.modalOpacity, left: store.modalPosition}">
            <div>
                <div class="load">
                    <span class="icon-loop2"></span>
                    <br><br>
                    <h1>{{store.texts[75][store.language]}}</h1>
                </div>
                <div>
                    <div class="text">
                        <h2>{{store.texts[76][store.language]}}</h2>
                        <p>{{store.uploadProgress[0]}}</p>
                    </div>
                    <div class="text">
                        <h2>{{store.texts[77][store.language]}}</h2>
                        <p>{{store.uploadProgress[1]}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .app2{
        display: grid;
        position: absolute;
        z-index: 3;
        height: 100vh;
        width: 100vw;
        place-items: center;

        transition: all .5s ease-in-out;
    }

    .modal{
        position: absolute;
        background: white;
        width: 80%;
        height: 80%;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        box-shadow: -10px 12px 14px 2px rgba(210,184,211,0.43);
        -webkit-box-shadow: -10px 12px 14px 2px rgba(210,184,211,0.43);
        -moz-box-shadow: -10px 12px 14px 2px rgba(210,184,211,0.43);

        transition: all .5s ease-in-out;
    }

    .modal h1{
        font-size: 4vmax !important;
        text-align: center;
        color: #8B8181;
    }

    .icon-loop2{
        display: block;
        font-size: 5vmax !important;
        color: #D2B8D3;
        animation: infinite rotate 2s linear;
    }

    @keyframes rotate{
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }

    .load{
        width: 100%;
        text-align: center;
    }

    .text{
        display: flex;
        width: 100%;
        color: #8B8181;
        align-items: center;
        justify-content: center;
        font-size: 2vmax !important;
    }

    .text p{
        margin-left: 5%;
        height: 1em;
    }

</style>

<script>
    export default{
        name: "Modal"
    }
</script>

<script setup>
    import {Store} from "../store.js"
    const store = Store()
</script>