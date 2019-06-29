import Sprint from "@/models/SprintRace";

export default {
  init(context, payload) {
    const drivers = context.rootState.Drivers.drivers;
    context.dispatch('parseSprints', drivers);
  },

  parseSprints(context, drivers) {
    // todo: race/event data. name, weather etc
    // support upcomming
    const sprintModels = Array.from({length: 3}, (val, index) => {
      return new Sprint(index + 1, drivers)
    });

    context.commit('setSprints', sprintModels);

    // context.dispatch('Standings/init', null, {root: true});
  },
};
