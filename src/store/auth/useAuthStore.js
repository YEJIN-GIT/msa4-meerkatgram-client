import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/myAxios";
import { useMyErrorStore } from "../error/useMyErrorStore";

export const useAuthStore = defineStore('authStore', () => {
  // 1. State
  const isLoggedIn = ref(false);
  const accessToken = ref('');
  const userInfo = ref(null);

  // 2. Getters  

  // 3. Actions
  const clearAuthStore = () => {
    isLoggedIn.value = false;
    accessToken.value = '';
    userInfo.value = null;
  }

  const login = async (loginForm) => {
    try {
      const url = '/api/login';

      const res = await myAxios.post(url, loginForm);
      const data = res.data.data;
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true;

    } catch (error) {
      if(error.response) {  // 레스폰스 데이터가 있는 경우
        if(error.response.data.code === 'E01') {
          alert(error.response.data.data);
          return;
        }
      }

      useMyErrorStore().setErrorInfo(error);
    }
  }

  return {
    // 1. State
    isLoggedIn,
    accessToken,
    userInfo,
    
    // 2. Getters

    // 3. Actions
    clearAuthStore,
    login,
  }

});
