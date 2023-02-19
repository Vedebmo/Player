<template>
    <div class="app">

        <audio :src="store.audioUpload" id="song"></audio>
        
        <div class="span">
            <h1 style="margin-right: 2%;">{{store.texts[63][store.language]}}</h1>
            <router-link :to="{name: 'songs'}" style="text-decoration: none;" @click="store.showSettings = true">
                <span class="icon-circle-left"></span>
            </router-link>
        </div>
        <div id="upload" @click="store.requestFile('img')">
            <div class="img-container">
                <img :src="store.imgUpload" alt="Img" id="img" hidden>
                <p id="change" hidden>{{store.texts[65][store.language]}}</p>
            </div>
            <div id="toUpload">
                <span class="icon-cloud-upload"></span>
                <h1>{{store.texts[64][store.language]}}</h1>
            </div>
        </div>
        <h1 contentEditable="true" id="songName" @focusin="store.editName('In')" @focusout="store.editName">
            {{store.texts[66][store.language]}}
            <span class="icon-pencil" v-if="store.showPencil"></span>
        </h1>
        <h3 contentEditable="true" id="artistName" @focusin="store.editName('In')" @focusout="store.editName">
            {{store.texts[67][store.language]}}
            <span class="icon-pencil" v-if="store.showPencil"></span>
        </h3>

        <div class="parent">
            <div style="width: 80vw; position: absolute; z-index: 1;">
                <button class="uploadSong" @click="store.requestFile">
                    {{store.texts[68][store.language]}}
                    <span class="icon-cloud-upload"></span>
                </button>
            </div>

            <div class="volumeParent" @mouseleave="store.changeVolume('Out')" @touchend="store.changeVolume('Out')" v-if="store.tablet">
                <span class="icon-volume-high" id="volume" @mouseenter="store.changeVolume('In')"  @touchstart="store.changeVolume('In')" @click="store.changeVolume('Previous')"></span>
                <input type="range" id="volumeRange" min="0" max="1" step="any" :style="{ backgroundSize: store.volumeSize, opacity: store.volumeOpacity, left: store.volumePosition, opacity: store.volumeOpacity}" @input="store.changeVolume" disabled>
            </div>

            <div v-else><br><br></div>
        </div>

        <ProgressBar></ProgressBar>

        <button class="submit" @click="store.uploadSong">{{store.texts[69][store.language]}}</button>
        <div class="severalParent">
            <label class="several">
                <input type="checkbox" id="checkbox">
                <span  class="checkbox"></span>
                {{store.texts[70][store.language]}}
            </label>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
    import ProgressBar from '../components/ProgressBar.vue';
</script>

<script setup>
  import {Store} from "../store.js"
  const store = Store()
  store.returned = true

  store.changeTablet()
  store.checkLanguage()
  store.findAuth()

  window.addEventListener('resize',store.changeTablet)
</script>

<style>
    .app{
        font-size: 1.2vmax;
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .span{
        display: flex;
        width: 90%;
        justify-content: end;
        align-items: center;
    }

    .span h1{
        width: -webkit-fill-available;
        font-size: x-large;
    }

    .icon-circle-left{
        color: white;
        font-size: 5.5vh;
    }

    h1,h3{
        color: white;
        margin: .5% 0%;
    }

    .icon-cloud-upload{
        color: #D2B8D3;
    }

    img{
        width: 100%;
        height: 100%;
        transition: all .3s ease;
    }

    #upload:hover img{
        opacity: 0.5;
    }
    
    #upload:hover #change{
        opacity: 1;
    }

    #change{
        opacity: 0;
        transition: all .3s ease;
        position: relative;
        bottom: 70%;
        color: white;
        font-size: 5vh;
    }

    .parent{
        display: flex;
        flex-direction: row-reverse;
        width: 80%;
        justify-content: start;
    }

    #upload{
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.15);
        cursor: pointer;
        width: 80%;
        min-height: 40vh;
        text-align: center;
    }

    #upload:hover{
        background-color: rgba(0, 0, 0, 0.5);
    }

    #upload h1{
        margin: 0;
        font-size: 1.5rem;
    }

    #upload .icon-cloud-upload{
        font-size: 4rem;
    }
    
    .uploadSong{
        border: none;
        color: #8B8181;
        background: white;
        cursor: pointer;
        transition: all .3s;
        display: flex;
        align-items: center;
        margin: auto;
        padding: 1%;
    }

    .uploadSong:hover{
        background: #bbbbbb;
        color: #525151;
    }

    .uploadSong:hover .icon-cloud-upload{
        color: #b097b1;
    }

    .submit{
        width: max-content !important;
        padding: 0% 10%;
        background: none;
        border: 1.5px solid #D2B8D3;
        width: 25%;
        cursor: pointer;
        transition: all .3s;
        color: white;
        /* font-size: 2vmax; */
    }

    .submit:hover{
        background: #D2B8D3;
    }

    .severalParent{
        width: 80%;
        display: flex;
        align-items: center;
    }

    .several{
        margin-top: 7%;
        align-items: center;
        display: flex;
        color: white;
        cursor: pointer;
        font-size: large;
    }

    input[type="checkbox"]{
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkbox{
        border: #D2B8D3 solid 1.5px;
        height: 25px;
        width: 25px;
        border-radius: 5px;
        margin-right: 7px;
    }

    .checkbox:hover{
        background: rgba(0, 0, 0, 0.15);
    }

    input:checked ~ .checkbox {
        background-color: #D2B8D3;
    }


    .checkbox:after {
        content: "";
        position: relative;
        display: none;
    }

    input:checked ~ .checkbox:after {
        display: block;
    }

    .checkbox:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .volumeParent{
        z-index: 2;
        display: flex;
        place-items: center;
    }

    .lefted{
        display: flex;
        place-items: center;
        width: 80%;
    }

    #volume{
        color: white;
        margin: 0 15% 0 0;
        font-size: 2em;
    }

    #volume:hover{
        cursor: pointer;
    }

    #volumeRange{
        position: relative;
        transition: opacity .3s;
    }

    #volume:hover{
        color: #aaaaaa;
    }

    input[type="range"] {
        margin-left: -.5rem;
        appearance: none;
        width: 80%;
        height: 4px;
        background: #66757F;
        border-radius: 5px;
        background-image: linear-gradient(white, white);
        background-repeat: no-repeat;
    }

    input[type="range"]:hover{
        cursor: pointer;
    }

    input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background: white;
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

    @media screen and (min-width: 768px){
        .several{
            margin: 0;
        }
    }
</style>