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
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult, setPersistence, browserLocalPersistence, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, reauthenticateWithCredential, deleteUser, EmailAuthProvider, fetchSignInMethodsForEmail, reauthenticateWithPopup, updateEmail, updatePassword } from "firebase/auth";

import { getStorage, ref, getDownloadURL, listAll, uploadBytes } from "firebase/storage";
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

let userLang = navigator.language || navigator.userLanguage;
userLang = userLang[0] + userLang[1]

export const Store = defineStore('Store', {
    state: () => ({
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
                    router.currentRoute._value.path == "/account" ? router.push({ path: '/login' }) : ""
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
                this.modalPosition == "100vw" ? (this.modalPosition = "auto", this.modalOpacity = 1) : (this.modalOpacity = 0, setTimeout(()=>{
                    this.modalPosition = "100vw"  
                    this.lookForCredentials = false
                },500))
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
        editDisplayName(input){
            input == "In" ? (this.showPencil = false) : this.showPencil = true
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
            if(this.onlyNickname){
                this.editErrorManager(0)
                return 0
            }

            let email = document.getElementById("newEmail")
            updateEmail(user, email.value)
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

        requestPhoto(){
            let file = document.createElement("input")
            file.type = "file"
            file.accept = ".png, .webp, .jpg, .jpeg"
            file.click()

            file.addEventListener("change", ()=>{
                if(file.files.length != 0){
                    let img = file.files[0]
                    if(img.type == "image/png" || img.type == "image/webp" || img.type == "image/jpg" || img.type == "image/jpeg"){
                        if(img.size <= "5242880"){
                            this.userImage = URL.createObjectURL(img)
                            this.img = img
                            this.imageChanged = true
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
    }
})