<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import {RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
  
</template>

<style>
  body{
    background: #201C29;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  /* ScrollBar */

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