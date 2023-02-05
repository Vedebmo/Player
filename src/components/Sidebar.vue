<template>
    <div class="sideBar">
        <div class="cancel" v-if="!store.tablet">
            <input type="text" :placeholder="store.texts[1][store.language]">
            <span class="icon-cancel-circle" @click="store.launchSettings"></span>
        </div>
        <div class="show">
            <input type="text" :placeholder="store.texts[1][store.language]" v-if="store.tablet">
        </div>
        <div class="options">
            <router-link class="optionDivs" :to="{name: 'login'}" style="text-decoration: none;">
                <span class="icon-user"></span>
                <p>{{store.texts[2][store.language]}}</p>
            </router-link>
            <hr>
            <div class="optionDivs" v-if="store.loggedIn">
                <span class="icon-playlist_play"></span>
                <p>{{store.texts[3][store.language]}}</p>
            </div>
            <hr  v-if="store.loggedIn">
            <div class="optionDivs" id="waveIcon" @click="store.toogleWave">
                <span class="icon-googlepodcasts"></span>
                <p>{{store.texts[4][store.language]}}</p>
            </div>
            <hr>
            <router-link class="optionDivs" :to="{name: 'languages'}" style="text-decoration: none;">
                <span class="icon-language2"></span>
                <p>{{store.texts[0][store.language]}} ></p>
            </router-link>
            <Lowerbar v-if="store.tablet"></Lowerbar>
        </div>
    </div>
</template>

<style scoped>

.sideBar{
    margin-left: 1.2em ;
    align-items: center;
    background: rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100vh;
}

input{
    width: 80%;
    text-align: center;
    font-size: 1.2em;
    height: fit-content;
}

.options{
    width: 100%;
    height: -webkit-fill-available;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
.optionDivs{
    display: flex;
    place-items: center;
    text-align: center;
    padding: 2%;
    max-width: 70%;
}

.optionDivs:hover{
    cursor: pointer;
    background: rgba(0, 0, 0, 0.15);
    border-radius: 7px;
}

span{
    font-size: 2.5em;
    color: #D2B8D3;
    margin-right: 15px;
}

.cancel{
    margin-top: 3vh;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
}

.cancel input{
    width: 70%;
}

.show{
    margin-top: 7%;
    display: flex;
    justify-content: center;
}

.icon-cancel-circle{
    color: white;
    font-size: 5.5vh;
}

.icon-cancel-circle:hover{
    cursor: pointer;
}

.icon-playlist_play{
    font-size: 3.5em;
}

.icon-googlepodcasts:before{
    color: #D2B8D3;
}

p{
    text-decoration: none;
    color: white;
    font-size: 1rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

hr{
    border-radius: 50px;
    border: solid 3px white;
    width: 70%;
}

</style>

<script>

    import Lowerbar from './Lowerbar.vue';

    export default{
        name: "Sidebar",
        components:{
            Lowerbar
        }
    }
</script>

<script setup>
    import {Store} from "../store.js"
    const store = Store()
</script>