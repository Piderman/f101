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
      }
    ]
  }
];
