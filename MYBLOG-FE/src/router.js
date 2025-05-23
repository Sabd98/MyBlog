// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import PostsList from "./components/blog-resources/StoredPosts.vue";
import PostDetail from "./components/blog-resources/PostDetail.vue";
import Home from "./pages/home.vue";

//Routes Value
const routes = [
  {
    path: "/",
    component: PostsList,
    name: "Home",
    component: Home,
  },
  {
    path: "/:id",
    name: "PostDetail",
    component: PostDetail,
    props: true,
  },
];

//Route config
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

export default router;
