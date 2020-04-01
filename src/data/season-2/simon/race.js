export default [
  {
    seriesId: 1,
    events: [
      {
        id: 1,
        finishPosition: 4,
        starPosition: null
      },
      {
        id: 2,
        finishPosition: 2,
        starPosition: null,
        isFastestLap: true
      },
      {
        id: 3,
        finishPosition: 2,
        starPosition: null
      },
      {
        id: 4,
        finishPosition: 1,
        starPosition: 1
      },
      {
        id: 5,
        finishPosition: 13,
        starPosition: 2,
        isFastestLap: true,
        penalties: [
          {
            incident: "causing a collision", // ?
            impact: "+10s"
          }
        ]
      },
      {
        id: 6,
        finishPosition: 4,
        starPosition: 2
      }
    ]
  },
  {
    seriesId: 2,
    events: [
      {
        id: 7,
        finishPosition: 2,
        starPosition: 1
      },
      {
        id: 8,
        finishPosition: 2,
        starPosition: 3,
        isFastestLap: true
      },
      {
        id: 9,
        finishPosition: 1,
        starPosition: 2
      },
      {
        id: 10,
        finishPosition: 3,
        starPosition: 3
      },
      {
        id: 11,
        finishPosition: 16,
        starPosition: 2
      },
      {
        id: 12,
        finishPosition: 2,
        starPosition: 2
      }
    ]
  },
  {
    seriesId: 3,
    events: [
      {
        id: 13,
        finishPosition: 14,
        starPosition: 1,
        isFastestLap: true,
        penalties: [
          {
            incident: "illegal overtake",
            impact: "+10s"
          }
        ]
      },
      {
        id: 14,
        finishPosition: 2,
        starPosition: 3,
        isFastestLap: true
        // shoud have a penalty after ramming matty on the finish line
      },
      {
        id: 15,
        finishPosition: 1,
        starPosition: 3
      },
      {
        id: 16,
        finishPosition: 11,
        starPosition: 4
      },
      {
        id: 17,
        finishPosition: 2,
        starPosition: 2
      },
      {
        id: 18,
        finishPosition: 4,
        starPosition: 2
      }
    ]
  }
];
