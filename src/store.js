import { defineStore } from "pinia"

export const Store = defineStore('Store', {
    state: () => ({
        tablet: false,
        showSettings: false
    }),

    actions:{
        changeTablet(){
            window.innerWidth >= 768 ? this.tablet = true : this.tablet = false
        },
        launchSettings(){
            this.showSettings = !this.showSettings
        }
    }
})