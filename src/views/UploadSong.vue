<template>
    <div class="app">

        <!-- <audio :src="store.audioUpload" id="song"></audio> -->
        
        <div class="span">
            <h1 style="margin-right: 2%;">{{store.texts[63][store.language]}}</h1>
            <router-link :to="{name: 'songs'}" style="text-decoration: none;" @click="store.showSettings = true">
                <span class="icon-circle-left"></span>
            </router-link>
        </div>
        <div class="all" v-for="n in store.songsQuantity">
            <audio id="song"></audio>
            <!-- <div id="upload" @click="store.requestFile('img')"> -->
                <div id="upload">
                    <div class="img-container">
                        <!-- <img :src="store.imgUpload" alt="Img" id="img" hidden draggable="false"> -->
                    <img alt="Img" id="img" hidden draggable="false">
                    <p id="change" hidden>{{store.texts[65][store.language]}}</p>
                </div>
                <div id="toUpload">
                    <span class="icon-cloud-upload"></span>
                    <h1>{{store.texts[64][store.language]}}</h1>
                </div>
            </div>
            <h1 id="songName">
                <p contentEditable="true" @focusin="store.editName('In')" @focusout="store.editName">{{store.texts[66][store.language]}}</p>
                <span class="icon-pencil" v-if="store.showPencil" onclick="document.getElementById('songName').firstChild.focus()"></span>
            </h1>
            <h3 id="artistName">
                <p contentEditable="true" @focusin="store.editName('In')" @focusout="store.editName">{{store.texts[67][store.language]}}</p>
                <span class="icon-pencil" v-if="store.showPencil" onclick="document.getElementById('artistName').firstChild.focus()"></span>
            </h3>
    
            <div class="parent">
                <div style="width: 80vw; position: absolute; z-index: 1;">
                    <!-- <button class="uploadSong" @click="store.requestFile"> -->
                    <button class="uploadSong" id="audio">
                        {{store.texts[68][store.language]}}
                        <span class="icon-cloud-upload"></span>
                    </button>
                </div>
    
                <div class="volumeParent" @mouseleave="store.changeVolume(['Out',n-1])" @touchend="store.changeVolume(['Out',n-1])" v-if="store.tablet">
                    <span class="icon-volume-high" id="volume" @mouseenter="store.changeVolume(['In',n-1])"  @touchstart="store.changeVolume(['In',n-1])" @click="store.changeVolume(['Previous',n-1])"></span>
                    <input type="range" id="volumeRange" min="0" max="1" step="any" :value="store.volumeValue[n-1]" :style="{ backgroundSize: store.volumeSize[n-1], opacity: store.volumeOpacity[n-1], left: store.volumePosition[n-1]}" @input="store.changeVolume([0,n-1])" disabled>
                </div>
    
                <div v-else><br><br></div>
            </div>
            
            <!-- <ProgressBar></ProgressBar> -->
            <input type="range" id="range"  @input="store.movingSong(n-1)" :value="store.rangeValue[n-1]" step="any" :style="{ backgroundSize: store.rangeSize[n-1]}">
            <div class="player">
            
            <div class="center" @click="store.play(n-1)">
                <div :class="store.icon[n-1]"></div>
            </div>
        </div>

            <hr>
        </div>

        <button class="submit" @click="store.uploadSong">{{store.texts[69][store.language]}}</button>
        <div class="severalParent">
            <label class="several">
                <input type="checkbox" id="checkbox" @change="store.askHowManySongs">
                <span  class="checkbox"></span>
                {{store.texts[70][store.language]}}
            </label>
        </div>

        <Modal></Modal>
    </div>
</template>

<style scoped>

</style>

