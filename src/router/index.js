import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { useAuthStore } from "@/stores/auth.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/panels/:id",
    name: "competition",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/CompetitionView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/authentication",
    name: "authentication",
    component: () => import("../views/AuthView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return { el: to.hash };
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to) => {
  const { authenticated } = useAuthStore();
  if (to.meta.requiresAuth) {
    if (!authenticated) {
      return { name: "authentication" };
    }
  }
  if (to.name === "authentication" && authenticated) {
    return { name: "home" };
  }
});

export default router;
