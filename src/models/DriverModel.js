import DriverStore from "@/store/drivers";

import { sum } from "lodash";

const pointsLUT = {
  1: 25,
  2: 18,
  3: 15,
  4: 12,
  5: 10,
  6: 8,
  7: 6,
  8: 4,
  9: 2,
  10: 1
};

class Driver {
  constructor(data) {
    this.id = data.driverId;
    this.name = data.driverName;
    this.type = data.driverType;

    this.raceResults = data.races;
    this.qualifyingResults = data.qualifying;

    this.points = data.races.map(race => {
      return pointsLUT[race.position] || 0;
    });

    this.seasonTotal = sum(this.points);

    this.gapToLeader =
      DriverStore.getters.leader.seasonTotal - this.seasonTotal;
  }
}

export default Driver;
