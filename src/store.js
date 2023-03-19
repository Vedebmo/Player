import texts from './assets/texts.json';

import router from './router'

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

// firebase Auth
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult, setPersistence, browserLocalPersistence, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, reauthenticateWithCredential, deleteUser, EmailAuthProvider, fetchSignInMethodsForEmail, reauthenticateWithPopup, updateEmail, updatePassword, sendPasswordResetEmail  } from "firebase/auth";

import { getStorage, ref, getDownloadURL, listAll, uploadBytes, uploadBytesResumable  } from "firebase/storage";

import WaveSurfer from "wavesurfer.js";
import wavesurfer from 'wavesurfer.js';

const storage = getStorage();
const storageRef = ref(storage,"Songs/")
const song = document.getElementById("song")
const img = document.getElementById("img")
let songsNames = []
let songsReferences = []
let audioExtensions = []
let songsImages = []
let imgExtensions = []
let artists = []
let history = []
let next = false
let previous = false
let random = 0
let shuffleIcon = false
let historyMax

let userLang = navigator.language || navigator.userLanguage;
userLang = userLang[0] + userLang[1]

export const Store = defineStore('Store', {
    state: () => ({
        saveProgress: [false, 0,0],
        songsQuantity: 1,
        showModal2: false,
        updated: false,
        uploadProgress: [],
        imgToUpload: "",
        audioToUpload: "",
        imgUpload: "",
        audioUpload: "",
        showPlaylists: false,
        playing: false,
        wavesurfer: "",
        loadWave: false,
        showingWave: false,
        img: "",
        imageChanged: false,
        onlyNickname: false,
        showPencil: true,
        lookForCredentials: false,
        credentials: "",
        showModal: false,
        modalPosition: "100vw",
        modalOpacity: 0,
        userImage: "",
        loggedIn: false,
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
        saveImgState: ["absolute", 1 , "absolute2", 0],
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

        updateSongList(){
            if(this.updated){
                this.updated = false
                this.download()
                this.reset()
            }
        },

        checkStates(way){
            if(way == "back"){
                if(this.showingWave){
                    const waveIcon = document.getElementById("waveIcon")
                    waveIcon.style = `background: rgba(0, 0, 0, 0.4);`
                    this.showingWave = false
                    this.toogleWave()
                }
                if(this.saveProgress[0]){
                    const range = document.getElementById("range")
                    this.rangeValue = this.saveProgress[1]
                    range.value = this.rangeValue
                    this.rangeSize = `${range.value}% 100%`

                    this.songTime = this.saveProgress[2]
                    this.checkSong()

                    this.saveProgress = [false, 0, 0]
                }
                return 0;
            }
            try {
                if(this.loop){
                    const iconLoop = document.getElementById("iconLoop")
                    iconLoop.style = `background: rgba(0, 0, 0, 0.4);`
                }
                if(this.goingShuffle){
                    const iconShuffle = document.getElementById("iconShuffle")
                    iconShuffle.style = `background: rgba(0, 0, 0, 0.4);`
                }
                if(this.showingWave){
                    if(this.tablet){
                        const waveIcon = document.getElementById("waveIcon")
                        waveIcon.style = `background: rgba(0, 0, 0, 0.4);`
                    }
                    else if(this.showSettings){
                        const waveIcon = document.getElementById("waveIcon")
                        waveIcon.style = `background: rgba(0, 0, 0, 0.4);`
                    }
                }
            } catch{}
        },

        changeTablet(){
            window.innerWidth >= 768 ? (this.tablet = true, this.showSettings = false) : this.tablet = false
            setTimeout(()=>{
                this.checkStates()
                this.checkSong()
            },1)
        },
        
        fixAbsolute(){
            const img = document.getElementById("img")
            const img2 = document.getElementById("img2")
    
            if(img.style.opacity == 0 && this.showingWave == false){
                img.classList = this.saveImgState[0]
                img2.classList = this.saveImgState[2]
            }
        },

        launchSettings(){
            const song = document.getElementById("song")
            this.showSettings = !this.showSettings
            if(this.showSettings){
                song.pause()
                this.icon = "triangle"
                if(this.showingWave){
                    let findWaveIcon = setInterval(()=>{
                        const waveIcon = document.getElementById("waveIcon")
                        if(waveIcon != null){
                            waveIcon.style = `background: rgba(0, 0, 0, 0.4);`
                            clearInterval(findWaveIcon)
                        }
                    },1)
                }
            }
            else{
                let findRange = setInterval(()=>{
                    const range = document.getElementById("range")
                    if(range != null){
                        range.value = (song.currentTime / song.duration) * 100
                        this.rangeSize = `${range.value}% 100%`

                        //Detect and fix absolute and opacities
                        this.fixAbsolute()

                        if(this.showingWave){
                            this.showingWave = false
                            this.toogleWave()
                        }

                        clearInterval(findRange)
                        this.checkSong()
                    }
                },1)
                this.checkStates()
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

                if(this.icon == "icon-pause2"){
                    this.icon = "triangle"
                    song.pause()
                    this.playing = false
                    try {
                        this.wavesurfer.pause()     
                    } catch{}
                }
                else{
                    this.icon = "icon-pause2"
                    song.play()
                    this.playing = true 
                    try {
                        this.wavesurfer.play()    
                    } catch{}
                }
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

                    // Move song in the waveform
                    try {
                        let newPoint = this.rangeValue / 100
                        this.wavesurfer.seekTo(newPoint)
                        this.wavesurfer.play()
                        setTimeout(()=>{
                            if(!this.playing){
                                this.wavesurfer.pause()
                            }
                        },1)
                    } catch{}
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
                    songsNames[i] = folderRef._location.path.split("<!--|Space|--!>")[0].split("Songs/")[1].trim()
                    artists[i] = folderRef._location.path.split("<!--|Space|--!>")[1].trim()
                    imgExtensions[i] = folderRef._location.path.split("<!--|Space|--!>")[2].trim()
                    audioExtensions[i] = folderRef._location.path.split("<!--|Space|--!>")[3].split('/')[0]

                    let file = `${songsNames[i]}.${audioExtensions[i].trim()}`
                    let file2 = `${songsNames[i]}.${imgExtensions[i]}`

                    songsReferences[i] = `${songsNames[i]} <!--|Space|--!> ${artists[i]} <!--|Space|--!> ${imgExtensions[i]} <!--|Space|--!> ${audioExtensions[i].trim()}/${file}`;

                    songsImages[i] = `${songsNames[i]} <!--|Space|--!> ${artists[i]} <!--|Space|--!> ${imgExtensions[i]} <!--|Space|--!> ${audioExtensions[i].trim()}/${file2}`;
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

        reset(upload){
            const range = document.getElementById("range")
            this.rangeValue = 0
            range.value = 0
            this.rangeSize = `${range.value}% 100%`
            if(!upload){
                this.checkShuffleHistory()
                setTimeout(() => {
                    this.checkSong()
                    this.changing = true
                }, 1);
            }
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
            try {
                this.wavesurfer.destroy()
            } catch{}
            const img = document.getElementById("img")
            const img2 = document.getElementById("img2")
            if(this.showingWave){
                this.createWave()
            }
            if(this.fade2){
                this.songIndexB = this.songIndex
                this.saveImgState[1] = 0
                this.saveImgState[3] = 1
                setTimeout(() => {
                    this.saveImgState[0] = "absolute2"
                    this.saveImgState[2] = "absolute"

                    this.fade2 = this.saveImgState[1]
                    this.fade = this.saveImgState[3]
                    if(!this.showingWave){
                        img.classList = this.saveImgState[0]
                        img2.classList = this.saveImgState[2]
                    }
                },10)
            }
            else{
                this.songIndexA = this.songIndex
                this.saveImgState[1] = 1
                this.saveImgState[3] = 0
                setTimeout(() => {
                    this.saveImgState[0] = "absolute"
                    this.saveImgState[2] = "absolute2"

                    this.fade2 = this.saveImgState[1]
                    this.fade = this.saveImgState[3]
                    if(!this.showingWave){
                        img.classList = this.saveImgState[0]
                        img2.classList = this.saveImgState[2]
                    }
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
            const song = document.getElementById("song")
            const volumeIcon = document.getElementById("volume")
            let volume = song.volume

            if(this.tablet){
                const volumeRange = document.getElementById("volumeRange")
                volume = volumeRange.value
                
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
            }
            else if(input == "Previous"){
                volume != 0 ? volume = 0 : volume = this.volumePrevious
            }

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
        },

        login(){
            let email = document.getElementById("email")
            let password = document.getElementById("password")
            email = email.value
            password = password.value

            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                this.loggedIn = false
                this.checkAuth()
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/invalid-email":
                        alert(this.texts[22][this.language])
                        break
                    case "auth/user-not-found":
                        alert(this.texts[23][this.language])
                        break
                    case "auth/wrong-password":
                        alert(this.texts[24][this.language])
                        break
                    default:
                        alert(this.texts[11][this.language])
                }
            });
        },

        loginGoogle(){
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            if(this.tablet){
                setPersistence(auth, browserLocalPersistence)
                .then(()=>{
                    signInWithPopup(auth, provider)
                    .then((result) => {
                        this.loggedIn = false
                        this.checkAuth()
                    }).catch((error) => {
                        alert(this.texts[11][this.language])
                    });
                })
                return 0
            }
            
            setPersistence(auth, browserLocalPersistence)
            .then(()=>{
                signInWithRedirect(auth, provider)
                .then((result) => {
                    this.loggedIn = false
                    this.checkAuth()
                }).catch((error) => {
                    alert(this.texts[11][this.language])
                });
            })
        },

        signUp(){
            let nickname = document.getElementById("nickname")
            let email = document.getElementById("email")
            let password = document.getElementById("password")
            let password2 = document.getElementById("Confirmpassword")
            let emailValue = email.value
            let passwordValue = password.value
            let password2Value = password2.value
            let nicknameValue = nickname.value
            
            if(passwordValue == password2Value){
                const auth = getAuth();
                createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    updateProfile(userCredential.user, {
                        displayName: nicknameValue, photoURL: "https://firebasestorage.googleapis.com/v0/b/test-d70c3.appspot.com/o/Default%2FUser.png?alt=media&token=2308279b-c410-4f63-9e9e-5d6402b31cbf"
                    }).then(()=>{
                        password.value = ""
                        email.value = ""
                        password2.value = ""
                        nickname.value = ""
                        passwordValue = ""
                        emailValue = ""
                        password2Value = ""
                        nicknameValue = ""
                        this.loggedIn = false
                        this.checkAuth()
                    })
                })
                .catch((error) => {
                    switch (error.code) {
                        case "auth/invalid-email":
                            alert(this.texts[22][this.language])
                            break
                        case "auth/weak-password":
                            alert(this.texts[28][this.language])
                            break
                        case "auth/email-already-in-use":
                            alert(this.texts[30][this.language])
                            break
                        default:
                            alert(this.texts[11][this.language])
                    }
                });
            }
            else{
                alert(this.texts[29][this.language])
            }
        },

        checkAuth(){
            if(this.loggedIn){
                router.push({ path: '/account' })
                return 0
            }
            
            const auth = getAuth()
            onAuthStateChanged(auth, (user)=>{
                if(user){
                    this.user = user
                    this.loggedIn = true
                    this.userImage = user.photoURL
                    this.checkAuth()
                    return 0
                }
            })

            getRedirectResult(auth)
              .then((result) => {
                this.user = result.user
                this.loggedIn = true
                router.push({ path: '/' })
              }).catch((error) => {
                if (error.customData != undefined){
                    alert(this.texts[11][this.language])
                }
              });
        },

        findAuth(){
            const auth = getAuth()
            onAuthStateChanged(auth, (user)=>{
                if(user){
                    const uid = user.uid;
                    this.user = user
                    this.loggedIn = true
                    this.userImage = user.photoURL
                }
                else{
                    (router.currentRoute._value.path == "/account" || router.currentRoute._value.path == "/edit" || router.currentRoute._value.path == "/forgot" 
                    || router.currentRoute._value.path == "/songs") ? router.push({ path: '/login' }) : ""
                }
            })
        },

        logout(){
            const auth = getAuth();
            if(confirm(this.texts[18][this.language])){
                signOut(auth).then(() => {
                    this.loggedIn = false
                    this.user = null
                    this.userImage = ""
                    router.push({ path: '/' })
                })
            }
        },

        launchModal(utility){
            if(utility == "edit"){
                let password = document.getElementById("newPassword")
                let password2 = document.getElementById("newPassword2")

                if(password.value == "" || password2.value == ""){
                    const onlyNickname = confirm(this.texts[48][this.language])
                    this.onlyNickname = onlyNickname
                    if(onlyNickname){
                        this.launchModal()
                        return 0
                    }
                    alert(this.texts[44][this.language])
                    alert(this.texts[44][this.language])
                    return 0
                }

                if(password.value == password2.value){
                    this.launchModal()
                }
                else{
                    alert(this.texts[29][this.language])
                }
            }
            else{
                this.showModal = !this.showModal
                if(this.modalPosition == "100vw"){
                    this.modalPosition = "auto"
                    this.modalOpacity = 1
                    try {
                        document.getElementById("app2").style.zIndex = "10"
                    } catch{}
                }
                else{
                    this.modalOpacity = 0
                    setTimeout(()=>{
                        this.modalPosition = "100vw"  
                        this.lookForCredentials = false
                        try {
                            document.getElementById("app2").style.zIndex = "-10"
                        } catch{}
                    },500)
                }
            }
        },

        delete(credential){
            const auth = getAuth();
            const user = auth.currentUser;

            reauthenticateWithCredential(user, credential)
            .then(() => {
              deleteUser(user).then(() => {
                alert(this.texts[36][this.language])
                this.loggedIn = false
                this.user = null
                this.userImage = ""
                this.lookForCredentials = false
                this.launchModal()
                router.push({ path: '/' })
              }).catch(() => {
                alert(this.texts[11][this.language])
              });              
            }).catch((error) => {
                alert(this.texts[11][this.language])
            });
        },

        getCredentials(data){
            const auth = getAuth();
            const user = auth.currentUser;

            const method = data[0]
            const utility = data[1]

            if(method == "email"){
                let password = document.getElementById("password")
                password = password.value

                const userCredential = EmailAuthProvider.credential(auth.currentUser.email, password);
                utility == "delete" ? this.delete(userCredential) : this.saveEdit(userCredential)
                
            }
            else if(method == "google"){
                const provider = new GoogleAuthProvider();
                const email = this.user.email
                let googleFound = false

                fetchSignInMethodsForEmail(auth,email)
                .then((methods)=>{
                    methods.forEach((method)=>{
                        if(method.indexOf("google") != -1){
                            googleFound = true
                            reauthenticateWithPopup(user, provider)
                            .then((result) => {
                                const userCredential = GoogleAuthProvider.credentialFromResult(result);
                                utility == "delete" ? this.delete(userCredential) : this.saveEdit(userCredential)                                
                            }).catch((error)=>{
                                alert(this.texts[37][this.language])
                            })
                        }
                    })
                    if(!googleFound){
                        alert(this.texts[38][this.language])
                    }
                })
            }
        },
        editName(input){
            try {
                input == "In" ? (this.showPencil = false) : this.showPencil = true
            } catch{}
        },

        checkImageRepeat(images,img,timesRepeated){
            let times = timesRepeated
            let willrepeat = false
            let newName = `(${times})${img.name}`

            let repeated = images.filter(el => el == newName).length

            if(repeated != 0){
                times++
                let value = this.checkImageRepeat(images,img,times)
                return value
            }
            else{
                newName = `(${times})${img.name}`
                return newName
            }
        },

        saveEdit(credential){
            const auth = getAuth();
            const user = auth.currentUser;

            reauthenticateWithCredential(user, credential)
            .then(() => {
                let nickname = document.getElementById("nickname")
                const img = this.img

                const storage = getStorage();
                let storageRef = ref(storage, `User Images/`);
                let images = []

                if(this.imageChanged){
                    this.imageChanged = false
                    listAll(storageRef)
                    .then((res)=>{
                        res.items.forEach((image)=>{
                            images.push(image.name)
                        })
                    })
                    .then(()=>{
                        storageRef = ref(storage, `User Images/${img.name}`);
                        if(images.includes(img.name)){
                            const newName = this.checkImageRepeat(images,img,1)
                            storageRef = ref(storage, `User Images/${newName}`);
                        }
                        uploadBytes(storageRef, img)
                        .then((snapshot)=>{
                            getDownloadURL(snapshot.ref)
                            .then((url)=>{
                                updateProfile(auth.currentUser, {
                                    displayName: nickname.textContent,
                                    photoURL: url
                                })
                                this.userImage = url
                            })
                        })
                        .catch(()=>{
                            alert(this.texts[11][this.language])
                        })
                    })
                    .then(() => {
                        this.keepSaving()
                    })
                    .catch((error) => {
                        this.editErrorManager(1)
                    })
                }
                else{
                    try{
                        updateProfile(auth.currentUser, {displayName: nickname.textContent})
                        .then(()=>{
                            this.keepSaving()
                        })
                    }catch(error){
                        alert(this.texts[11][this.language])                        
                    }
                }                
            })
            .catch((error) => {
                alert(this.texts[11][this.language])
            });
        },

        editErrorManager(errorLaunchPosition){
            if(errorLaunchPosition == 0){
                alert(this.texts[45][this.language])
                this.launchModal()
                setTimeout(()=>{
                    router.push({ path: '/account' })
                },1000)
                return 0
            }
            switch (errorLaunchPosition){
                default:
                    alert(this.texts[11][this.language])

                case 1:
                    alert(this.texts[11][this.language])
                    break

                case 2:
                    alert(this.texts[22][this.language])
                    alert(this.texts[46][this.language])
                    break

                case 3:
                    alert(this.texts[30][this.language])
                    alert(this.texts[46][this.language])
                    break

                case 4:
                    alert(this.texts[28][this.language])
                    alert(this.texts[47][this.language])
                    break
            }
        },

        keepSaving(){
            const auth = getAuth();
            const user = auth.currentUser;
            let email = document.getElementById("newEmail")
            email = email.value
            if(this.onlyNickname){
                if(email.length > 0){
                    updateEmail(user, email).then(() => {})
                    .catch((error)=>{
                        if(error.code == "invalid-email"){
                            this.editErrorManager(2)
                            return 0
                        }
                        else if (error.code == "auth/email-already-in-use"){
                            this.editErrorManager(3)
                            return 0
                        }
                        this.editErrorManager(1)
                    })
                }
                this.editErrorManager(0)
                return 0
            }
            updateEmail(user, email)
            .then(() => {
                let password = document.getElementById("newPassword")

                updatePassword(user, password.value)
                .then(()=>{this.editErrorManager(0)})
                .catch((error)=>{
                    if(error.code == "auth/weak-password"){
                        this.editErrorManager(4)
                        return 0
                    }
                    this.editErrorManager(1)
                })
            })
            .catch((error)=>{
                if(error.code == "invalid-email"){
                    this.editErrorManager(2)
                    return 0
                }
                else if (error.code == "auth/email-already-in-use"){
                    this.editErrorManager(3)
                    return 0
                }
                this.editErrorManager(1)
            })
        },

        requestFile(type){
            let file = document.createElement("input")
            file.type = "file"
            if(type == "img"){
                file.accept = ".png, .webp, .jpg, .jpeg"
                file.click()

                file.addEventListener("change", ()=>{
                    if(file.files.length != 0){
                        let img = file.files[0]
                        if(img.type == "image/png" || img.type == "image/webp" || img.type == "image/jpg" || img.type == "image/jpeg"){
                            if(img.size <= "104857600"){

                                if(router.currentRoute._value.path == "/upload"){
                                    document.getElementById("toUpload").style.display = "none"
                                    document.getElementById("img").hidden = false
                                    document.getElementById("change").hidden = false
                                    document.getElementsByClassName("img-container")[0].style.width = "100%"
                                    document.getElementsByClassName("img-container")[0].style.height = "100%"
                                    this.imgToUpload = img
                                    this.imgUpload = URL.createObjectURL(img)
                                }
                                else{
                                    this.userImage = URL.createObjectURL(img)
                                    this.img = img
                                    this.imageChanged = true
                                }
                            }
                            else{
                                alert(this.texts[49][this.language])
                            }
                        }
                        else{
                            alert(this.texts[50][this.language])
                        }
                    }
                })
            }
            else{
                file.accept = ".wav, .mp3, .ogg"
                file.click()

                file.addEventListener("change", ()=>{
                    if(file.files.length != 0){
                        let audio = file.files[0]
                        if(audio.type == "audio/wav" || audio.type == "audio/mpeg" || audio.type == "audio/ogg"){
                            if(audio.size <= "104857600"){
                                
                                const saveAudio = new Promise((resolve) => {
                                    this.audioToUpload = audio
                                    audio = URL.createObjectURL(audio)
                                    resolve()
                                })
                                
                                saveAudio.then(()=>{
                                    this.audioUpload = audio
                                })
                            }
                            else{
                                alert(this.texts[49][this.language])
                            }
                        }
                        else{
                            alert(this.texts[50][this.language])
                        }
                    }
                })
            }
        },

        forgotPassword(){
            const auth = getAuth();

            auth.useDeviceLanguage()

            let email = document.getElementById("email")
            email = email.value
            sendPasswordResetEmail(auth, email)
            .then(()=>{
                alert(this.texts[54][this.language])
                setTimeout(()=>{
                    router.push({ path: '/login' })
                },1000)
            })
            .catch((error)=>{
                switch (error.code) {
                    case "auth/invalid-email":
                        alert(this.texts[22][this.language])
                        break
                    case "auth/user-not-found":
                        alert(this.texts[23][this.language])
                        break
                    default:
                        alert(this.texts[11][this.language])
                }
            })
        },

        createWave(){
            this.wavesurfer = WaveSurfer.create({
                container: '#waveform',
                waveColor: '#D2B8D3',
                progressColor: '#a48ba5',
                barWidth: 5,
                barRadius: 3,
                cursorWidth: 0,
                height: 200,
                barGap: 3,
                minPxPerSec: 100,
                scrollParent: true,
                hideScrollbar: true,
                interact: false,
                responsive: true,
                loopSelection: false
            })
            this.wavesurfer.load(`${this.songsReferences[this.songIndex]}`)

            let startPoint = this.rangeValue / 100

            this.wavesurfer.on('ready', () => {
                this.wavesurfer.setMute(true)
                this.wavesurfer.seekTo(startPoint)

                const song = document.getElementById("song")
                song.paused == false ? this.wavesurfer.play() : ""
            })
        },
        
        toogleWave(){
            if(!this.showSettings){
                if(!this.loadWave){
                    this.createWave()
                    this.loadWave = true
                }
                const img = document.getElementById("img")
                const img2 = document.getElementById("img2")
                const wave = document.getElementById("waveform")
                if(this.tablet){
                    const waveIcon = document.getElementById("waveIcon")
                    !this.showingWave ? waveIcon.style = `background: rgba(0, 0, 0, 0.4);` : waveIcon.style = ``
                }
                
                if(wave.firstChild == null && this.showingWave == false){
                    this.createWave()
                }
                if(!this.showingWave){
                    const saveValues = new Promise((resolve) => {
                        this.saveImgState[0] = img.classList.toString()
                        this.saveImgState[1] = img.style.opacity
                        this.saveImgState[2] = img2.classList.toString()
                        this.saveImgState[3] = img2.style.opacity
                        resolve()
                    })
                    saveValues.then(() => {
                        this.showingWave = !this.showingWave
                        img.style.opacity = "0"
                        img2.style.opacity = "0"
                        setTimeout(() => {
                            wave.style.position = "relative",
                            img.classList = "absolute2",
                            img2.classList = "absolute2"
                        }, 300)
                    })
                }
                else{
                    this.showingWave = !this.showingWave
                    wave.style.position = "absolute"
                    this.fading()
                }
            }
            else{
                const waveIcon = document.getElementById("waveIcon")
                !this.showingWave ? waveIcon.style = `background: rgba(0, 0, 0, 0.4);` : waveIcon.style = ``
                this.showingWave = !this.showingWave
            }
        },

        activateScrollbar(){
            document.querySelector("body").style.overflowY = "auto"
        },

        add(){
            this.showPlaylists == false ? router.push({ path: "/upload"}) : ""
        },

        uploadSong(){
            const name = document.getElementById("songName").textContent
            const artist = document.getElementById("artistName").textContent
            let prevent = false

            if(name == `${this.texts[66][this.language]} `){
                alert(this.texts[71][this.language])
                prevent = true
            }

            if(artist == `${this.texts[67][this.language]} `){
                alert(this.texts[72][this.language])
                prevent = true
            }

            if(this.audioUpload == ""){
                alert(this.texts[73][this.language])
                prevent = true
            }

            if(this.imgUpload == ""){
                alert(this.texts[74][this.language])
                prevent = true
            }

            if(!prevent){
                // this.showModal2 = true
                this.play()
                this.launchModal()

                const storage = getStorage();

                let extension = this.imgToUpload.type.split("/")[1]
                const fullName = `${name}.${extension}`
                
                let extension2 = this.audioToUpload.type.split("/")[1]
                const fullName2 = `${name}.${extension2}`

                const storageRef = ref(storage,`Songs/${name} <!--|Space|--!> ${artist} <!--|Space|--!> ${extension} <!--|Space|--!> ${extension2}/${fullName}`)
                const storageRef2 = ref(storage,`Songs/${name} <!--|Space|--!> ${artist} <!--|Space|--!> ${extension} <!--|Space|--!> ${extension2}/${fullName2}`)

                const UploadImage = new Promise((resolve) => {
                    const upload = uploadBytesResumable (storageRef, this.imgToUpload)
                    upload.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        this.uploadProgress[0] = progress.toFixed() + '%'
                        },
                        (error) => {
                            alert(this.texts[11][this.language])
                            this.resetUpload()
                        },
                        ()=>{resolve()}
                    )
                })

                const UploadSong = new Promise((resolve) => {
                    const upload2 = uploadBytesResumable (storageRef2, this.audioToUpload)
                    upload2.on('state_changed', 
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        this.uploadProgress[1] = progress.toFixed() + '%'
                        },
                        (error) => {
                            alert(this.texts[11][this.language])
                            this.resetUpload()
                        },
                        ()=>{resolve()}
                    ) 
                })

                let final = 0
                
                UploadImage.then(()=>{
                    final++
                    if(final > 1){
                        this.updated = true
                        alert(this.texts[78][this.language])
                        this.resetUpload()
                    }
                })

                UploadSong.then(()=>{
                    final++
                    if(final > 1){
                        this.updated = true
                        alert(this.texts[78][this.language])
                        this.resetUpload()
                    }
                })
                
            }
        },
        resetUpload(){
            this.imgUpload = ""
            this.audioUpload = ""
            this.imgToUpload = ""
            this.audioToUpload = ""
            document.getElementById("toUpload").style.display = "grid"
            document.getElementById("song").src = ""
            document.getElementById("img").src = ""
            document.getElementById("img").hidden = true
            document.getElementById("change").hidden = true
            document.getElementsByClassName("img-container")[0].style.width = "0%"
            document.getElementsByClassName("img-container")[0].style.height = "0%"
            document.getElementById("songName").firstChild.textContent = this.texts[66][this.language]
            document.getElementById("artistName").firstChild.textContent = this.texts[67][this.language]
            this.rangeSize = `0% 100%`
            setTimeout(()=>{
                document.getElementById("range").value = 0
            },100)
            
            this.launchModal()
        },

        addEvent(){
            if(router.currentRoute._value.path == "/edit"){
                    let nickName = document.getElementById("nickname")
                    if(nickName == null){
                        setTimeout(()=>{
                            this.addEvent()
                        },100)
                        return 0
                    }
                    nickName.firstChild.addEventListener("blur", ()=>{
                        if(nickName.firstChild.textContent.length == 0){
                            nickName.firstChild.textContent = this.user.displayName
                        }
                    })
            }
            else{
                let name = document.getElementById("songName")
                let artist = document.getElementById("artistName")

                if(name == null || artist == null){
                    setTimeout(()=>{
                        this.addEvent()
                    },100)
                    return 0
                }
                
                name.firstChild.addEventListener("blur", ()=>{
                    if(name.firstChild.textContent.length == 0){
                        name.firstChild.textContent = this.texts[66][this.language]
                    }
                })
                
                artist.firstChild.addEventListener("blur", ()=>{
                    if(artist.firstChild.textContent.length == 0){
                        artist.firstChild.textContent = this.texts[67][this.language]
                    }
                })
            }


            document.addEventListener("drop", function(event) {
                var dataTransfer = event.dataTransfer;
                var isImage = false;
                
                if (dataTransfer.types && (dataTransfer.types.indexOf("Files") !== -1)) {
                    var files = dataTransfer.files;
                    for (var i = 0; i < files.length; i++) {
                        if (files[i].type.indexOf("image/") === 0) {
                            isImage = true;
                            break;
                        }
                    }
                }
                
                if (isImage) {
                    event.preventDefault();
                }
            })

            document.addEventListener("paste", function(event) {
                var dataTransfer = event.clipboardData;
                var isImage = false;
                
                if (dataTransfer.types && (dataTransfer.types.indexOf("Files") !== -1)) {
                    var files = dataTransfer.files;
                    for (var i = 0; i < files.length; i++) {
                        if (files[i].type.indexOf("image/") === 0) {
                            isImage = true;
                            break;
                        }
                    }
                }
                
                if (isImage) {
                    event.preventDefault();
                }
            })
        },

        askHowManySongs(){
            if(document.getElementById("checkbox").checked){
                let num = prompt(this.texts[79][this.language])
                if(num != null && isNaN(num) == false && num >= 2){
                    num = parseInt(num)
                    this.songsQuantity = num
                }
                else{
                    num == 1 ? "" : alert(this.texts[11][this.language])
                    document.getElementById("checkbox").checked = false
                }
            }
            else{
                this.songsQuantity = 1
            }
        }
    }
})