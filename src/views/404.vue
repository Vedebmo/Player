<template>
    <div class="app">
        <div class="login">
            <div class="form">
                <div class="firtsPart">
                    <div class="logo">
                        <img src="https://www.sivola.it/media/cache/header/d3/66/b8ffeed5941a5701a69fc1c4a870.jpeg" alt="Logo">
                    </div>
                    <h1>{{store.texts[55][store.language]}}</h1>
                    <p>{{store.texts[56][store.language]}}</p>
                </div>
                <router-link :to="{name: 'login'}" style="text-decoration: none;">
                    <button class="loginBtn">{{store.texts[57][store.language]}}</button>
                    <br>
                </router-link>
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

    h1, p{
        color: white;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    input{
        border: none;
        width: 70vw;
        font-size: 2.5vh;
        padding: 0.7% 2%;
    }

    .loginBtn{
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        color: white;
        display: block;
        width: 15rem;
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

    .firtsPart{
        display: grid;
        place-items: center;
    }

</style>