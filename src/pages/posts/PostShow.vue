<script setup>
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostShowStore } from '../../store/post/usePostShowStore';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { useMyErrorStore } from '../../store/error/useMyErrorStore';

const route = useRoute(); // useRoute 현재 정보
const router = useRouter();
const postShowStore = usePostShowStore();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();

const deletePost = async () => {
  // 예 경우 삭제 처리
  try {
    // TODO: 파일 삭제 처리

    await postShowStore.deletePost(route.params.id);    

    // TODO: 내정보 게시글수 갱신

    // 게시글 목록페이지로 이동
    router.replace('/posts');
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace('/error');
  }
}

// console.log(route.params.id);

// ------------------
// 라이프 사이클
// ------------------
onBeforeMount(async () => {
  try {
    await postShowStore.getPost(route.params.id);
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace('/error');
  }
});
onBeforeUnmount(postShowStore.clearPostShow); // 최근 봤던 게시글 상세페이지 잠깐 보이는 현상 방지
</script>

<template>
<div class="container" v-if="postShowStore.post">
  <div class="image" :style="{backgroundImage: `url(${postShowStore.post.image})`}"></div>
  <div class="option-box">
    <div class="delete-box">
      <div 
        class="delete-icon"
        v-if="postShowStore.post.userId === authStore.userInfo.id"
        @click="deletePost()"
      ></div>
    </div>
    <div class="like-box">
      <span>1919</span>
      <div class="like-icon"></div>
    </div>
  </div>
  <p class="content">{{ postShowStore.post.content }}</p>
</div>
</template>

<style scoped>
.container {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.image {
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.option-box {
  padding: 15px;
  display: flex;
  justify-content: space-between;
}

.like-box {
  display: flex;
  gap: 10px;  
}

.delete-icon {
  width: 40px;
  height: 50px;
  background-image: url('/icons/trash-can.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.like-icon {
  width: 40px;
  height: 40px;
  background-image: url('/icons/heart-fill.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.content {
  white-space: pre-wrap;
}
</style>
