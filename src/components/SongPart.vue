<template>
    <div class="SongPart">
        <div class="img-container">
            <img src="https://images.ctfassets.net/ooa29xqb8tix/2kh6DglGrYaCilyBdGd6br/4297a58a54eaa58a11c5bc31271ee798/3.png" alt="">
        </div>
        <div class="song">
            <div class="id">
                <h2>Name</h2>
                <h3> {{ store.texts[84][store.language] }} Artist</h3>
            </div>
            <div class="input" v-if="store.editPlaylists">
                <span class="icon-bin2"></span>
                <span class="icon-menu"></span>
            </div>
            <div class="input" v-else>
                <!-- <button>{{ store.texts[60][store.language] }}</button> -->
                <button class="btn" @click="store.playlistManager('addSong')">{{ store.texts[60][store.language] }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {Store} from "../store.js"
    const store = Store()
</script>

<script>
    import {Store} from "../store.js"
    const store = Store()

    export default{
        name: "SongPart",
        mounted(){
            let btns = document.querySelectorAll('button.btn')
            let index = 0
            let data
            let files = []
            btns.forEach((btn)=>{
                index += 1
                files.push([btn, index])

                btn.addEventListener("mouseover", (e) =>{
                    data = e.target
                    for (let i = 0; i < files.length; i++) {
                        const subArray = files[i];
                        if (subArray.includes(data)) {
                            store.playlistManager(['preRemove', i])
                        }
                    }
                })

                btn.addEventListener("mouseleave", (e) =>{
                    data = e.target
                    for (let i = 0; i < files.length; i++) {
                        const subArray = files[i];
                        if (subArray.includes(data)) {
                            store.playlistManager(['preLeave', i])
                        }
                    }
                })
            })
        }
    }
</script>

<style scoped>

    .SongPart{
        padding: 3%;
        display: flex;
        /* align-items: center; */
        align-items: center;
        margin: 0% 0% 5% 0%;
        /* background-color: #D2B8D3; */
    }

    .img-container{
        width: 60%;
        height: 7em;
    }

    img{
        width: 100%;
        height: 100%;
        border-radius: 15px;
    }

    .song{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin-left: 5%;
    }
    
    .input{
        margin: 5%;
        align-self: center;
        display: flex;
        justify-content: space-around;
        flex-grow: 10;
        font-size: 280%;
        width: 100%;
    }

    .input *{
        cursor: pointer;
    }

    .id{
        font-size: small;
        color: white;
        height: fit-content;
    }

    .id *{
        margin: 0;
    }

    .id h3{
        margin-left: 10%;
    }

    button{
        display: block;
        width: fit-content;
        border: none;
        background-color: rgba(0, 0, 0, .5);
        color: white;
        border-radius: 5px;
        font-size: 50%;
        padding: 10%;
        margin-bottom: 2%;
        transition: all .5s ease-in-out;
    }

    button:hover{
        cursor: pointer;
        background-color: black;
    }

</style>