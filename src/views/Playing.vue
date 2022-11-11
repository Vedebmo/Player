<template>
    <header>
      <!--Image-->
      
      <div class="img-container">
        <img src="@/assets/orgullo.png" alt="Image not found">
      </div>
  
      <!--Titles-->
  
      <div class="titles">
        <h1><b>Orgullo</b></h1>
        <h5><small>C Monti</small></h5>
      </div>
  
      <!--Options-->
  
      <div class="options">
        <div class="left">
          <span class="icon-download"></span>
          <span class="icon-plus"></span>
          <span class="icon-heart"></span>
          <span class="icon-volume-medium"></span>
        </div>
        <div class="right">
          <h5>1:20 / 3:44</h5>
        </div>
      </div>
  
      <!--Progress Bar-->
      
      <ProgressBar></ProgressBar>
      <Lowerbar></Lowerbar>

    </header>
    
  </template>
  
  <style src="@/assets/icomoon/style.css"></style>
  
  <style scoped>
    .img-container{
       margin-top: 7%;
    }
  
    img{
      width: 100%;
      max-height: 55vh;
    }
  
    h1, h5{
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      margin: 0;
      text-align: center;
      color: white;
    }
  
    h5{
      margin-top: 1%;
      font-weight: lighter;
    }
  
    .options{
      display: inline-flex;
      height: 3vh;
      width: 80%;
      margin: 0.5em 10% 0 10%;
    }
  
    .right, .left{
      display: flex;
      place-items: center;
      flex-grow: 1;
      height: 100%;
    }
    
    .right{
      flex-direction: row-reverse;
    }

    .left span{
      color: white;
      margin: 0 7% 0 0;
      /* font-size: 1.19em; */
    }
  
    .right h5{
      color: #E2E2E2;
      margin-top: 1em;
    }
  </style>

<script>

  import ProgressBar from '../components/ProgressBar.vue';
  import Lowerbar from '../components/Lowerbar.vue';

    export default{
        name: "Playing",
        components: {
            ProgressBar, Lowerbar
        }
    }
</script>