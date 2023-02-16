<template>
    <div class="app">
        <div class="span">
            <h1 style="margin-right: 2%;">Add Songs</h1>
            <router-link :to="{name: 'songs'}" style="text-decoration: none;" @click="store.showSettings = true">
                <span class="icon-circle-left"></span>
            </router-link>
        </div>
        <div id="upload">
            <div class="img-container">
                <img src="" alt="Img" hidden>
            </div>
            <span class="icon-cloud-upload"></span>
            <h1>Upload Image</h1>
        </div>
        <h1 contentEditable="true" id="songName">
            Song's name
            <span class="icon-pencil" v-if="store.showPencil"></span>
        </h1>
        <h3 contentEditable="true" id="artistName">
            Artist's name
            <span class="icon-pencil" v-if="store.showPencil"></span>
        </h3>
        <button class="uploadSong">
            Upload a song
            <span class="icon-cloud-upload"></span>
        </button>

        <input v-if="store.tablet" type="range" id="volumeRange" min="0" max="1" step="any" :style="{ backgroundSize: store.volumeSize, opacity: store.volumeOpacity, left: store.volumePosition, opacity: store.volumeOpacity}" @input="store.changeVolume" disabled>
        <ProgressBar></ProgressBar>

        <button class="submit">Upload song to public</button>
        <label class="several">
            <input type="checkbox" id="checkbox">
            <span  class="checkbox"></span>
            Add several songs
        </label>
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
        font-size: 1vmax;
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
    }

    .icon-cloud-upload{
        color: #D2B8D3;
    }

    #upload{
        display: grid;
        place-items: center;
        background-color: rgba(0, 0, 0, 0.15);
        padding: 2vh;
        cursor: pointer;
        height: 20vmax;
        width: 20vmax;
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
        font-size: 3vmax;
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
        font-size: 2vmax;
    }

    .submit:hover{
        background: #D2B8D3;
    }

    .several{
        margin-top: 7%;
        color: white;
        display: flex;
        align-items: center;
        cursor: pointer;
        width: 80%;
        font-size: large
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

    @media screen and (min-width: 768px){
        .several{
            margin: 0;
        }
    }
</style>