<script setup>
import { ref } from 'vue';
import MyButton from './button/MyButton.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth/useAuthStore.js';

const router = useRouter();
const authStore = useAuthStore();

const redirectMain = () => {
  router.push('/');
}
const redirectLogin = () => {
  router.push('/login');
}
const redirectRegistration = () => {
  router.push('/registration');
}
const logout = async () => {
  await authStore.logout();
  router.replace('/');
}
</script>

<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title" @click="redirectMain()">Meerkatgram</h1>
    </div>
    <div class="button-box">
      <MyButton
        v-if="!authStore.isLoggedIn"
        :content="'Sign in'" 
        :color="'gray'" 
        :size="'small'"
        @click="redirectLogin()"
      />
      <MyButton
        v-if="!authStore.isLoggedIn"     
        :content="'Sign up'" 
        :color="'white'" 
        :size="'small'"
        @click="redirectRegistration()"
      />
      <MyButton
        v-if="authStore.isLoggedIn"
        :content="'Logout'"
        :color="'black'" 
        :size="'small'"
        @click="logout()"
      />
    </div>
  </div>
  <hr>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.title-box {
  display: flex;
  align-items: center;
}

.title {
  font-size: 20px;
}

.button-box {
  display: flex;
  gap: 10px;
}



</style>
