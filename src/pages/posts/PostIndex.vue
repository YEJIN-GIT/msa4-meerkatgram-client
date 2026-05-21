<script setup>
import { onBeforeMount, ref } from 'vue';
import MyButton from '../../components/button/MyButton.vue';
import myAxios from '../../api/myAxios.js';

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

const posts = ref([]);
const isLostPage = ref(false);
let currentPage = 1;


// 함수
// 함수 선언식 : 중복된 함수 선언시 기존꺼 덮어씀 주의.
// 함수 표현식 : hosting 이 안되므로 사용전에 항상 선언해야 함. 정의하고 아래줄에 코딩.
const getPostPagenation = async () => {
  // 마지막 페이지가 아닐 경우만 실행
  if(!isLastPage.value ) {
    try {
      const url = '/api/posts';
      const params = {
        page: currentPage,
      };  // params 이름 고정!!

      const res = await myAxios.get(url, { params });
      // console.log(res.data);
      const data = res.data.data;      
      isLastPage.value = data.lastPage;
      posts.value.push(...data.posts);
    } catch(error) {
      console.error(error);
    }
  }
}

// ------------------
// -- 라이프 사이클
// ------------------
onBeforeMount(getPostPagenation);
</script>

<template>  
  <div class="card-container">
    <div 
      class="card"
      v-for="item in posts"
      :key="item.id"
      :style="{backgroundImage: `url(${item.image})`}"
    ></div>
  </div>
  <MyButton
    v-if="!isLastPage"
    :content="'Show more posts from YEJIN'" 
    :color="'gray'" 
    :size="'big'"
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
