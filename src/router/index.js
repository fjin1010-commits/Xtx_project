import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/login/indexPage.vue";
import IndexPage from "../views/layout/indexPage.vue";
import CategoryPage from "../views/Category/indexPage.vue";
import HomePage from "../views/Home/indexPage.vue";
import SubCategoryPage from "../views/SubCategory/indexPage.vue";
import DetailPage from "../views/Detail/indexPage.vue";
import cartListPage from "../views/CartList/indexPage.vue";
import CheckoutPage from "../views/Checkout/indexPage.vue";
import PaymentPage from "../views/pay/indexPage.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: IndexPage,
      children: [
        {
          path: "",
          component: HomePage,
        },
        {
          path: "/category/:id",
          component: CategoryPage,
        },
        {
          path: "/category/sub/:id",
          component: SubCategoryPage,
        },
        {
          path: "/detail/:id",
          component: DetailPage,
        },
        {
          path: "/cartlist/:userId",
          component: cartListPage,
        },
        {
          path: "/checkout/:userId",
          component: CheckoutPage,
        },
        {
          path: "/payment/:orderId",
          component: PaymentPage,
        }
      ],
    },
    {
      path: "/login",
      component: LoginPage,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
