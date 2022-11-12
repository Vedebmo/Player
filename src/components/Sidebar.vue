<template>
    <div class="sideBar">
        <input type="text" placeholder="Search 🔍">
        <div class="options">
            <div>
                <span class="icon-user"></span>
                <a href="#">Account</a>
            </div>
            <hr>
            <div>
                <span class="icon-playlist_play"></span>
                <a href="#">Manage Songs</a>
            </div>
            <hr>
            <div>
                <span class="icon-googlepodcasts"></span>
                <a href="#">Wave Mode</a>
            </div>
            <hr>
            <div>
                <span class="icon-language2"></span>
                <a href="#">English ></a>
            </div>
        </div>
        <Lowerbar></Lowerbar>
    </div>
</template>

<style scoped>

.sideBar{
    margin-left: 1.2em ;
    align-items: center;
    background: rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    height: 100vh;
}

input{
    width: 90%;
    text-align: center;
    font-size: 1.2em;
    margin-top: 7%;
    height: fit-content;
}

.options{
    width: 100%;
    height: 70%;
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}
.options div{
    display: flex;
    place-items: center;
    text-align: center;
    max-width: 70%;
}

span{
    font-size: 3.5em;
    color: #D2B8D3;
    margin-right: 15px;
}

.icon-googlepodcasts:before{
    color: #D2B8D3;
}

a{
    text-decoration: none;
    color: white;
    font-size: 2rem;
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