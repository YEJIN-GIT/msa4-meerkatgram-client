<script setup>
import Header from './components/Header.vue';
import Main from './components/Main.vue';
import PostIndex from './pages/posts/PostIndex.vue';
import router from './routes/router.js';

// TODO
console.log(router.getRoutes())
</script>

<template>
  <Header />
  <hr>  
  <Main></Main>
</template>
