// todo: how to handle more seasons?
import season2 from "@/data/season-2";
import Driver from "@/models/pocDriver";


export default {
  init(context) {
    context.dispatch('parseDrivers', season2.drivers);
  },

  parseDrivers(context, drivers) {
    const driverModels = drivers.map(data => new Driver(data));

    context.commit('createDrivers', driverModels);
  }
}
