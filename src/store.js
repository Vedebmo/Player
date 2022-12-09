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

import { getStorage, ref, getDownloadURL } from "firebase/storage";
const storage = getStorage();
const storageRef = ref(storage);
const imageRef = ref(storageRef, 'Songs/Orgullo/orgullo.png');
const songRef = ref(storageRef, 'Songs/Orgullo/Orgullo.mp3');

const image = await getDownloadURL(imageRef)
const song = await getDownloadURL(songRef)

export const Store = defineStore('Store', {
    state: () => ({
        tablet: false,
        showSettings: false,
        image,
        song,
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
            },300)
        },
        launchSettings(){
            this.showSettings = !this.showSettings
        },
        play(){
            const song = document.getElementById("song")
            
            let test = setInterval(()=>{
                const range = document.getElementById("range")
                const song = document.getElementById("song")
                
                range.value = (song.currentTime / song.duration) * 100
                this.rangeSize = `${range.value}% 100%`

                this.checkSong()

                this.icon == "triangle" ? clearInterval(test) : ""
            },1)

            this.icon == "icon-pause2" ? (this.icon = "triangle", song.pause() ) : (this.icon = "icon-pause2", song.play())
        },
        movingSong(){
            this.checkSong()
            const range = document.getElementById("range")
            const song = document.getElementById("song")
            const porcentage = range.value / 100
            this.songTime = song.duration * porcentage
            song.currentTime = this.songTime
            this.rangeSize = `${range.value}% 100%`
        },
        checkSong(){
            const song = document.getElementById("song")
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
        }
    }
})