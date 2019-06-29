import RaceEvent from "./RaceEvent";

class FeatureRace extends RaceEvent {
  constructor(id, drivers) {
    super(id, "feature", drivers);
  }
}

export default FeatureRace;
