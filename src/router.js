import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/season/:year",
      component: () =>
        import(/* webpackChunkName: "season" */ "./views/season/index.vue"),
      children: [
        {
          path: "",
          name: "seasonLanding",
          component: () =>
            import(/* webpackChunkName: "season" */ "./views/SeasonLandingPage.vue")
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: () =>
        import(/* webpackChunkName: "leaderboard" */ "./views/Leaderboard.vue")
    },
    {
      path: "/results/:weekend",
      component: () =>
        import(/* webpackChunkName: "results" */ "./views/results/index.vue"),
      children: [
        {
          path: "",
          name: "overview",
          component: () =>
            import(/* webpackChunkName: "results" */ "./views/results/overview.vue")
        },
        {
          path: "race",
          name: "race-results",
          component: () =>
            import(/* webpackChunkName: "results" */ "./views/results/race.vue")
        },
        {
          path: "qualifying",
          name: "qualifying-results",
          component: () =>
            import(/* webpackChunkName: "results" */ "./views/results/qualifying.vue")
        }
      ]
    }
  ]
});
