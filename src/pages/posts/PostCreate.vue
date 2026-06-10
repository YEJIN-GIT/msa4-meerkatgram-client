<script setup>
import { reactive, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import { useFileStore } from '../../store/file/useFileStore.js';
import { useRoute, useRouter } from 'vue-router';
import myAxios from '../../api/myAxios.js';
import { useAuthStore } from '../../store/auth/useAuthStore.js';
import postValidator from '../../util/validator/domain/postValidator.js';

const route = useRoute(); // useRoute 현재 정보
const router = useRouter();
const fileStore = useFileStore();
const authStore = useAuthStore();

const preview = ref(null);
const selectedFile = ref(null);
const createData = reactive({
  userId: authStore.userInfo.id,
  content: '',
  image: '',
});

const handleSubmit = async () => {
  // 유효성 검사
  const validationList = [
    postValidator.userId(createData.userId),
    postValidator.content(createData.content),
    postValidator.image(createData.image)
  ];
  const errorList = validationList.filter(val => val);

  if(errorList.length > 0) {    
    alert(errorList.join('\n'));
    return;
  }

  // API 게시글 작성 요청
  try {
    const url = '/api/posts';

    const res = await myAxios.post(url, createData);
    const data = res.data.data;
    const newId = data.id;  // 새 게시글 아이디

    // 작성한 게시글 상세페이지 출력
    router.replace(`/posts/${newId}`);
    
  } catch (error) {
    const data = error.response.data;
    if(data.code === 'E11') {
      alert(data.data);
    } else if(data.code === 'E21') {
      alert("잘못된 양식");
    } else {
      myErrorStore.setErrorInfo(error);
      router.replace('/error');
    }
  }
}

const handleChangePost = async (e) => {
  const file = e.target.files[0];

  if(file) {
    if(preview.value) {
      // 기존에 생성된 메모리 URL이 있다면 해제 (메모리 누수 방지)
      // (브라우저가 임시경로에 저장해 둔 파일경로를 지움)
      URL.revokeObjectURL(preview.value);
    }

    // API 서버에 파일 저장 요청
    const fileUri = await fileStore.uploadPost(file);

    if(fileUri) {
      createData.image = fileUri;
      
      selectedFile.value = file;

      // 파일 객체를 브라우저에서 접근 가능한 임시URL로 변환
      preview.value = URL.createObjectURL(file);
    }

  }
}
</script>

<template>
<form @submit.prevent="handleSubmit">
  <div class="content-box">
    <textarea
      name="content" id="content" placeholder="내용 작성"
      v-model="createData.content"
    ></textarea>
  </div>
  <div class="file-box">
    <input
      type="file" 
      accept="image/*"
      @change="handleChangePost"
    >
  </div>
  <MyButton
    :btn-type="'submit'"
    :color="'gray'"
    :size="'middle'"
    :content="'Write'"
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

.content-box {
  padding: 0 20px;
  width: 100%;
}

.file-box {
  padding: 0 20px;
  width: 100%;
}

textarea {
  padding: 10px;
  width: 100%;
  height: 180px;
  font-size: 24px;
  outline: none;
  border-radius: 10px;
}
</style>
