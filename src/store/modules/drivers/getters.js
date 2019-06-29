export default {
  ai(state) {
    return state.drivers.filter(driver => !driver.isPlayer);
  },

  players(state) {
    return state.drivers.filter(driver => driver.isPlayer);
  },
}
