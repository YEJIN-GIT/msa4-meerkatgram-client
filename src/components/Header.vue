<script setup>
import { ref } from 'vue';
import MyButton from './button/MyButton.vue';

// TODO : 로그인 추가시 변경 필요 START
const isLoggedIn = ref(false);
// TODO : 로그인 추가시 변경 필요 END
</script>

<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title">Meerkatgram</h1>
    </div>
    <div class="button-box">
      <MyButton
        v-if="!isLoggedIn"
        :content="'Sign in'" 
        :color="'gray'" 
        :size="'small'"
      />
      <MyButton
        v-if="!isLoggedIn" 
        :content="'Sign up'" 
        :color="'white'" 
        :size="'small'"
      />
      <MyButton
        v-if="isLoggedIn"
        :content="'Sign out'" 
        :color="'black'" 
        :size="'small'"
      />
    </div>
  </div>

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
