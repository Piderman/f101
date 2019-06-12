import {sum} from 'lodash';

import points from '@/data/season-2/points.js'

// goal: series standings
class pocDriver {
  // raw data, doesn't need context of other drivers
  constructor (data) {
    this.id = data.id;
    this.name = data.name;
    this.raceNumber = data.number;

    this.standings = this.parseStandings(data.raceData, data.sprintData);
    this.total = sum(this.standings.map(round => round.total));
  }

  parseStandings(races, sprints) {
    return races.map((race, index) => {
      let points = pocDriver.buildPointsForRound(race, sprints[index]);
      return {
        raceId: race.id,
        total: sum(points)
      }
    });
  }

  static buildPointsForRound(race, sprint) {
    let points = [
      pocDriver.getPointsForRacePosition(race.finishPosition),
      pocDriver.getPointsForSprintPosition(sprint.finishPosition),
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
  static getPointsForRacePosition(place) {
    return points.racePosition[place];
  }

  static getPointsForSprintPosition(place) {
    return points.sprintPosition[place];
  }

  static getPolePoints() {
    return pocDriver.getPointsForBonus('pole');
  }

  static getLapPoints() {
    return pocDriver.getPointsForBonus('fastestLap');
  }

  static getPointsForBonus(type) {
    return points[type]
  }
  //#endregion 
};

export default pocDriver;