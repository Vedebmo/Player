<template>
  <header>

    <!--Song-->

    <audio :src="store.songsReferences[store.songIndex]" id="song"></audio>

    <Sidebar v-if="store.showSettings" style="background:none;margin: 0; height: 92vh;"></Sidebar>
    <div class="playing" v-if="!store.showSettings">

      <!--Image-->

      <div class="img-container">
        <span v-if="store.tablet" @click="store.rollDice" id="dice" class="icon-dice"></span>
        <img :src="store.songsImages[store.songIndexA]" id="img" alt="Image not found" :style="{opacity: store.fade2}" class="absolute">
        <img :src="store.songsImages[store.songIndexB]" id="img2" alt="Image not found" class="absolute2" :style="{opacity: store.fade}">
      </div>

      <!--Titles-->

      <div class="titles">
        <h1><b>{{store.songsNames[store.songIndex]}}</b></h1>
        <h5><small>{{store.artists[store.songIndex]}}</small></h5>
      </div>
  
      <!--Options-->

      <div class="options">
        <div class="left" @mouseleave="store.changeVolume('Out')" @touchend="store.changeVolume('Out')">
          <span class="icon-download" @click="store.downloadSong"></span>
          <span class="icon-plus"></span>
          <!-- <span class="icon-volume-high" id="volume" @mouseenter="store.volumeOpacity = 1"  @touchstart="store.volumeOpacity = 1"></span> -->
          <span class="icon-volume-high" id="volume" @mouseenter="store.changeVolume('In')"  @touchstart="store.changeVolume('In')"></span>
          <input type="range" id="volumeRange" v-model="store.volume" min="0" max="1" step="0.05" :style="{ backgroundSize: store.volumeSize, opacity: store.volumeOpacity, left: store.volumePosition, opacity: store.volumeOpacity}" @input="store.changeVolume" disabled>
        </div>
        <div class="right">
          <h5>{{store.songCurrent}} / {{store.songDuration}}</h5>
        </div>
      </div>

      <!--Bars-->

      <ProgressBar></ProgressBar>
      <Lowerbar v-if="!store.tablet"></Lowerbar>
    </div>

    <Sidebar v-if="store.tablet"></Sidebar>
  </header>

</template>
  
<style src="@/assets/icomoon/style.css"></style>

<style scoped>
  .none{
    display: none;
  }

  .playing{
    display: flex;
    flex-direction: column;
  }

  .img-container{
    margin-top: 3%;
  }

  img{
    width: 100%;
    z-index: 0;
    transition: opacity 0.5s;
    height: 50vh;
  }

  .absolute{
    position: initial;
  }

  .absolute2{
    position: absolute;
    width: 0%;
  }

  h1, h5{
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin: 0;
    text-align: center;
    color: white;
  }

  h5{
    margin-top: 1%;
    font-weight: lighter;
  }

  .options{
    display: inline-flex;
    height: 3vh;
    width: 80%;
    margin: 0.5em 10% 0 10%;
  }

  .right, .left{
    display: flex;
    place-items: center;
    flex-grow: 1;
    height: 100%;
  }
  
  .right{
    flex-direction: row-reverse;
  }

  .left span{
    color: white;
    margin: 0 7% 0 0;
  }

  .right h5{
    color: #E2E2E2;
    margin-top: 1em;
  }

  span:hover{
    cursor: pointer;
  }
  
  .icon-dice{
    position: relative;
    z-index: 1;
    left: calc(100% - 1.5em);
    top: 1em;
    background: white;
    padding: .5em;
    border: solid 3px black;
    border-radius: 50%;
  }

  .icon-download:hover, .icon-plus:hover{
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

  #volumeRange{
    position: relative;
    transition: opacity .3s;
  }

  @media screen and (min-width: 768px){
    header{
      display: flex;
    }

    .playing{
      height: auto;
      justify-content: space-between;
      flex-grow: 12;
      margin: 0 2%;
    }

    .img-container{
      margin-top: .5em ;
    }
  }
</style>

<script>

  import ProgressBar from '../components/ProgressBar.vue';
  import Lowerbar from '../components/Lowerbar.vue';
  import Sidebar from '../components/Sidebar.vue';

  export default{
    name: "Playing",
    components: {
        ProgressBar, Lowerbar, Sidebar
    }
  }
</script>

<script setup>
  import {Store} from "../store.js"

  const store = Store()
  
  store.changeTablet()
  store.checkLanguage()
  
  window.addEventListener('resize',store.changeTablet)
</script>