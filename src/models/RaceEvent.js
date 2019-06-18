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
        driverName: Driver.name,
        position: round.position,
        isFastestLap: !!round.lapBonusPoints,
        isPlayer: Driver.isPlayer,
        isPole: !!round.poleBonusPoints,
        points: round.totalPoints,
        teamId: Driver.teamId,
        teamName: Driver.teamName
      };
    });

    return orderBy(event, "points", "desc");
  }
}

export default RaceEvent;
