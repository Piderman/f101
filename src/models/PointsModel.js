import {find, orderBy} from 'lodash';

const pointSettings = {
  1: 30,
  2: 23,
  3: 20,
  4: 17,
  5: 15,
  6: 13,
  7: 11,
  8: 10,
  9: 8,
  10: 7,
  11: 6,
  12: 5,
  13: 4,
  14: 3,
  15: 2,
  16: 1,
  fastest: 1,
  pole: 1
};

class Points {
  constructor() {
    
  }
  /**
   * applies points to each driver for a raceweekend
   *  
   * @param {DriverModel[]} drivers
   */
  static awardPointsForWeekend(drivers) {
    drivers.forEach(Driver => {
      this.awardPositionPointsToDriver(Driver);
    });

    this.awardPolePositionPoints(drivers);
    this.awardFastestLapPoints(drivers);
  };
  
  /**
   * gives a driver points for their finishing postition
   * @param {DriverModel} driver
   */
  static awardPositionPointsToDriver(driver) {
    driver.givePoints(this.getPoints(driver.position))
  };
  
  
  /**
   * gives the driver in pole position points
   * @param {DriverModel[]} drivers 
   */
  static awardPolePositionPoints(drivers) {
    const poleDriver = find(drivers, {grid: 1});

    poleDriver.givePoints(this.getPoints('pole'));
  };
  
  /**
   * gives the faster lap driver points
   * @param {DriverModel[]} drivers 
   */
  static awardFastestLapPoints(drivers) {
    const fastestDriver = orderBy(drivers, ['fastestLap', 'position'])[0];

    fastestDriver.givePoints(this.getPoints('fastest'));
  };

  /**
   * find matching points in settings
   * 
   * @static
   * @param {string} type
   *   points key to lookup
   * 
   * @returns Int
   */
  static getPoints(type) {
    return pointSettings[type] || 0;
  };
};

export default Points;
