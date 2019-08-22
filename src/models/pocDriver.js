import { countBy, find, max, min, sum, sumBy } from "lodash";

import points from "@/data/season-2/points.js";
import teams from "@/data/season-2/teams.js";

// goal: series standings
class pocDriver {
  // raw data, doesn't need context of other drivers
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.isPlayer = data.isPlayer;
    this.raceNumber = data.number;
    this.teamId = data.teamId;
    this.teamName = find(teams, { id: data.teamId }).name;
    this.isMain = data.isMain;

    this.series = this.parseSeries(data.sprintData, data.raceData);
    this.careerPoints = sumBy(this.series, "seriesTotal");

    // @depricated
    this.sprintQualifying = [];
    this.sprintResults = this.parseSprintResults(data.sprintData);
    this.sprintTotal = sumBy(this.sprintResults, "totalPoints");

    this.featureQualifying = [];
    this.featureResults = this.parseFeatureResults(data.raceData);
    this.featureTotal = sumBy(this.featureResults, "totalPoints");

    this.setGridResults(data.qualifyingData);

    this.seriesTotal = this.isPlayer && this.sprintTotal + this.featureTotal;
    // end depricated

    // stats!!!
    // highest qual
    // win streak?
    //
    // best pole margin (need other drivers)
    // season margin (need other drivers)
  }

  get meta() {
    return {
      name: this.name,
      firstName: this.name.match(/^\w+/)[0],
      secondName: this.name.match(/\w+$/)[0],
      id: this.id,
      isPlayer: this.isPlayer,
      isMain: this.isMain,
      raceNumber: this.raceNumber,
      teamId: this.teamId,
      teamName: this.teamName
    };
  }

  get countbackData() {
    return {
      points: this.seriesTotal,
      sprintPoints: this.sprintTotal,
      featurePoints: this.featureTotal,
      podiums: this.stats.featurePodiums,
      poleCount: this.stats.poles,
      fastLapCount: this.stats.fastestLaps,
      featurePositions: Object.assign(
        countBy(this.featureResults, "position"),
        {
          dnf: this.featureResults.filter(result => result.isRetired).length
        }
      )
    };
  }

  // todo: move to summary'ish of general things likes wins/podiums/laps
  get stats() {
    return {
      poles: this.featureResults.filter(race => race.grid === 1).length,
      featureWins: this.featureResults.filter(race => race.position === 1)
        .length,
      featurePodiums: this.featureResults.filter(race => race.position < 4)
        .length,
      fastestLaps: this.featureResults.filter(race => race.isFastestLap).length,
      sprintWins: this.sprintResults.filter(race => race.position === 1).length,
      highestPosition: min(this.featureResults.map(race => race.position)),
      bestScore: max(
        this.featureResults.map((race, index) => {
          return race.totalPoints + this.sprintResults[index].totalPoints;
        })
      )
    };
  }

  /**
   * builds sprint/feature values of each series' events
   *
   * @todo: try/catch for failed/not found parts
   * @param {*} sprintPayload
   * @param {*} featurePayload
   */
  parseSeries(sprintPayload = [], featurePayload = []) {
    const self = this;
    const seriesIds = featurePayload.map(race => race.seriesId);

    return seriesIds.map(id => {
      const matchingSprint = find(sprintPayload, { seriesId: id }) || {};
      const matchingFeature = find(featurePayload, { seriesId: id }) || {};

      const result = {
        seriesId: id,
        sprintResults: self.parseSprintResults(matchingSprint.events),
        featureResults: self.parseFeatureResults(matchingFeature.events),
        get sprintTotal() {
          return sumBy(this.sprintResults, "totalPoints");
        },
        get featureTotal() {
          return sumBy(this.featureResults, "totalPoints");
        },
        get seriesTotal() {
          return self.isPlayer && this.sprintTotal + this.featureTotal;
        }
      };

      return result;
    });
  }

  /**
   * what does this do?
   * @param {Array} data
   */
  setGridResults(data = []) {
    let sprints = [];
    let features = [];

    data.forEach(grandPrix => {
      sprints.push(this.parseGridResults(grandPrix.id, grandPrix.sprint));
      features.push(this.parseGridResults(grandPrix.id, grandPrix.feature));
    });

    this.sprintQualifying = sprints.filter(val => val);
    this.featureQualifying = features.filter(val => val);
  }

  parseGridResults(id, event) {
    if (event) {
      return {
        id,
        position: event.retiredPosition || event.finishPosition,
        time: event.time,
        timeText: event.time || "-:--.---"
      };
    }
  }

  parseSprintResults(data = []) {
    return data.map(event => {
      return {
        raceId: event.id,
        position: event.retiredPosition || event.finishPosition,
        positionPoints: pocDriver.getPointsForSprintPosition(
          event.finishPosition
        ),
        isRetired: !!event.retiredPosition,
        get positionText() {
          return this.isRetired ? "DNF" : this.position;
        },
        get totalPoints() {
          return this.positionPoints || 0;
        }
      };
    });
  }

  parseFeatureResults(data = []) {
    return data.map(event => {
      // add best lap so results/feature summary can show
      // table of best times and the gap
      // eg simon s1,r4 was denied the gold grand slam by .2s :(
      const result = {
        raceId: event.id,
        grid: event.starPosition,
        position: event.retiredPosition || event.finishPosition,
        positionPoints: pocDriver.getPointsForFeaturePosition(
          event.finishPosition
        ),
        isRetired: !!event.retiredPosition,
        get positionText() {
          return this.isRetired ? "DNF" : this.position;
        },
        get totalPoints() {
          return sum([
            this.positionPoints,
            this.poleBonusPoints,
            this.lapBonusPoints
          ]);
        }
      };

      if (event.starPosition === 1) {
        result.poleBonusPoints = pocDriver.getPolePoints();
      }

      if (event.isFastestLap) {
        result.lapBonusPoints = pocDriver.getLapPoints();
        result.isFastestLap = true;
      }

      return result;
    });
  }

  //#region static point methods
  static getPointsForFeaturePosition(place) {
    return points.racePosition[place] || 0;
  }

  static getPointsForSprintPosition(place) {
    return points.sprintPosition[place];
  }

  static getPolePoints() {
    return pocDriver.getPointsForBonus("pole");
  }

  static getLapPoints() {
    return pocDriver.getPointsForBonus("fastestLap");
  }

  static getPointsForBonus(type) {
    return points[type];
  }
  //#endregion
}

export default pocDriver;
