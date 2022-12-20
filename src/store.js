import { defineStore } from "pinia"

import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyBXp5UpZcTUsXQJWhv1jv8H_TrB11iYfGE",
    authDomain: "test-d70c3.firebaseapp.com",
    projectId: "test-d70c3",
    storageBucket: "test-d70c3.appspot.com",
    messagingSenderId: "504992350145",
    appId: "1:504992350145:web:8656d94109d4f4bb9b7940",
    measurementId: "G-69X34T12C0"
};

// firebase.initializeApp(firebaseConfig);
const fire = initializeApp(firebaseConfig);

import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
const storage = getStorage();
const storageRef = ref(storage,"Songs/");
const song = document.getElementById("song")
const img = document.getElementById("img")
let songsNames = []
let songsReferences = []
let songsImages = []
let artists = []

export const Store = defineStore('Store', {
    state: () => ({
        previousIndex: "",
        songIndexA: 0,
        songIndexB: 1,
        goingShuffle: false,
        absolute: "absolute",
        absolute2: "absolute2",
        fade: 0,
        fade2: 1,
        tablet: false,
        changing: false,
        showSettings: false,
        rangeUp: true,
        songsImages,
        maxIndex: 0,
        songIndex: 0,
        songsReferences,
        songsNames,
        artists,
        icon: "triangle",
        songTime: 0,
        rangeSize: "0% 100%",
        songCurrent: "00:00",
        songDuration: "00:00"
    }),

    actions:{
        changeTablet(){
            window.innerWidth >= 768 ? this.tablet = true : this.tablet = false
            setTimeout(()=>{
                this.checkSong()
            },1)
        },

        launchSettings(){
            this.showSettings = !this.showSettings
        },

        play(){
            const song = document.getElementById("song")
            if(!isNaN(song.duration) && song.duration != song.currentTime){
                let checkPlaying = setInterval(()=>{
                    const range = document.getElementById("range")
                    range.value = (song.currentTime / song.duration) * 100
                    this.rangeSize = `${range.value}% 100%`
                    this.checkSong()
                    this.icon == "triangle" ? clearInterval(checkPlaying) : ""
                },1)

                this.icon == "icon-pause2" ? (this.icon = "triangle", song.pause() ) : (this.icon = "icon-pause2", song.play())
            }
        },

        movingSong(){
            const song = document.getElementById("song")
            const range = document.getElementById("range")
            if(this.rangeUp){
                if(!isNaN(song.duration)){
                    this.checkSong()
                    const porcentage = range.value / 100
                    this.songTime = song.duration * porcentage
                    song.currentTime = this.songTime
                    this.checkSong()
                    this.rangeSize = `${range.value}% 100%`
                }
                else{
                    range.value = 0
                }
            }
            else{
                range.value = 0
            }
        },

        checkSong(){
            if(this.songsReferences[this.songIndex] == undefined || 
                this.songsImages[this.songIndex] == undefined || 
                this.songsReferences[this.songIndex][0] == "g" || 
                this.songsImages[this.songIndex][0] == "g")
                {
                    this.download()
            }
            else{
                const song = document.getElementById("song")
                if(isNaN(song.duration)){
                    setTimeout(()=>{
                        this.checkSong()
                    },1)
                }
                else{
                    if(this.changing){
                        this.rangeUp = false
                        this.icon == "icon-pause2" ? song.play() : ""
                        this.changing = false
                        range.addEventListener("mousedown", ()=>{
                            this.rangeUp = true
                        })
                        range.addEventListener("mouseup", ()=>{
                            this.rangeUp = true
                        })
                        range.addEventListener("touchstart", ()=>{
                            this.rangeUp = true
                        })
                        range.addEventListener("touchend", ()=>{
                            this.rangeUp = true
                        })
                    }
                    const duration = song.duration / 60
                    const currentTime = song.currentTime / 60
                    const int = Math.floor(duration)
                    let decimal = duration - int
                    decimal = Math.floor(decimal*60)
                    
                    const intCurrent = Math.floor(currentTime)
                    let decimalCurrent = currentTime - intCurrent
                    decimalCurrent = Math.floor(decimalCurrent*60)

                    this.songDuration = `${int.toString().padStart(2,0)}:${decimal.toString().padStart(2,0)}`
                    this.songCurrent = `${intCurrent.toString().padStart(2,0)}:${decimalCurrent.toString().padStart(2,0)}`
                    this.checkEnd()
                }
            }
        },

        download(){
            listAll(storageRef)
            .then((res)=>{
                let i = 0
                res.prefixes.forEach((folderRef) => {
                    songsNames[i] = folderRef._location.path.split("<!--|Space|--!>").shift().split("Songs/").pop().trim()
                    artists[i] = folderRef._location.path.split("<!--|Space|--!>").pop().trim()
                    songsReferences[i] = songsNames[i] + ' <!--|Space|--!> ' + artists[i] + "/" + songsNames[i] + '.mp3';
                    songsImages[i] = songsNames[i] + ' <!--|Space|--!> ' + artists[i] + "/" + songsNames[i] + '.png';
                    songsReferences[i] = ref(storageRef, songsReferences[i])
                    songsImages[i] = ref(storageRef, songsImages[i])
                    i++
                });
                for (let i = 0; i < songsReferences.length; i++) {
                    getDownloadURL(songsReferences[i])
                    .then((url)=>{
                        this.songsReferences[i] = url
                    })
                }
                for (let i = 0; i < songsImages.length; i++) {
                    getDownloadURL(songsImages[i])
                    .then((url)=>{
                        this.songsImages[i] = url
                    })
                }
            })
            .then(()=>{
                this.maxIndex = this.songsReferences.length - 1
                this.checkSong()
            })
        },

        checkEnd(){
            const range = document.getElementById("range")
            const song = document.getElementById("song")
            if(range.value == 100 && this.icon == "icon-pause2"){
                this.songIndex < this.maxIndex ? this.next() : (this.icon = "triangle", song.pause())
            }
        },

        next(){
            if(this.songIndex < this.maxIndex){
                this.songIndex++
                this.reset()
            }
        },

        previous(){
            if(this.songIndex > 0){
                this.songIndex--
                this.reset()
            }
        },

        reset(){
            this.fading()
            setTimeout(() => {
                this.checkSong()
                this.changing = true
            }, 1);
        },

        shuffle(){
            this.previousIndex = this.songIndex
            let random = Math.round(Math.random() * this.maxIndex)
            random == this.songIndex ? this.shuffle() : (this.songIndex = random, this.goingShuffle = true, this.reset())
        },

        fading(){
            const img = document.getElementById("img")
            const img2 = document.getElementById("img2")
            if(this.goingShuffle){
                if(this.fade2){
                    this.songIndexB = this.songIndex
                    this.fade2 = 0
                    this.fade = 1
                    setTimeout(() => {
                        img.classList = "absolute2"
                        img2.classList = "absolute"
                    },10)
                }
                else{
                    this.songIndexA = this.songIndex
                    this.fade2 = 1
                    this.fade = 0
                    setTimeout(() => {
                        img.classList = "absolute"
                        img2.classList = "absolute2"
                    },10)
                }
            }
            else{
                if(this.fade2){
                    this.songIndexB = this.songIndex
                    this.fade2 = 0
                    this.fade = 1
                    setTimeout(() => {
                        img.classList = "absolute2"
                        img2.classList = "absolute"
                    },10)
                }
                else{
                    this.songIndexA = this.songIndex
                    this.fade2 = 1
                    this.fade = 0
                    setTimeout(() => {
                        img.classList = "absolute"
                        img2.classList = "absolute2"
                    },10)
                }
            }

            if(this.tablet){
                const imgWidth = img.width
                let imgHalf = imgWidth / 2
                const img2Width = img2.width
                let img2Half = img2Width / 2
                let checkWidth = setInterval(()=>{
                    if(img.width == Math.ceil(imgHalf) || img2.width == Math.ceil(img2Width*2) || img2.width == Math.ceil(img2Half) || img.width == Math.ceil(imgWidth*2)){
                        dice.style.display = "initial"
                        clearInterval(checkWidth)
                    }
                },1)
            }
            try{
                const dice = document.getElementById("dice")
                dice.style.display = "none"
            }catch{}
        }
    }
})