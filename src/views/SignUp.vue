<template>
    <div class="app">
        <div class="loginParent">
            <div class="sidepart" v-if="store.tablet">
                    <div class="img-container">
                        <img src="@/assets/musicBoy.png" alt="Img">
                    </div>
                    <h1>PlayMax</h1>
                    <p>{{store.texts[58][store.language]}}</p>
            </div>
            <div class="login">
                <div class="span">
                    <router-link :to="{name: 'login'}" style="text-decoration: none;">
                        <span class="icon-circle-left"></span>
                    </router-link>
                </div>
                <div class="form">
                    <div class="logo">
                        <img src="https://www.sivola.it/media/cache/header/d3/66/b8ffeed5941a5701a69fc1c4a870.jpeg" alt="Logo">
                    </div>
                    <h1>{{store.texts[25][store.language]}}</h1>
                    <div class="inputs">
                        <div class="nickPart">
                            <input type="text" placeholder="Nickname" id="nickname">
                            <span class="icon-eye" style="position: relative; opacity: 0; left: 100vw;"></span>
                        </div>
                        <div class="emailPart">
                            <input type="email" placeholder="Email" id="email">
                            <span class="icon-eye" style="position: relative; opacity: 0; left: 100vw;"></span>
                        </div>
                        <div class="passwordPart">
                            <input :type="store.passwordType" :placeholder="store.texts[5][store.language]" id="password">
                            <span class="icon-eye" v-if="!store.showPassword" @click="store.willShowPassword"></span>
                            <span class="icon-eye-blocked" v-if="store.showPassword" @click="store.willShowPassword"></span>
                        </div>
                        <div class="passwordPart">
                            <input :type="store.passwordType" :placeholder="store.texts[21][store.language]" id="Confirmpassword">
                            <span class="icon-eye" v-if="!store.showPassword" @click="store.willShowPassword"></span>
                            <span class="icon-eye-blocked" v-if="store.showPassword" @click="store.willShowPassword"></span>
                        </div>
                    </div>
    
                    <a href="/login" class="login">{{store.texts[27][store.language]}}</a>
    
                    <div class="buttons">
                        <button class="signUp" @click="store.signUp">{{store.texts[25][store.language]}}</button>
                        <br>
                        <button class="signUpGoogle" @click="store.loginGoogle">
                            {{store.texts[26][store.language]}}
                            <span class="icon-google"></span>
                        </button>
                    </div>
                </div>
                <br>
                <br>
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
  store.checkAuth()
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

    .loginParent{
        height: -webkit-fill-available;
        width: -webkit-fill-available;
        display: flex;
        align-items: center;
    }

    .sidepart{
        width: 50vw;
        margin: 5%;
        text-align: justify;
    }

    .img-container{
        height: 55vh;
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

    h1,p{
        color: white;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    a{
        text-decoration: none;
        margin: 2vh 0 4vh;
    }

    a:hover{
        text-decoration: underline;
    }

    .login{
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
        margin: 1% 0;
    }
    
    .inputs{
        display: flex;
        flex-direction: column;
        height: -webkit-fill-available;
        justify-content: space-evenly;
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

    .passwordPart, .emailPart, .nickPart{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: relative;
        left: 2vh;
    }

    .signUp, .signUpGoogle{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: white;
        display: block;
        cursor: pointer;
        border: none;
        padding: .5rem;
        margin: auto;
        transition: .3s;
    }

    .signUp{
        background: #D2B8D3;
        font-size: 150%;
    }

    .signUp:hover{
        background: #a48ba5;
    }

    .signUpGoogle{
        background: #A62929;
        height: 4vh;
        padding: revert;
    }

    .signUpGoogle:hover{
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

    @media screen and (min-width: 768px){
        .app{
            height: 100vh;
        }
        .logo{
            width: 80%;
        }

        .login{
            background: rgba(0, 0, 0, 0.15);
            padding: 2%;
            margin: 2%;
            width: auto;
        }

        .login h1{
            font-size: x-large;
        }

        input{
            width: auto;
            margin: 3% 0;
        }

        .icon-eye, .icon-eye-blocked{
            left: -2rem;
        }
    }
</style>