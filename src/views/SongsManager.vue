<template>
    <div class="app">
        <div class="span">
            <h1>{{store.texts[59][store.language]}}</h1>
            <router-link :to="{name: 'home'}" style="text-decoration: none;" @click="store.showSettings = true">
                <span class="icon-circle-left"></span>
            </router-link>
        </div>
        <div class="buttons">
            <button>Playlists</button>
            <button @click="store.add">
                <div>
                    {{store.texts[60][store.language]}} <span class="icon-plus"></span>
                </div>
            </button>
            <button>{{ store.texts[1][store.language] }}</button>
        </div>
        
        <h2 class="h2">{{store.texts[61][store.language]}}</h2>

        <div class="container">
            <div class="song">
                <div class="img-container">
                    <img src="https://www.sivola.it/media/cache/header/d3/66/b8ffeed5941a5701a69fc1c4a870.jpeg" alt="Img">
                    <span class="icon-pencil"></span>
                </div>
                <h2>Song</h2>
            </div>
            <div class="song">
                <div class="img-container">
                    <img src="https://www.sivola.it/media/cache/header/d3/66/b8ffeed5941a5701a69fc1c4a870.jpeg" alt="Img">
                    <span class="icon-pencil"></span>
                </div>
                <h2>Song</h2>
            </div>
            <div class="song">
                <div class="img-container">
                    <img src="https://www.sivola.it/media/cache/header/d3/66/b8ffeed5941a5701a69fc1c4a870.jpeg" alt="Img">
                    <span class="icon-pencil"></span>
                </div>
                <h2>Song</h2>
            </div>
            <div class="song">
                <div class="img-container">
                    <img src="https://www.sivola.it/media/cache/header/d3/66/b8ffeed5941a5701a69fc1c4a870.jpeg" alt="Img">
                    <span class="icon-pencil"></span>
                </div>
                <h2>Song</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
  import {Store} from "../store.js"
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
    }

    button{
        background-color: #000000;
        color: white;
        font-weight: bolder;
        padding: 10% 0;
        margin: 2%;
        width: 25vw;
        height: 5vh;
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

    .song{
        margin: 2%;
    }
    
    .img-container{
        height: 40vh;
        width: 40vh;
        display: flex;
        align-items: flex-end;
        justify-content: end;
    }
    
    img{
        border-radius: 15px;
        width:  -webkit-fill-available;
        height: 100%;
    }

    .icon-pencil{
        color: #D2B8D3;
        font-size: 50px;
        position: absolute;
        cursor: pointer;
    }

    @media screen and (min-width: 768px){
        button{
            width: 10vw;
        }        
    }
</style>