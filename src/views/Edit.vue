<template>
    <div class="span">
            <router-link :to="{name: 'account'}" style="text-decoration: none;" @click="store.showSettings = true">
                <span class="icon-circle-left"></span>
            </router-link>
        </div>
    <div class="app">
        <div class="left" v-if="store.tablet">
            <div class="img-container">
                <img :src="store.userImage" :alt="store.texts[14][store.language]" referrerpolicy="no-referrer">
                <div class="camera">
                    <span class="icon-camera"></span>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="img-container" v-if="!store.tablet">
                <img :src="store.userImage" :alt="store.texts[14][store.language]" referrerpolicy="no-referrer">
                <div class="camera">
                    <span class="icon-camera"></span>
                </div>
            </div>
            <h1 v-if="store.loggedIn" contentEditable="true" @focusin="store.editDisplayName('In')" @focusout="store.editDisplayName" id="nickname">
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
            <button class="btn save" @click="store.launchModal('edit')">
                {{store.texts[19][store.language]}}
            </button>
            <router-link :to="{name: 'account'}" style="text-decoration: none;" @click="store.showSettings = true"  class="btn cancel">
                <button class="btn">
                    {{store.texts[20][store.language]}}
                </button>
            </router-link>
        </div>

        <!-- Modal -->

        <div class="modal" :style="{opacity: store.modalOpacity, left: store.modalPosition}">
            
            <!-- Ask for credentials part -->
                
            <div class="credentials" >
                <div class="close">
                    <span class="icon-cross" @click="store.launchModal"></span>
                </div>
                <h1>{{ store.texts[41][store.language] }}</h1>
                <div class="inputs">
                    <div class="emailPart">
                        <input type="email" :placeholder="store.texts[42][store.language]" class="email" id="email">
                        <span class="icon-eye" style="position: relative; opacity: 0; left: 100vw;"></span>
                    </div>
                    <div class="passwordPart">
                        <input :type="store.passwordType" :placeholder="store.texts[43][store.language]" id="password">
                        <span class="icon-eye" v-if="!store.showPassword" @click="store.willShowPassword"></span>
                        <span class="icon-eye-blocked" v-if="store.showPassword" @click="store.willShowPassword"></span>
                    </div>
                </div>

                <div class="buttons">
                    <button class="loginBtn" @click="store.getCredentials(['email', 'update'])">{{store.texts[7][store.language]}}</button>
                    <br>
                    <button class="loginBtnGoogle" @click="store.getCredentials(['google', 'update'])">
                        {{store.texts[8][store.language]}}
                        <span class="icon-google"></span>
                    </button>
                </div>
            </div>
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

    .right h1{
        color: white;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    .right h1:hover{
        cursor: pointer;
        text-decoration: underline solid white 2px;
    }

    .right h1:focus{
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
        padding-top: 2%;
    }
    
    .modal h1{
        font-size: 3vw;
        color: #8B8181;
    }
    
    .icon-cross{
        cursor: pointer;
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