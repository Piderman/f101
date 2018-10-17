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
    this.primaryTeamId = data.primaryTeamId;
    this.isSecondaryDriver = data.isSecondaryDriver;

    this.raceResults = parseRaceData(data.races);
    this.qualifyingResults = data.qualifying;

    this.seasonTotal = sum(this.raceResults.map(race => race.points));
  }
}

/**
 * Calculated values not captured in data
 *
 * @param {Array} races
 * @returns Array
 */
const parseRaceData = races => {
  let progressiveSeasonTotal = 0;

  return races.map(race => {
    const positionsGained = race.grid - race.position;
    const points = pointsLUT[race.position] || 0;

    progressiveSeasonTotal += points;

    return Object.assign(race, {
      positionsGained,
      points,
      progressiveSeasonTotal
    });
  });
};

export default Driver;
