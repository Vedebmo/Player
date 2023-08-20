<script setup>
import {RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
  
</template>

<style src="@/assets/icomoon/style.css"></style>

<style>
  body{
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background: #201C29;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  /* ScrollBar */
  html{
    scroll-behavior: smooth;
  }
  
  ::-webkit-scrollbar {
      width: 15px;
  }

  ::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.3);
  }
  
  ::-webkit-scrollbar-thumb {
      background: white;
      border-radius: 10px;
  }
</style>