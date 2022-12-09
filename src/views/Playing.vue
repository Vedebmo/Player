<template>
  <header>
    <Sidebar v-if="store.showSettings" style="background:none;margin: 0; height: 92vh;"></Sidebar>
    <div class="playing" v-if="!store.showSettings">
      <!--Image-->
      
      <div class="img-container">
        <span v-if="store.tablet" class="icon-dice"></span>
        <!-- <img src="@/assets/orgullo.png" alt="Image not found"> -->
        <img :src="store.image" alt="Image not found">
      </div>
  
      <!--Titles-->
  
      <div class="titles">
        <h1><b>Orgullo</b></h1>
        <h5><small>C Monti</small></h5>
      </div>
  
      <!--Options-->
  
      <div class="options">
        <div class="left">
          <span class="icon-download"></span>
          <span class="icon-plus"></span>
          <span class="icon-heart"></span>
          <span class="icon-volume-medium"></span>
        </div>
        <div class="right">
          <h5>{{store.songCurrent}} / {{store.songDuration}}</h5>
        </div>
      </div>
  
      <!--Song-->
      <audio :src="store.song" id="song"></audio>
      
      <!--Bars-->
      <ProgressBar></ProgressBar>
      <Lowerbar v-if="!store.tablet"></Lowerbar>
    </div>

    <Sidebar v-if="store.tablet"></Sidebar>
  </header>

</template>
  
<style src="@/assets/icomoon/style.css"></style>

<style scoped>

  .playing{
    height: 92vh;
    display: flex;
    flex-direction: column;
  }
  .img-container{
      margin-top: 7%;
  }

  img{
    width: 100%;
    max-height: 55vh;
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
    left: calc(100% - 1.5em);
    top: 1em;
    background: white;
    padding: .5em;
    border: solid 3px black;
    border-radius: 50%;
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

  window.addEventListener('resize',store.changeTablet)
</script>