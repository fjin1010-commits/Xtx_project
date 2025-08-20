import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/login/indexPage.vue";
import IndexPage from "../views/layout/indexPage.vue";
import CategoryPage from "../views/Category/indexPage.vue";
import HomePage from "../views/Home/indexPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
   
    {
      path: "/",
      component: IndexPage,
      children:[{
        path:"",
        component: HomePage
      },{
        path:"/category/:id",
        component: CategoryPage
      }]
    },
     {
      path: "/login",
      component: LoginPage,
    }
  ],
});

export default router;
