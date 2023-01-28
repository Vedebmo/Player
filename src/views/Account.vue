<template>
    <div class="span">
            <router-link :to="{name: 'home'}" style="text-decoration: none;" @click="store.showSettings = true">
                <span class="icon-circle-left"></span>
            </router-link>
        </div>
    <div class="app">

        <!-- Modal -->

        <div class="modal" :style="{opacity: store.modalOpacity, left: store.modalPosition}">
            <div class="close" v-if="!store.lookForCredentials">
                <span class="icon-cross" @click="store.launchModal"></span>
            </div>
            <h1 v-if="!store.lookForCredentials">{{store.texts[31][store.language]}}</h1>
            <p v-if="!store.lookForCredentials">{{store.texts[32][store.language]}}</p>
            <div class="buttons" v-if="!store.lookForCredentials">
                <button class="no" @click="store.launchModal">{{store.texts[33][store.language]}}</button>
                <button class="yes" @click="store.lookForCredentials = true">{{store.texts[34][store.language]}}</button>
            </div>
            
            
            <!-- Ask for credentials part -->
            
            <div class="credentials" v-if="store.lookForCredentials">
                <div class="close">
                    <span class="icon-circle-left" @click="store.lookForCredentials = false"></span>
                    <span class="icon-cross" @click="store.launchModal"></span>
                </div>
                <h1>{{ store.texts[35][store.language] }}</h1>
                <div class="inputs">
                    <div class="emailPart">
                        <input type="email" placeholder="Email" class="email" id="email">
                        <span class="icon-eye" style="position: relative; opacity: 0; left: 100vw;"></span>
                    </div>
                    <div class="passwordPart">
                        <input :type="store.passwordType" :placeholder="store.texts[5][store.language]" id="password">
                        <span class="icon-eye" v-if="!store.showPassword" @click="store.willShowPassword"></span>
                        <span class="icon-eye-blocked" v-if="store.showPassword" @click="store.willShowPassword"></span>
                    </div>
                </div>

                <div class="buttons">
                    <button class="loginBtn" @click="store.getCredentials(['email', 'delete'])">{{store.texts[7][store.language]}}</button>
                    <br>
                    <button class="loginBtnGoogle" @click="store.getCredentials(['google', 'delete'])">
                        {{store.texts[8][store.language]}}
                        <span class="icon-google"></span>
                    </button>
                </div>
            </div>
        </div>


        <div class="left" v-if="store.tablet">
            <div class="img-container">
                <img :src="store.userImage" :alt="store.texts[14][store.language]" referrerpolicy="no-referrer">
            </div>
        </div>
        <div class="right">
            <div class="img-container" v-if="!store.tablet">
                <img :src="store.userImage" :alt="store.texts[14][store.language]" referrerpolicy="no-referrer">
            </div>
            <h1 v-if="store.loggedIn">{{ store.user.displayName }}</h1>
            <input v-if="store.loggedIn" type="email" :placeholder="store.user.email" class="email" disabled>
            <router-link :to="{name: 'edit'}" style="text-decoration: none;" @click="store.showSettings = true" class="btn edit">
                {{store.texts[15][store.language]}}
                <span class="icon-pencil"></span>
            </router-link>
            <button class="btn logout" @click="store.logout">{{store.texts[16][store.language]}}</button>
            <button class="btn delete" @click="store.launchModal">
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
        width: 70%;
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
        max-width: 45%;
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
    }
    
    img{
        border-radius: 50%;
        height: 100%;
        width: 100%;
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
        border: none;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        cursor: pointer;
        font-size: large;
        transition: all .3s ease-in;
        margin: 2vh 0;
        padding: 1.5% 2%;
        color: white;
        width: 60%;
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

        transition: opacity .5s ease-in-out;
    }

    .close{
        display: flex;
        width: 95%;
        justify-content: end;
        color: #A62929;
        font-size: 5.5vh;
    }
    
    .icon-cross{
        cursor: pointer;
    }

    .modal h1{
        font-size: 3vw;
        color: #8B8181;
    }

    .modal p{
        padding: 0 5%;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    .buttons{
        display: flex;
        align-items: center;
        height: 40%;
        width: 100%;
        justify-content: space-evenly;
        flex-direction: column;
    }
    .modal button{
        border: none;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        cursor: pointer;
        font-size: large;
        transition: all .3s ease-in;
        width: 75%;
        padding: 1.5% 2%;
    }

    .no{
        color: black;
        background: #D2B8D3;
    }
    .no:hover{
        background: #a48ba5;
    }

    .yes{
        color: white;
        background: #A62929;
    }

    .yes:hover{
        background: #812222;
    }

    .modal .icon-circle-left{
        color: #8B8181;
        margin-right: 2%;
        cursor: pointer;
    }

    .credentials{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        margin-bottom: 4%;
        align-items: center;
        justify-content: space-evenly;
    }

    .credentials h1{
        font-size: 2.5vw;
        display: flex;
    }

    .credentials input{
        border: solid 3px black;
        width: 70vw;
        font-size: 2.5vh;
        padding: 0.7% 2%;
    }
    
    .credentials input[type="email"]{
        margin-bottom: 1.5vh;
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

    .loginBtn, .loginBtnGoogle{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: white;
        display: block;
        width: 10rem;
        cursor: pointer;
        border: none;
        padding: .5rem;
        margin: auto;
        transition: .3s;
    }

    .loginBtn{
        background: #D2B8D3;
        font-size: 150%;
    }

    .loginBtn:hover{
        background: #a48ba5;
    }

    .loginBtnGoogle{
        background: #A62929;
        padding: 0;
    }

    .loginBtnGoogle:hover{
        background: #851e1e;
    }

    @media screen and (min-width: 768px){
    .img-container{
        height: 75%;
        max-width: 75%;
    }

    .buttons{
        flex-direction: row;
    }

    .modal button{
        width: 35%;
        height: inherit;
    }
  }
</style>