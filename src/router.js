import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import POC from "./views/POC.vue";

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
          name: "overview-old",
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
    },
    // scratchpad
    {
      path: "/standings",
      name: "poc",
      component: POC
    },

    {
      path: "/countback",
      name: "countback",
      component: () =>
        import(/* webpackChunkName: "drivers" */ "./views/CountbackPage.vue")
    },

    {
      path: "/drivers/:id",
      name: "driver",
      component: () =>
        import(/* webpackChunkName: "drivers" */ "./views/DriverPage.vue")
    },

    {
      path: "/weekend/:raceId",
      component: () =>
        import(/* webpackChunkName: "weekend" */ "./views/weekend/index.vue"),
      children: [
        {
          path: "",
          name: "overview",
          component: () =>
            import(/* webpackChunkName: "weekend" */ "./views/weekend/summary.vue")
        },
        {
          path: "feature",
          name: "feature",
          component: () =>
            import(/* webpackChunkName: "weekend" */ "./views/weekend/featureResults.vue")
        },
        {
          path: "sprint",
          name: "sprint",
          component: () =>
            import(/* webpackChunkName: "weekend" */ "./views/weekend/sprintResults.vue")
        }
      ]
    }
  ],
  scrollBehavior() {
    // @todo: to.meta.isSave to enable savedPosition
    return { x: 0, y: 0 };
  }
});
