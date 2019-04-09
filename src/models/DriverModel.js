import { find, get, sum } from "lodash";
import RaceWeekends from "@/data/season-1/race-weekends"

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

    this.raceResults = parseRaceData(data.races, data.primaryTeamId);
    this.qualifyingResults = parseQualifyingData(
      data.qualifying,
      data.primaryTeamId
    );

    this.seasonTotal = sum(this.raceResults.map(race => race.points));
  }
}

/**
 * Calculated values not captured in data
 *
 * @param {Array} races
 * @returns Array
 */
const parseRaceData = (races, primaryTeamId) => {
  
  let progressiveSeasonTotal = 0;

  return races.map(race => {
    const multiplier = get(find(RaceWeekends, {id: race.raceId}), 'pointsMultiplier', 1);
    const positionsGained = race.grid - race.position;
    
    const points = pointsLUT[race.position] * multiplier || 0;

    // as AI doesn't have this data nor would a player when on main team
    if (!race.teamId) {
      race.teamId = primaryTeamId;
    }

    progressiveSeasonTotal += points;

    return Object.assign(race, {
      positionsGained,
      points,
      progressiveSeasonTotal
    });
  });
};

const parseQualifyingData = (qualifying, primaryTeamId) => {
  return (
    qualifying &&
    qualifying.map(session => {
      if (!session.teamId) {
        session.teamId = primaryTeamId;
      }

      return session;
    })
  );
};

export default Driver;
