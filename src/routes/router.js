import MyError from "../pages/posts/errors/MyError.vue";
import PostIndex from "../pages/posts/PostIndex.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/posts'
  },
  // 게시글 관련
  {
    path: '/posts',
    component: PostIndex,
  },
];

const router = createRouter({  
  history: createWebHistory(),
  routes,
});

export default router;
