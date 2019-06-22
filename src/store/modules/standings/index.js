import season2 from "@/data/season-2";
 
// import actions from './actions'
import getters from './getters'
// import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    teams: season2.teams // yes?
  },
  // actions,
  getters,
  // mutations
};
