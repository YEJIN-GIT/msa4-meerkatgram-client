<script setup>
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import MyInput from '../../components/input/MyInput.vue';
import MyStrikeThroughBehindWord from '../../components/decoration/MyStrikeThroughBehindWord.vue';
import { useAuthStore } from '../../store/auth/useAuthStore.js';
import loginValidator from '../../util/validator/domain/auth/loginValidator.js';

const router = useRouter();
const authStore = useAuthStore();
const loginForm = reactive({
  email: '',
  password: '',
});

const handleSubmit = async () => {
  // 1. 유효성 검사
  const resultValidationEmail = loginValidator.email(loginForm.email);
  const resultValidationPassword = loginValidator.password(loginForm.password);

  if(!resultValidationEmail && !resultValidationPassword) { // JavaScript 에서 빈문자열 null 을 false로 인식한다.
    // 2. 로그인 처리    
    await authStore.login(loginForm);
    router.replace('/posts');    
  } else {
    // 유효성 검사 실패
    alert(`${resultValidationEmail}\n${resultValidationPassword}`);
  }
}
</script>

<template>
<form @submit.prevent="handleSubmit">
  <MyInput
    :type="'email'"
    :placeholder="'Email'"
    :readonly="false"
    :required="true"
    v-model="loginForm.email"
  ></MyInput>
  <MyInput
    :type="'password'"
    :placeholder="'Password'"
    :readonly="false"
    :required="true"
    v-model="loginForm.password"
  ></MyInput>
  <MyButton
  :btn-type="'submit'"
  :color="'gray'"
  :size="'middle'"
  :content="'Log in'"
  />
  <MyStrikeThroughBehindWord
    :content="'or'"
  ></MyStrikeThroughBehindWord>
  <MyButton
  :btn-type="'button'"
  :color="'white'"
  :size="'middle'"
  :content="'Sign up'"
  />
</form>
</template>

<style scoped>
form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
