import PointsModel from '../../src/models/PointsModel';

// purely to test point is assigned. not reflective of class
class mockDriver {
  constructor (data) {
    Object.assign(this, data);
    this.points = 0;
  }

  givePoints(amount) {
    this.points += amount;
  };
};

describe('the PointsModel', () => {
  let spiedAwardFastest;
  let spiedAwardPole;
  let spiedAwardPosition;

  beforeEach(() => {
    spiedAwardFastest = jest.spyOn(PointsModel, 'awardFastestLapPoints')
    spiedAwardPole = jest.spyOn(PointsModel, 'awardPolePositionPoints')
    spiedAwardPosition = jest.spyOn(PointsModel, 'awardPositionPointsToDriver')
  });

  afterEach(() => {
    spiedAwardFastest.mockRestore();
    spiedAwardPole.mockRestore();
    spiedAwardPosition.mockRestore();
  });

  it('should call the correct functions from the helper', () => {
    const mockDrivers = [{grid: 1}, {fastestLap: '1.2'}]
      .map(driver => new mockDriver(driver));
      
    PointsModel.awardPointsForWeekend(mockDrivers);

    expect(spiedAwardFastest).toHaveBeenCalled();
    expect(spiedAwardPole).toHaveBeenCalled();
    expect(spiedAwardPosition).toHaveBeenCalled();
  });

  describe('when looking up values', () => {
    it('should match a finishing position', () => {
      const topResult = PointsModel.getPoints(1);
      const positionAsInt = PointsModel.getPoints(8);
      const positionAsString = PointsModel.getPoints('8');
      const noMatch = PointsModel.getPoints('DNF');
  
      expect(topResult).toBe(30);
      expect(positionAsString).toBe(positionAsInt);
      expect(noMatch).toBe(0);
    });
  
    it('should match the fastest lap', () => {
      const fastestResult = PointsModel.getPoints('fastest');

      expect(fastestResult).toBe(1);
    });

    it('should match pole position', () => {
      const poleResult = PointsModel.getPoints('pole');
      
      expect(poleResult).toBe(1);
    });
  });

  describe('when finding the fastest lap', () => {
    it('should give points to fastest lap', () => {
      const mockDrivers = [
        {fastestLap: '1.12.789'},
        {fastestLap: '1.10.456'},
        {fastestLap: '1.09.123'},
      ].map(driver => new mockDriver(driver));

      PointsModel.awardFastestLapPoints(mockDrivers);
      
      expect(mockDrivers[0].points).toBe(0);
      expect(mockDrivers[1].points).toBe(0);
      expect(mockDrivers[2].points).toBe(1);
    });
    
    it('should resolve a tie to the highest finisher', () => {
      const mockDrivers = [
        {
          fastestLap: '1.10.654',
          position: 4
        },
        {
          fastestLap: '1.09.987',
          position: 6
        },
        {
          fastestLap: '1.08.000',
          position: 2
        },
        {
          fastestLap: '1.08.000',
          position: 1
        },
      ].map(driver => new mockDriver(driver));
      
      PointsModel.awardFastestLapPoints(mockDrivers);

      expect(mockDrivers[2].points).toBe(0);
      expect(mockDrivers[3].points).toBe(1);
    });
  });
});
