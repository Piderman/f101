import weekends from "./race-weekends";
import drivers from "./drivers";

import { find } from "lodash";

const getSessionResults = sessionType => {
  return weekends.map(event => {
    const results = drivers.map(driver => {
      const matchingRace = find(driver[sessionType], { raceId: event.id });

      if (matchingRace) {
        return {
          driverId: driver.driverId,
          position: matchingRace.position
        };
      }
    });

    if (results) {
      return {
        results,
        raceId: event.id
      };
    }
  });
};

export const Qualifying = getSessionResults('Qualifying');

export const Race = getSessionResults('Race');

export const standings = {
  Qualifying,
  Race
};
