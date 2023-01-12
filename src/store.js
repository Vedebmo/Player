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
let history = []
let next = false
let previous = false
let random = 0
let shuffleIcon = false
let historyMax

import texts from './assets/texts.json';

let userLang = navigator.language || navigator.userLanguage;
userLang = userLang[0] + userLang[1]

export const Store = defineStore('Store', {
    state: () => ({
        volumePrevious: 1,
        volumePosition: "100vw",
        volumeOpacity: 0,
        volumeSize: "100% 100%",
        returned: false,
        userLang,
        language: null,
        texts,
        loop: false,
        historyIndex: 0,
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
        showPassword: false,
        passwordType: "password",
        songsImages,
        maxIndex: 0,
        songIndex: 0,
        songsReferences,
        songsNames,
        artists,
        icon: "triangle",
        songTime: 0,
        rangeValue: 0,
        rangeUp: true,
        rangeSize: "0% 100%",
        songCurrent: "00:00",
        songDuration: "00:00"
    }),

    actions:{
        changeTablet(){
            window.innerWidth >= 768 ? (this.tablet = true, this.showSettings = false) : this.tablet = false
            setTimeout(()=>{
                this.checkSong()
            },1)
        },
        
        fixAbsolute(){
            const img = document.getElementById("img")
            const img2 = document.getElementById("img2")
    
            if(img.style.opacity == 0){
                img.classList = "absolute2"
                img2.classList = "absolute"
            }
        },

        launchSettings(){
            const song = document.getElementById("song")
            this.showSettings = !this.showSettings
            if(this.showSettings){
                song.pause()
                this.icon = "triangle"
            }
            else{
                let findRange = setInterval(()=>{
                    const range = document.getElementById("range")
                    if(range != null){
                        range.value = (song.currentTime / song.duration) * 100
                        this.rangeSize = `${range.value}% 100%`

                        //Detect and fix absolute and opacities
                        this.fixAbsolute()

                        clearInterval(findRange)
                        this.checkSong()
                    }
                },1)
            }
        },

        play(){
            const song = document.getElementById("song")
            if(!isNaN(song.duration) && song.duration+1 != song.currentTime){
                let checkPlaying = setInterval(()=>{
                    if(this.showSettings == true || this.returned == true){
                        clearInterval(checkPlaying)
                        this.icon = "triangle"
                        return 0
                    }
                    const range = document.getElementById("range")
                    this.rangeValue = (song.currentTime / song.duration) * 100
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
                    this.rangeValue = range.value
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
                const range = document.getElementById("range")
                if(song == null || isNaN(song.duration) == true){
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
                    if(!this.showSettings){
                        if(this.returned){
                            const range = document.getElementById("range")
                            song.currentTime = this.songTime
                            range.value = this.rangeValue
                            this.rangeSize = `${this.rangeValue}% 100%`
                            this.returned = false
                            this.rangeUp = true
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
            }

            try{
                this.fixAbsolute()
            }catch{}
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
                if(this.loop){
                    this.reset()
                    return 0
                }

                if(this.goingShuffle){
                    this.next()
                }
                else{
                    this.songIndex < this.maxIndex ? this.next() : (this.icon = "triangle", song.pause())
                }
            }
        },

        next(){
            if(this.goingShuffle){
                next = true
                this.shuffle()
                return 0
            }
            if(this.songIndex < this.maxIndex){
                this.songIndex++
                this.reset()
            }
        },

        previous(){
            if(this.goingShuffle){
                previous = true
                this.shuffle()
                return 0
            }
            if(this.songIndex > 0){
                this.songIndex--
                this.reset()
            }
        },

        reset(){
            const range = document.getElementById("range")
            range.value = 0
            this.rangeSize = `${range.value}% 100%`
            this.checkShuffleHistory()
            setTimeout(() => {
                this.checkSong()
                this.changing = true
            }, 1);
        },

        shuffle(){
            random = Math.round(Math.random() * this.maxIndex)
            if(random == this.songIndex || random == history[history.length - 1]){
                this.shuffle()
            }
            else{
                this.goingShuffle = true, this.reset()
            }
        },

        fading(){
            const img = document.getElementById("img")
            const img2 = document.getElementById("img2")

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
        },

        rollDice(){
            shuffleIcon = !shuffleIcon
            this.shuffle()
        },

        launchShuffle(){
            this.historyIndex = 0
            history = [this.songIndex]
            this.goingShuffle = !this.goingShuffle
            const iconShuffle = document.getElementById("iconShuffle")
            this.goingShuffle ? iconShuffle.style = `background: rgba(0, 0, 0, 0.4);` : iconShuffle.style = ``
        },

        checkShuffleHistory(){
            if(this.goingShuffle){
                historyMax = history.length - 1
                if(shuffleIcon){
                    this.historyIndex = historyMax
                    shuffleIcon = !shuffleIcon
                    next = true
                }
                const iconShuffle = document.getElementById("iconShuffle")
                iconShuffle.style.background == "" ? this.goingShuffle = false : ""

                if(this.historyIndex >= 0){
                    if(previous){
                        if(this.historyIndex > 0 && this.historyIndex <= historyMax){
                            this.historyIndex--
                            this.songIndex = history[this.historyIndex]
                            this.fading()
                        }
                    }
                    if(next){
                        if(this.historyIndex != historyMax){
                            this.historyIndex++
                            this.songIndex = history[this.historyIndex]
                            this.fading()
                        }
                        else{
                            this.songIndex = random
                            this.fading()
                            history.push(this.songIndex)
                            this.historyIndex++
                        }
                    }
                    previous = false
                    next = false
                }
            }
            else{
                this.fading()
            }
        },

        launchLoop(){
            this.loop = !this.loop
            const iconLoop = document.getElementById("iconLoop")
            this.loop ? iconLoop.style = `background: rgba(0, 0, 0, 0.4);` : iconLoop.style = ``
        },

        changeVolume(input){
            const volumeIcon = document.getElementById("volume")
            const volumeRange = document.getElementById("volumeRange")
            let volume = volumeRange.value
            
            volume != 0 ? this.volumePrevious = volume : ""

            if(input == "In"){
                volumeRange.disabled = false
                this.volumePosition = "0vw"
                this.volumeOpacity = 1
            }
            else if(input == "Out"){
                this.volumeOpacity = 0
                volumeRange.disabled = true
                setTimeout(()=>{
                    this.volumePosition = "100vw"
                },300)
            }
            else if(input == "Previous"){
                volumeRange.value != 0 ? (volume = 0, volumeRange.value = 0) : (volume = this.volumePrevious, volumeRange.value = this.volumePrevious)
            }

            this.volumeSize = `${volumeRange.value * 100}% 100%`
            const song = document.getElementById("song")
            song.volume = volume
            
            if(volume == 0){
                volumeIcon.classList = "icon-volume-mute2"
            }
            else if(volume > 0 && volume <= 0.25){
                volumeIcon.classList = "icon-volume-mute"
            }
            else if(volume > 0.25 && volume <= 0.4){
                volumeIcon.classList = "icon-volume-low"
            }
            else if(volume > 0.4 && volume < 1){
                volumeIcon.classList = "icon-volume-medium"
            }
            else if(volume == 1){
                volumeIcon.classList = "icon-volume-high"
            }
        },
        
        checkLanguage(checking){
            if(this.language == null){
                switch(this.userLang){
                    default:
                        this.language = 0
                        break
        
                    case "es":
                        this.language = 1
                        break
    
                    case "it":
                        this.language = 2
                        break
                }
            }

            if(checking){
                this.changeLanguage(this.language)
            }
        },

        changeLanguage(language){

            let findFlags = setInterval(()=>{
                const flag = document.getElementById("usa")
                const flag2 = document.getElementById("spain")
                const flag3 = document.getElementById("italy")
                
                if(flag != null && flag2 != null && flag3 != null){
                    this.language = language
        
                    switch(this.language){
                        default:
                            flag.style.background = "rgba(0, 0, 0, 0.15)"
                            flag2.style.background = ""
                            flag3.style.background = ""
                            break
                        case 1:
                            flag.style.background = ""
                            flag2.style.background = "rgba(0, 0, 0, 0.15)"
                            flag3.style.background = ""
                            break
                        case 2:
                            flag.style.background = ""
                            flag2.style.background = ""
                            flag3.style.background = "rgba(0, 0, 0, 0.15)"
                            break
                    }
                    clearInterval(findFlags)
                }
            },1)
        },

        downloadSong(){
            const xhttp = new XMLHttpRequest()
            const name = this.songsNames[this.songIndex]
            xhttp.responseType = 'blob'
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let url = window.URL.createObjectURL(this.response)
                    let anchor = document.createElement("a")
                    anchor.href = url
                    anchor.download = name
                    anchor.click()
                    window.URL.revokeObjectURL(url)
                }
            };
            xhttp.open("GET", this.songsReferences[this.songIndex], true);
            xhttp.send();
        },

        willShowPassword(){
            this.showPassword = !this.showPassword
            this.passwordType == "text" ? this.passwordType = "password" : this.passwordType = "text"
        }
    }
})