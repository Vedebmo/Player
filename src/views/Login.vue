<template>
    <div class="app">
        <div class="span">
            <router-link :to="{name: 'home'}" style="text-decoration: none;" @click="store.showSettings = true">
                <span class="icon-circle-left"></span>
            </router-link>
        </div>

        <div class="login">
            <div class="form">
                <div class="logo">
                    <img src="https://www.sivola.it/media/cache/header/d3/66/b8ffeed5941a5701a69fc1c4a870.jpeg" alt="Logo">
                </div>
                <h1>Log In</h1>
                <div class="inputs">
                    <div class="emailPart">
                        <input type="email" placeholder="Email" class="email">
                        <span class="icon-eye" style="opacity: 0;"></span>
                    </div>
                    <div class="passwordPart">
                        <input :type="store.passwordType" :placeholder="store.texts[5][store.language]">
                        <span class="icon-eye" v-if="!store.showPassword" @click="store.willShowPassword"></span>
                        <span class="icon-eye-blocked" v-if="store.showPassword" @click="store.willShowPassword"></span>
                    </div>
                </div>

                <a href="#" class="forgottenPassword">{{store.texts[6][store.language]}}</a>

                <div class="buttons">
                    <button class="loginBtn">{{store.texts[7][store.language]}}</button>
                    <br>
                    <button class="loginBtnGoogle">{{store.texts[8][store.language]}}
                        <span class="icon-google"></span>
                    </button>
                </div>

                <p class="signup">{{store.texts[9][store.language]}}</p>

                <button class="signupBtn">{{store.texts[10][store.language]}}</button>
            </div>
        </div>
    </div>
</template>
<script setup>
  import {Store} from "../store.js"
  const store = Store()
  store.returned = true

  store.checkLanguage()
</script>

<style src="@/assets/icomoon/style.css"></style>

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
    }

    .icon-circle-left{
        color: white;
        font-size: 5.5vh;
    }

    .login, .form{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 90%;
    }
    
    .login{
        flex-grow: 2;
        justify-content: center;
    }

    .form{
        flex-grow: 1;
        justify-content: space-evenly;
    }

    .logo{
        width: 40vw;
        height: 20vh;
    }

    img{
        width: 100%;
        height: 100%;
    }

    h1{
        color: white;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    a{
        text-decoration: none;
        margin: 2vh 0;
    }

    a:hover{
        text-decoration: underline;
    }

    .forgottenPassword{
        color: #0791E6;
    }

    .signup{
        color: white;
    }

    input{
        border: none;
        width: 70vw;
        font-size: 2.5vh;
        padding: 0.7% 2%;
    }
    
    input[type="email"]{
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
        height: 4vh;
        padding: 0;
    }

    .loginBtnGoogle:hover{
        background: #851e1e;
    }

    .signupBtn{
        color: white;
        display: block;
        padding: 1% 2%;
        font-size: 4vh;
        cursor: pointer;
        border: #D2B8D3 2px solid;
        background: none;
        transition: .3s;
    }

    .signupBtn:hover{
        background: #D2B8D3;
    }
</style>