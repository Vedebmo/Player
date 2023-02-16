<template>
    <div>
        <div class="span">
            <router-link :to="{name: 'home'}" style="text-decoration: none;" @click="store.showSettings = true">
                <span class="icon-circle-left"></span>
            </router-link>
        </div>
        
        <div class="options">
            <div class="optionDivs" @click="store.changeLanguage(0)" id="usa">
                <img src="@/assets/united.png" :alt="store.texts[13][store.language][0]">
                <p>English</p>
            </div>
            <hr>
            <div class="optionDivs" @click="store.changeLanguage(1)" id="spain">
                <img src="@/assets/spain.png" :alt="store.texts[13][store.language][1]">
                <p>Español</p>
            </div>
            <hr>
            <div class="optionDivs" @click="store.changeLanguage(2)" id="italy">
                <img src="@/assets/italy.png" :alt="store.texts[13][store.language][2]">
                <p>Italiano</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

    img{
        color: white;
        border-radius: 20px;
        width: 9rem;
        height: auto;
        margin-right: 2em;
    }

    .options{
        width: 90%;
        height: 80vh;
        display: flex;
        flex-direction: column;
        margin: auto;
        justify-content: space-evenly;
        align-items: center;
    }

    .optionDivs{
        display: flex;
        place-items: center;
        text-align: center;
        padding: 2%;
    }

    .optionDivs:hover{
        cursor: pointer;
        background: rgba(0, 0, 0, 0.15);
        border-radius: 7px;
    }

    hr{
        border-radius: 50px;
        border: solid 3px white;
        width: 70%;
    }

    .span{
        margin: 3vh auto 2.5vh auto;
        display: flex;
        width: 90%;
        justify-content: end;
    }

    span{
        color: white;
        font-size: 5.5vh;
    }

    span:hover{
        cursor: pointer;
    }

    p{
        text-decoration: none;
        color: white;
        font-size: 2rem;
    }
</style>

<script setup>
    import {Store} from "../store.js"
    const store = Store()
    store.returned = true

    store.changeTablet()
    store.checkLanguage(true)
</script>