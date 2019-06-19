import { find, max, min, sum, sumBy, } from "lodash";

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

    this.sprintResults = this.parseSprintResults(data.sprintData);
    this.sprintTotal = sumBy(this.sprintResults, 'totalPoints');
    
    this.featureResults = this.parseFeatureResults(data.raceData);
    this.featureTotal = sumBy(this.featureResults, 'totalPoints');

    this.seriesTotal = this.isPlayer && this.sprintTotal + this.featureTotal;
    
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
      id: this.id,
      isPlayer: this.isPlayer,
      isMain: this.isMain,
      raceNumber: this.raceNumber,
      teamId: this.teamId,
      teamName: this.teamName,
    }
  }

  get stats() {
    return {
      poles: this.featureResults.filter(race => race.grid === 1).length,
      wins: this.featureResults.filter(race => race.position === 1).length,
      podiums: this.featureResults.filter(race => race.position < 4).length,
      fastestLaps: this.featureResults.filter(race => race.isFastestLap).length,
      sprintWins: this.sprintResults.filter(race => race.position === 1).length,
      highestPosition: min(this.featureResults.map(race => race.position)),
      bestScore: max(this.featureResults.map(race => race.totalPoints)),
    };
  }

  parseSprintResults(data=[]) {
    return data.map(event => {
      return {
        raceId: event.id,
        position: event.retiredPosition || event.finishPosition,
        positionPoints: pocDriver.getPointsForSprintPosition(
          event.finishPosition
        ),
        get positionText() {
          return event.retiredPosition ? 'DNF' : this.position;
        },
        get totalPoints() {
          return this.positionPoints || 0;
        }
      };
    });
  }

  parseFeatureResults(data=[]) {
    return data.map(event => {
      const result = {
        raceId: event.id,
        grid: event.starPosition,
        position: event.retiredPosition || event.finishPosition,
        positionPoints: pocDriver.getPointsForFeaturePosition(
          event.finishPosition
        ),
        get positionText() {
          return event.retiredPosition ? 'DNF' : this.position;
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

  static buildPointsForRound(race, sprint) {
    let points = [
      pocDriver.getPointsForFeaturePosition(race.finishPosition),
      pocDriver.getPointsForSprintPosition(sprint.finishPosition)
    ];

    if (race.starPosition === 1) {
      points.push(pocDriver.getPolePoints());
    }

    if (race.isFastestLap) {
      points.push(pocDriver.getLapPoints());
    }

    return points;
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
