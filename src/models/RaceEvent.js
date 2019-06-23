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

    this.podium = this.standings.filter(entry => {
      return entry.position < 4;
    });

    this.winner = this.standings.find(entry => entry.position === 1);
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

        get isCleanSweep() {
          return this.position === 1 && this.isPole && this.isFastestLap;
        }
      };
    });

    return orderBy(event, "position");
  }
}

export default RaceEvent;
