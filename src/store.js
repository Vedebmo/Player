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
        songTime: 0
    }),

    actions:{
        changeTablet(){
            window.innerWidth >= 768 ? this.tablet = true : this.tablet = false
        },
        launchSettings(){
            this.showSettings = !this.showSettings
        },
        play(){
            const song = document.getElementById("song")
            this.icon == "icon-pause2" ? (this.icon = "triangle", song.pause() ) : (this.icon = "icon-pause2", song.play())
        },
        movingSong(){
            const range = document.getElementById("range")
            const song = document.getElementById("song")
            const porcentage = range.value / 100
            this.songTime = song.duration * porcentage
            song.currentTime = this.songTime
        }
    }
})