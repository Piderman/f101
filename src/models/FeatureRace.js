import RaceEvent from "./RaceEvent";

class FeatureRace extends RaceEvent {
  constructor(id, seriesId, drivers) {
    super(id, seriesId, "feature", drivers);
  }
}

export default FeatureRace;
