<template>
    <div class="app">
      <div class="span">
            <h1>Playlists</h1>
            <router-link :to="{name: 'songs'}" style="text-decoration: none;" @click="store.showSettings = true">
                <span class="icon-circle-left"></span>
            </router-link>
        </div>

        <div class="buttons">
            <button @click="store.playlistManager()">{{ store.texts[83][store.language] }}</button>
            <button @click="">
                <div>
                    {{store.texts[1][store.language]}}
                </div>
            </button>
        </div>
 
        <div class="container">
            <div class="playlist" v-for="n in 10"> 
                <div class="img-container">
                  <span class="icon-bin2"></span>
                    <img src="https://media.npr.org/assets/img/2023/09/22/gettyimages-1250380030_slide-b7fd7fe615d89250cc78d56d4715c5af94355909-s800-c85.webp" alt="Img">
                  <span class="icon-pencil"></span>
                </div>
                <h2>xd</h2>
            </div>
        </div>
        <Modal></Modal>
    </div>
</template>

<script setup>
  
  import {Store} from "../store.js"
  import Modal from '../components/Modal.vue';
  const store = Store()
  store.returned = true

  store.changeTablet()
  store.checkLanguage()
  store.findAuth()
  store.activateScrollbar()

  window.addEventListener('resize',store.changeTablet)
</script>

<style scoped>
  .app{
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .span{
    display: flex;
    width: 90%;
    justify-content: end;
    align-items: center;
  }

  .h2{
    width: 90%;
  }

  h1,h2,h4{
    color: white;
    width: -webkit-fill-available;
  }

  .icon-circle-left{
    color: white;
    font-size: 5.5vh;
  }

  .buttons{
    display: flex;
    width: 90%;
    min-height: 20vh;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    /* gap: 10vw; */
  }

  button{
    background-color: #000000;
    color: white;
    font-weight: bolder;
    padding: 3% 10%;
    margin: 2%;
    /* width: 25vw; */
    height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    cursor: pointer;
    transition: all .5s;
    border: none;
    border-radius: 5px;
  }
    
  button:hover{
    background-color: #D2B8D3;
  }

  .container{
    width: 90%;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit,minmax(40vh,1fr));
    place-items: center;
  }

  .playlist{
    margin: 2%;
  }
  
  .img-container{
    height: 40vh;
    width: 40vh;
    display: flex;
    /* align-items: flex-end; */
    justify-content: center;
  }
  
  img{
    border-radius: 15px;
    width:  -webkit-fill-available;
    height: 100%;
  }

  span{
    font-size: 280%;
    position: relative;
  }

  span:hover{
    cursor: pointer;
  }

  .icon-bin2{
    color: #A62929;
    z-index: 1;
    left: 15%;
    top: 80%;
    height: max-content;
  }

  .icon-pencil{
    color: #D2B8D3;
    right: 15%;
    top: 80%;
    height: max-content;
  }

  @media screen and (min-width: 768px){
    button{
        width: 10vw;
    }        
  }
</style>