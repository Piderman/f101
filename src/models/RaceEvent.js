import { find, orderBy } from "lodash";

const Drivers = Symbol("Drivers");

/**
 *
 */
class RaceEvent {
  constructor(id, type, drivers) {
    this[Drivers] = drivers;
    this.id = id;
    this.type = type;

    this.standings = this.buildStandings();

    this.podium = this.standings
      .filter(round => {
        return round.position < 4;
      })
      .map(round => round.driverName);

    // weather stats
    // safety cars?
  }

  buildStandings() {
    const eventKey =
      this.type === "sprint" ? "sprintResults" : "featureResults";

    const event = this[Drivers]
      .filter(Driver => Driver[eventKey].length)
      .map(Driver => {
      const round = find(Driver[eventKey], { raceId: this.id });

      return {
        ...Driver.meta,
        
        position: round.position,
        positionText: round.positionText,
        isFastestLap: !!round.lapBonusPoints,
        isPole: !!round.poleBonusPoints,
        points: round.totalPoints,
      };
    });

    return orderBy(event, "position");
  }
}

export default RaceEvent;