<script>
    import ProgressBar from '../components/ProgressBar.vue';
    import Modal from '../components/Modal.vue';
    import {Store} from "../store.js"
    const store = Store()
    let files = []
    let files2 = []
    let files3 = []
    let files4 = []

    export default{
    name: "UploadSong",
    mounted(){
        store.launchModal()
        store.resetUpload()
        store.addEvent()

        store.saveProgress = [true, store.rangeValue, store.songTime]
        store.reset(true)

        let imgs = document.querySelectorAll('div#upload')
        let index = 0
        let data
        imgs.forEach((img)=>{
            index += 1
            files.push([img, index])
            // img.src = store.imgUpload[index]


            img.addEventListener("click", (e) =>{

                e.target.parentElement.id == "toUpload" ? data = e.target.parentElement.parentElement : data = e.target
                if(data.id == "toUpload"){
                    data = data.parentElement
                }

                if(e.target.parentElement.classList[0] == 'img-container'){
                    data = e.target.parentElement.parentElement
                }
                
                for (let i = 0; i < files.length; i++) {
                    const subArray = files[i];
                    if (subArray.includes(data)) {
                        store.requestFile(['img', i])
                    }
                }
            })
        })


        let audios = document.querySelectorAll('button#audio')
        index = 0
        let data2
        audios.forEach((audio)=>{
            index += 1
            files2.push([audio, index])

            audio.addEventListener("click", (e) =>{

                data2 = e.target
                
                for (let i = 0; i < files2.length; i++) {
                    const subArray = files2[i];
                    if (subArray.includes(data2)) {
                        store.requestFile(['audio', i])
                    }
                }
            })
        })



        // let progressBars = document.querySelectorAll('input#range')
        // index = 0
        // let data3
        // progressBars.forEach((progressBars)=>{
        //     index += 1
        //     files3.push([progressBars, index])
            
        //     progressBars.addEventListener("input", (e) =>{
                
        //         data3 = e.target
                
        //         for (let i = 0; i < files3.length; i++) {
        //             const subArray = files3[i];
        //             if (subArray.includes(data3)) {
        //                 store.movingSong(i)
        //             }
        //         }
        //     })
        // })



        // let play = document.querySelectorAll('div#play')
        // index = 0
        // let data4, data5
        // play.forEach((play)=>{
        //     index += 1
        //     files4.push([play, index])

        //     play.addEventListener("click", (e) =>{
        //         data4 = e.target
        //         try{
        //             data5 = e.target.parentElement
        //         }catch{}
        //         for (let i = 0; i < files4.length; i++) {
        //             const subArray = files4[i];
        //             if (subArray.includes(data4) || subArray.includes(data5)) {
        //                 store.play(i)
        //             }
        //         }
        //     })
        // })
    }
  }
