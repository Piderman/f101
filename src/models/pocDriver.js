import { find, sum, sumBy, } from "lodash";

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

    this.sprintResults = this.parseSprintResults(data.sprintData);
    this.sprintTotal = sumBy(this.sprintResults, 'totalPoints');
    
    this.featureResults = this.parseFeatureResults(data.raceData);
    this.featureTotal = sumBy(this.featureResults, 'totalPoints');

    this.seriesTotal = this.isPlayer && this.sprintTotal + this.featureTotal;
    
    // stats!!!
    // highest qual
    // highest position
    // podiums
    // fastest laps
    // win streak?
    //
    // best pole margin (need other drivers)
    // season margin (need other drivers)
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
