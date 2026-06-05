<script setup>
import Header from './components/Header.vue';
import UserInfo from './components/UserInfo.vue';
import PostIndex from './pages/posts/PostIndex.vue';
import router from './routes/router.js';

// TODO
console.log(router.getRoutes())
</script>

<template>
  <Header />
  <UserInfo />  
  <router-view></router-view>
</template>
