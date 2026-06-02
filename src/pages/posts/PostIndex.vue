<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import { usePostIndexStore } from '../../store/post/usePostIndexStore.js';
import { useRouter } from 'vue-router';
// import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';
// import { useRouter } from 'vue-router';

// TODO: 테스트용 나중에 삭제 START
const testList = [
  "/test/images1.jpg",
  "/test/images2.jpg",
  "/test/images3.jpg",
  "/test/images4.png",
  "/test/images5.png",
  "/test/images6.jpg"
];
const isLastPage = ref(false);
// TODO: 테스트용 나중에 삭제 END



// ------------------- 스토어로 이관 start -------------------
// const posts = ref([]);
// const isLostPage = ref(false);
// // let currentPage = 1;
// // (해결1)
// let currentPage = 0;

// 함수
// 함수 선언식 : 중복된 함수 선언시 기존꺼 덮어씀 주의.
// 함수 표현식 : hosting 이 안되므로 사용전에 항상 선언해야 함. 정의하고 아래줄에 코딩.
// page = 1 JavaScript 디폴트 값
// const getPostPagenation = async () => {
// (해결1)
// const getPostPagenation = async (page = 1) => {
//   // 마지막 페이지가 아닐 경우만 실행
//   if(!isLastPage.value ) {
//     try {
//       const url = '/api/posts';
//       const params = {
//         // page: currentPage,

//         // (해결1)
//         page,
//       };  // params 이름 고정!!

//       const res = await myAxios.get(url, { params });
//       // console.log(res.data);
//       const data = res.data.data;      
//       isLastPage.value = data.lastPage;
//       posts.value.push(...data.posts);

//       // (해결1)
//       currentPage++;
//     } catch(error) {
//       console.error(error);
//     }
//   }
// }
// ------------------- 스토어로 이관 end -------------------

const router = useRouter();
const postIndexStore = usePostIndexStore();
// const myErrorStore = useMyErrorStore();
// const router = useRouter();

// const paginationPorcess = async (page = 1) => {
//   try {
//     await postIndexStore.getPostPagenation(postIndexStore.getNextPageNumber);  
//   } catch (error) {    
//     myErrorStore.setErrorInfo(error);
//   }
// }

const getNextPage = async () => {
  // await paginationPorcess(postIndexStore.getNextPageNumber);
  await postIndexStore.getPostPagenation(postIndexStore.getNextPageNumber);
}

const redirectShow = async (id) => {
   router.push(`/posts/${id}`);
}

// ------------------
// -- 라이프 사이클
// ------------------
// onBeforeMount(paginationPorcess);
onBeforeMount(postIndexStore.getPostPagenation);
onBeforeUnmount(postIndexStore.clearPostIndex);
</script>

<template>  
  <div class="card-container">
    <div 
      class="card"
      v-for="item in postIndexStore.items"
      :key="item.id"
      :style="{backgroundImage: `url(${item.image})`}"
       @click="redirectShow(item.id)"
    ></div>
  </div>
  <MyButton
    v-if="!postIndexStore.isLastPage"
    :content="'Show more posts from YEJIN'" 
    :color="'gray'" 
    :size="'big'"
    @click="getNextPage()"
  />
</template>

<style scoped>
.card-container {
  padding: 10px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));

}

.card {
  padding-top: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
}
</style>
