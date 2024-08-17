import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = false; // Replace this with your authentication logic
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next("/login");
//   } else {
//     next();
//   }
// });

export default router;
