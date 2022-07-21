import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/help",
    name: "help",
    component: () =>
      import(/* webpackChunkName: "help" */ "@/views/HelpView.vue"),
  },
  {
    path: "/donate",
    name: "donate",
    component: () =>
      import(/* webpackChunkName: "bubbles" */ "@/views/DonateView.vue"),
  },
  {
    path: "/bubbles",
    name: "bubbles",
    component: () =>
      import(
        /* webpackChunkName: "bubbles" */ "@/views/bubble/BubblesLandingView.vue"
      ),
  },
  {
    path: "/bubbles/of-mine",
    name: "myBubbles",
    component: () =>
      import(
        /* webpackChunkName: "bubbles" */ "@/views/bubble/MyBubblesView.vue"
      ),
  },
  {
    path: "/bubbles/find",
    name: "bubbleSearch",
    component: () =>
      import(
        /* webpackChunkName: "bubbles" */ "@/views/bubble/BubbleSearchView.vue"
      ),
  },
  {
    path: "/elections",
    name: "elections",
    component: () =>
      import(
        /* webpackChunkName: "elections" */ "@/views/election/ElectionLandingView.vue"
      ),
  },
  {
    path: "/elections/of-mine",
    name: "myElections",
    component: () =>
      import(
        /* webpackChunkName: "elections" */ "@/views/election/MyElectionsView.vue"
      ),
  },
  {
    path: "/elections/search",
    name: "electionFilter",
    component: () =>
      import(
        /* webpackChunkName: "elections" */ "@/views/election/ElectionFilterView.vue"
      ),
  },
  {
    path: "/elections/:id",
    name: "electionSearchHighlight",
    component: () =>
      import(
        /* webpackChunkName: "elections" */ "@/views/election/ElectionView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 82, left: 0, behavior: "smooth" };
  },
});

export { routes };

export default router;
