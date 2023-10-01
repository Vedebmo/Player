<template>
    <div class="app2" id="app2" style="z-index: -10;">
        <div class="modal" :style="{opacity: store.modalOpacity, left: store.modalPosition}" v-if="!store.editPlaylists">
            <div>
                <div class="load">
                    <span class="icon-loop2"></span>
                    <br><br>
                    <h1>{{store.texts[75][store.language]}}</h1>
                    <h2 style="color: #8B8181;">{{store.texts[81][store.language]}}: {{store.final}} / {{ store.songsQuantity * 2 }}</h2>
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

        <div class="modal2" :style="{opacity: store.modalOpacity, left: store.modalPosition}" v-if="store.editPlaylists">
            <div class="close">
                <span class="icon-cross" @click="store.launchModal(['playlist'])"></span>
            </div>
            <div class="parent">
                <div class="img-container">
                    <img src="https://media.npr.org/assets/img/2023/09/22/gettyimages-1250380030_slide-b7fd7fe615d89250cc78d56d4715c5af94355909-s800-c85.webp" alt="Img">
                </div>
                <span class="icon-pencil img-pencil"></span>
                <h2 id="playlistName">
                    <p contentEditable="true" @focusin="store.editName('In')" @focusout="store.editName">Playlist</p>
                    <span class="icon-pencil" v-if="store.showPencil" onclick="document.getElementById('playlistName').firstChild.focus()"></span>
                </h2>
                <button @click="store.playlistManager('add')">{{ store.texts[60][store.language] }} <span class="icon-plus"></span></button>
                <div class="songsContainer">
                    <SongPart class="Song" v-for="n in 65" :class="n % 2 == 0 ? 'dark' : 'light'"></SongPart>
                </div>
            </div>
        </div>

        <div class="modal2" :style="{opacity: store.modalOpacity, left: store.modalPosition}" v-if="store.addPlaylists">
            <div class="close">
                <span class="icon-cross" @click="store.addPlaylists = false, store.editPlaylists = true"></span>
            </div>
            <div class="parent">
                <div class="show">
                    <input type="text" :placeholder="store.texts[1][store.language]">
                </div>
                <h1 style="text-align: center;">{{ store.texts[61][store.language] }}:</h1>
                <div class="songsContainer">
                    <SongPart class="Song" v-for="n in 65" :class="n % 2 == 0 ? 'dark' : 'light'"></SongPart>
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

    .modal, .modal2{
        position: absolute;
        background: white;
        width: 80%;
        height: 80%;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: -10px 12px 14px 2px rgba(210,184,211,0.43);
        -webkit-box-shadow: -10px 12px 14px 2px rgba(210,184,211,0.43);
        -moz-box-shadow: -10px 12px 14px 2px rgba(210,184,211,0.43);
        transition: all .5s ease-in-out;
    }

    .modal{
        justify-content: space-evenly;
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

    .close{
        display: flex;
        width: 95%;
        justify-content: end;
        color: #A62929;
        font-size: 5.5vh;
        padding-top: 2%;
    }
    
    .icon-cross{
        cursor: pointer;
    }

    img{
        width: 100%;
    }

    .img-container{
        height: 30vh;
        width: 70vw;
        display: flex;
        /* align-items: flex-end; */
        justify-content: center;
    }

    .img-pencil{
        position: relative;
        font-size: 200%;
        color: #D2B8D3;
        align-self: flex-end;
        right: 2%;
        bottom: 10vmin;
        /* left: 92%;
        bottom: 8%; */
        height: max-content;
        cursor: pointer;
    }

    #playlistName{
        text-align: center;
        margin: 0;
    }

    #playlistName p{
        width: 100%;
        display: inline;
    }

    #playlistName span{
        margin-left: 2%;
        width: 100%;
    }

    button{
        display: block;
        width: fit-content;
        border: none;
        background-color: #000;
        opacity: 50%;
        color: white;
        border-radius: 5px;
        font-size: 100%;
        padding: 2%;
        margin-bottom: 2%;
        transition: all .5s ease-in-out;
    }

    button:hover{
        cursor: pointer;
        opacity: 100%;
    }

    .parent{
        display: flex;
        flex-direction: column;
        max-height: 70vh;
    }

    .songsContainer{
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .Song:last-of-type{
        margin-bottom: 0%;
    }

    .light{
        background-color: #D2B8D3;
    }

    .dark{
        background-color: #201C29;
        color: white;
    }

    .show{
        margin-top: 7%;
        display: flex;
        justify-content: center;
    }

    .show input{
        text-align: center;
        font-size:  4vmax !important;;
    }
    
</style>

<script>
    export default{
        name: "Modal"
    }
</script>

<script setup>
    import {Store} from "../store.js"
    import SongPart from '../components/SongPart.vue';
    const store = Store()
</script>