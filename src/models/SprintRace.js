import RaceEvent from "./RaceEvent";

class SprintRace extends RaceEvent {
  constructor(id, drivers) {
    super(id, "sprint", drivers);
  }
}

export default SprintRace;