</script>

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
        font-size: 1.2vmax;
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .span{
        display: flex;
        width: 90%;
        justify-content: end;
        align-items: center;
    }

    .span h1{
        width: -webkit-fill-available;
        font-size: x-large;
    }

    .icon-circle-left{
        color: white;
        font-size: 5.5vh;
    }

    h1,h3{
        color: white;
        margin: .5% 0%;
    }

    h1 p, h3 p{
        display: inline;
    }

    .icon-cloud-upload{
        color: #D2B8D3;
    }

    img{
        width: 100%;
        height: 100%;
        transition: all .3s ease;
    }

    #songName:hover, #artistName:hover{
        cursor: pointer;
        text-decoration: underline solid white 2px;
    }

    #songName, #artistName{
        max-width: 80%;
    }

    #songName p, #artistName p{
        width: 100%;
    }

    #upload:hover img{
        opacity: 0.5;
    }
    
    #upload:hover #change{
        opacity: 1;
    }

    #change{
        opacity: 0;
        transition: all .3s ease;
        position: relative;
        bottom: 70%;
        color: white;
        font-size: 5vh;
    }

    .parent{
        display: flex;
        flex-direction: row-reverse;
        width: 80%;
        justify-content: start;
    }

    .all{
        width: -webkit-fill-available;
        margin: 0%;
        display: contents;
        place-items: center;
    }

    #upload{
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.15);
        cursor: pointer;
        width: 80%;
        min-height: 40vh;
        text-align: center;
    }

    #upload:hover{
        background-color: rgba(0, 0, 0, 0.5);
    }

    #upload h1{
        margin: 0;
        font-size: 1.5rem;
    }

    #upload .icon-cloud-upload{
        font-size: 4rem;
    }
    
    .uploadSong{
        border: none;
        color: #8B8181;
        background: white;
        cursor: pointer;
        transition: all .3s;
        display: flex;
        align-items: center;
        margin: auto;
        padding: 1%;
    }

    .uploadSong:hover{
        background: #bbbbbb;
        color: #525151;
    }

    .uploadSong:hover .icon-cloud-upload{
        color: #b097b1;
    }

    .submit{
        width: max-content !important;
        padding: 0% 10%;
        background: none;
        border: 1.5px solid #D2B8D3;
        width: 25%;
        cursor: pointer;
        transition: all .3s;
        color: white;
    }

    .submit:hover{
        background: #D2B8D3;
    }

    .severalParent{
        width: 80%;
        display: flex;
        align-items: center;
    }

    .several{
        margin-top: 7%;
        align-items: center;
        display: flex;
        color: white;
        cursor: pointer;
        font-size: large;
    }

    input[type="checkbox"]{
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkbox{
        border: #D2B8D3 solid 1.5px;
        height: 25px;
        width: 25px;
        border-radius: 5px;
        margin-right: 7px;
    }

    .checkbox:hover{
        background: rgba(0, 0, 0, 0.15);
    }

    input:checked ~ .checkbox {
        background-color: #D2B8D3;
    }


    .checkbox:after {
        content: "";
        position: relative;
        display: none;
    }

    input:checked ~ .checkbox:after {
        display: block;
    }

    .checkbox:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .volumeParent{
        z-index: 2;
        display: flex;
        place-items: center;
    }

    .lefted{
        display: flex;
        place-items: center;
        width: 80%;
    }

    #volume{
        color: white;
        margin: 0 15% 0 0;
        font-size: 2em;
    }

    #volume:hover{
        cursor: pointer;
    }

    #volumeRange{
        position: relative;
        transition: opacity .3s;
    }

    #volume:hover{
        color: #aaaaaa;
    }

    input[type="range"] {
        margin-left: -.5rem;
        appearance: none;
        width: 80%;
        height: 4px;
        background: #66757F;
        border-radius: 5px;
        background-image: linear-gradient(white, white);
        background-repeat: no-repeat;
    }

    input[type="range"]:hover{
        cursor: pointer;
    }

    input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background: white;
        cursor: pointer;
        box-shadow: 0 0 2px 0 #66757F;
        transition: background .3s ease-in-out;
    }

    input[type=range]::-webkit-slider-runnable-track  {
        appearance: none;
        box-shadow: none;
        border: none;
        background: transparent;
    }

    hr{
        width: 90%; 
        margin: 5vh;
    }

    .icon-pencil:before {
        content: " \e907";
    }










    input[type="range"] {
        margin: .8em auto;
        appearance: none;
        width: 80%;
        height: 4px;
        background: #66757F;
        border-radius: 5px;
        background-image: linear-gradient(#D2B8D3, #D2B8D3);
        background-repeat: no-repeat;
    }

    input[type="range"]:hover{
        cursor: pointer;
    }

    input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #D2B8D3;
        cursor: pointer;
        box-shadow: 0 0 2px 0 #66757F;
        transition: background .3s ease-in-out;
    }

    input[type=range]::-webkit-slider-runnable-track  {
        appearance: none;
        box-shadow: none;
        border: none;
        background: transparent;
    }
    
    .player{
        width: 80%;
        display: flex;
        justify-content: center;
        margin: 2vh auto;
    }
    .left, .right, .center{
        width: 2em;
        height: 2em;
        color: white;
        text-align: center;
        display: grid;
        place-items: center;
        font-size: 5vh;
        margin: auto;
    }
    
    .center{
        color: white;
        text-align: center;
        background: #D2B8D3;
        border-radius: 68px;
        font-size: 5vh;
    }

    .left span:hover, .right span:hover, .center:hover{
        cursor: pointer;
    }

    .triangle {
        position: relative;
        left: 7%;
        background-color: white;
        text-align: left;
    }

    .triangle:before, .triangle:after {
        content: '';
        position: absolute;
        background-color: inherit;
    }

    .triangle, .triangle:before, .triangle:after {
        width:  .6em;
        height: .6em;
        border-top-right-radius: 35%;
    }

    .triangle {
        transform: rotate(30deg) skewX(-30deg) scale(1,.866);
    }

    .triangle:before {
        transform: rotate(-135deg) skewX(-45deg) scale(1.414,.707) translate(0,-50%);
    }

    .triangle:after {
        transform: rotate(135deg) skewY(-45deg) scale(.707,1.414) translate(50%);
    }

    @media screen and (min-width: 768px){
        .several{
            margin: 0;
        }
    }
</style>