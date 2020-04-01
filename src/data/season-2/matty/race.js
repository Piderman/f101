export default [
  {
    seriesId: 1,
    events: [
      {
        id: 1,
        finishPosition: 6,
        starPosition: 1,
        isFastestLap: true
      },
      {
        id: 2,
        finishPosition: 1,
        starPosition: 1
      },
      {
        id: 3,
        finishPosition: 1,
        starPosition: 1,
        isFastestLap: true
      },
      {
        id: 4,
        finishPosition: 2,
        starPosition: 7,
        isFastestLap: true
      },
      {
        id: 5,
        finishPosition: 5,
        starPosition: 1
      },
      {
        id: 6,
        finishPosition: 3,
        starPosition: 1
      }
    ]
  },
  {
    seriesId: 2,
    events: [
      {
        id: 7,
        finishPosition: 1,
        starPosition: 8,
        isFastestLap: true
      },
      {
        id: 8,
        finishPosition: 1,
        starPosition: 1
      },
      {
        id: 9,
        finishPosition: 2,
        starPosition: 1,
        isFastestLap: true
      },
      {
        id: 10,
        finishPosition: 2,
        starPosition: 1
      },
      {
        id: 11,
        finishPosition: 1,
        starPosition: 1,
        isFastestLap: true
      },
      {
        id: 12,
        finishPosition: 3,
        starPosition: 1,
        isFastestLap: true
      }
    ]
  },
  {
    seriesId: 3,
    events: [
      {
        id: 13,
        finishPosition: 1,
        starPosition: 2
      },
      {
        id: 14,
        finishPosition: 3,
        starPosition: 1
      },
      {
        id: 15,
        finishPosition: 2,
        starPosition: 1
      },
      {
        id: 16,
        finishPosition: 14,
        starPosition: 2,
        isFastestLap: true,
        penalties: [
          {
            incident: "illegal overtake", // BS safety car glitch. FU Perez
            impact: "+10s"
          }
        ]
      },
      {
        id: 17,
        finishPosition: 4,
        starPosition: 1,
        isFastestLap: true
      },
      {
        id: 18,
        finishPosition: 3,
        starPosition: 4,
        isFastestLap: true
      }
    ]
  }
];
