import { find, orderBy } from "lodash";

const Drivers = Symbol("Drivers");

/**
 *
 */
class RaceEvent {
  // todo: support grandPrix event
  constructor(id, type, drivers) {
    this[Drivers] = drivers;
    this.id = id;
    this.type = type;

    this.standings = this.buildStandings();

    this.qualifying = this.buildGrid();

    this.podium = this.standings.filter(entry => {
      return entry.position < 4;
    });

    this.winner = this.standings.find(entry => entry.position === 1);
    // weather stats
    // safety cars?
  }

  buildGrid() {
    const eventKey =
      this.type === "sprint" ? "sprintQualifying" : "featureQualifying";

    const event = this[Drivers].filter(Driver => Driver[eventKey].length)
      .map(Driver => {
        const round = find(Driver[eventKey], { id: this.id });

        if (!round) return null;

        return {
          ...Driver.meta,

          position: round.position,
          timeText: round.timeText,
          time: round.time,
          isPole: round.position === 1
        };
      })
      .filter(val => val);

    console.log("matches?", event.length);

    return orderBy(event, "position");
  }

  buildStandings() {
    const eventKey =
      this.type === "sprint" ? "sprintResults" : "featureResults";

    const event = this[Drivers].filter(Driver => Driver[eventKey].length)
      .map(Driver => {
        const round = find(Driver[eventKey], { raceId: this.id });

        if (!round) return null;

        return {
          ...Driver.meta,

          grid: round.grid,
          position: round.position,
          positionText: round.positionText,
          isFastestLap: !!round.lapBonusPoints,
          isPole: !!round.poleBonusPoints,
          points: round.totalPoints,

          get isCleanSweep() {
            return this.position === 1 && this.isPole && this.isFastestLap;
          }
        };
      })
      .filter(val => val);

    console.log("matches?", event.length);

    return orderBy(event, "position");
  }
}

export default RaceEvent;
