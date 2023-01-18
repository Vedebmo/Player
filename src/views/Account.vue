<template>
    <div class="span">
            <router-link :to="{name: 'home'}" style="text-decoration: none;" @click="store.showSettings = true">
                <span class="icon-circle-left"></span>
            </router-link>
        </div>
    <div class="app">
        <div class="left" v-if="store.tablet">
            <div class="img-container">
                <img :src="store.userImage" :alt="store.texts[14][store.language]">
            </div>
        </div>
        <div class="right">
            <div class="img-container" v-if="!store.tablet">
                <img :src="store.userImage" :alt="store.texts[14][store.language]">
            </div>
            <h1 v-if="store.loggedIn">{{ store.user.displayName }}</h1>
            <input v-if="store.loggedIn" type="email" :placeholder="store.user.email" class="email" disabled>
            <router-link :to="{name: 'edit'}" style="text-decoration: none;" @click="store.showSettings = true" class="btn edit">
                {{store.texts[15][store.language]}}
                <span class="icon-pencil"></span>
            </router-link>
            <button class="btn logout" @click="store.logout()">{{store.texts[16][store.language]}}</button>
            <button class="btn delete">
                {{store.texts[17][store.language]}}
                <span class="icon-bin2"></span>
            </button>
        </div>
    </div>
</template>

<script setup>
    import {Store} from "../store.js"
    const store = Store()
    store.changeTablet()
    store.checkLanguage()
    store.findAuth()

    window.addEventListener('resize',store.changeTablet)
</script>

<style src="@/assets/icomoon/style.css"></style>

<style scoped>
    .app{
        height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .span{
        margin-top: 5vh;
        display: flex;
        width: 90%;
        justify-content: end;
    }

    .icon-circle-left{
        color: white;
        font-size: 5.5vh;
    }

    .left{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: -webkit-fill-available;
        width: 50%;
    }

    .right{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: -webkit-fill-available;
        justify-content: space-evenly;
        font-size: 2.5vh;
    }

    .img-container{
        height: 35%;
        width: 45%;
    }
    
    img{
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }

    h1{
        color: white;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    input{
        background-color: white;
        width: 75%;
        border: none;
        padding: 1.5% 2%;
        font-size: 2.5vh;
    }

    .btn{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        border: none;
        font-size: large;
        margin: 2vh 0;
        padding: 1.5% 2%;
        color: white;
        cursor: pointer;
        width: 60%;
        transition: all .3s ease-in;
    }
    
    .edit{
        margin-top: 4vh;
        color: #8B8181;
        background: white;
        text-align: center;
    }

    .edit:hover{
        background: #bbbbbb;
        color: #727070;
    }

    .logout{
        background: #D2B8D3;
        width: 25%;
    }

    .logout:hover{
        background: #a48ba5;
    }
    
    .delete{
        background: none;
        border: 2px solid #A62929;
    }

    .delete:hover{
        background: #A62929;
    }

    @media screen and (min-width: 768px){
    .img-container{
        height: 75%;
        width: 75%;
    }
  }
</style>