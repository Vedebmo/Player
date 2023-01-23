<template>
    <div class="span">
            <router-link :to="{name: 'account'}" style="text-decoration: none;" @click="store.showSettings = true">
                <span class="icon-circle-left"></span>
            </router-link>
        </div>
    <div class="app">
        <div class="left" v-if="store.tablet">
            <div class="img-container">
                <img :src="store.userImage" :alt="store.texts[14][store.language]">
                <div class="camera">
                    <span class="icon-camera"></span>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="img-container" v-if="!store.tablet">
                <img :src="store.userImage" :alt="store.texts[14][store.language]">
                <div class="camera">
                    <span class="icon-camera"></span>
                </div>
            </div>
            <h1 v-if="store.loggedIn" contentEditable="true" @focusin="store.editDisplayName('In')" @focusout="store.editDisplayName">
                {{ store.user.displayName }} 
                <span class="icon-pencil" v-if="store.showPencil"></span>
            </h1>
            <div class="emailPart" v-if="store.loggedIn">
                <input type="email" :placeholder="store.user.email" class="email" id="newEmail">
                <span class="icon-eye" style="position: relative; opacity: 0; left: 100vw;"></span>
            </div>
            <div class="passwordPart">
                <input :type="store.passwordType" :placeholder="store.texts[39][store.language]" id="newPassword">
                <span class="icon-eye" v-if="!store.showPassword" @click="store.willShowPassword"></span>
                <span class="icon-eye-blocked" v-if="store.showPassword" @click="store.willShowPassword"></span>
            </div>
            <div class="passwordPart">
                <input :type="store.passwordType" :placeholder="store.texts[40][store.language]" id="newPassword2">
                <span class="icon-eye" v-if="!store.showPassword" @click="store.willShowPassword"></span>
                <span class="icon-eye-blocked" v-if="store.showPassword" @click="store.willShowPassword"></span>
            </div>
            <button class="btn save" @click="saveEdit">
                {{store.texts[19][store.language]}}
            </button>
            <router-link :to="{name: 'account'}" style="text-decoration: none;" @click="store.showSettings = true"  class="btn cancel">
                <button class="btn">
                    {{store.texts[20][store.language]}}
                </button>
            </router-link>
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
        height: 80vh;
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
        width: -webkit-fill-available;
        flex-direction: column;
        align-items: center;
        height: -webkit-fill-available;
        justify-content: space-evenly;
        font-size: 2.5vh;
    }

    .img-container{
        height: 35%;
        width: 45%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
    
    img{
        border-radius: 50%;
        height: 100%;
    }

    h1{
        color: white;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    h1:hover{
        cursor: pointer;
        text-decoration: underline solid white 2px;
    }

    h1:focus{
        cursor: text;
        text-decoration: none;
    }

    input{
        background-color: white;
        width: 75%;
        border: none;
        padding: 1.5% 2%;
        font-size: 2.5vh;
        margin: 1.5% 0;
    }

    .btn{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        border: none;
        font-size: large;
        margin: 2vh 0;
        padding: 1.5% 2%;
        color: white;
        cursor: pointer;
        transition: all .3s ease-in;
        background: none;
    }
    
    .save{
        width: 40%;
        margin-top: 4vh;
        color: white;
        background: #D2B8D3;
    }

    .save:hover{
        background: #a48ba5;
    }

    .icon-eye, .icon-eye-blocked{
        font-size: 3.5vh;
        position: relative;
        left: -3.5rem;
        color: #8B8181;
        padding: .3%;
        border-radius: 50%;
        cursor: pointer;
    }
    
    .icon-eye:hover, .icon-eye-blocked:hover{
        background: rgba(0, 0, 0, 0.15);
    }

    .passwordPart, .emailPart{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
        left: 2vh;
    }

    .cancel{
        background-color: #A62929;
        width: 60%;
        height: 5%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .cancel:hover{
        background-color: #812222;
    }

    .camera{
        background: #201C29;
        border: #D2B8D3 6px solid;
        color: #D2B8D3;
        border-radius: 50%;
        padding: 20px;
        position: absolute;
        left: 50%;
        font-size: 30px;
        cursor: pointer;
        transition: all .3s ease-in;
    }

    .camera:hover{
        background: #D2B8D3;
        color: #201C29;
    }
    
    @media screen and (min-width: 768px){
        .img-container{
            height: 75%;
            width: 75%;
    }

    .camera{
        padding: 30px;
        font-size: 50px;
        position: absolute;
        left: 15rem;
    }

  }
</style>