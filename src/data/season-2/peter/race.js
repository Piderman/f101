export default [
  {
    seriesId: 1,
    events: [
      {
        id: 1,
        finishPosition: 7,
        starPosition: null
      },
      {
        id: 2,
        finishPosition: 4,
        starPosition: null
      },
      {
        id: 3,
        retiredPosition: 16,
        starPosition: 4
      },
      {
        id: 4,
        finishPosition: 10,
        starPosition: 16
      },
      {
        id: 5,
        retiredPosition: 16, // terminal damage after being punted
        starPosition: 4
      },
      {
        id: 6,
        finishPosition: 2,
        starPosition: 4,
        isFastestLap: true
      }
    ]
  },
  {
    seriesId: 2,
    events: [
      {
        id: 7,
        finishPosition: 5,
        starPosition: 16
      },
      {
        id: 8,
        finishPosition: 7,
        starPosition: 4
      },
      {
        id: 9,
        retiredPosition: 16, // too many corner cuts
        starPosition: 16,
        penalties: [
          {
            incident: "ignoring track limits",
            impact: "DSQ"
          }
        ]
      },
      {
        id: 10,
        finishPosition: 14,
        starPosition: 16,
        penalties: [
          {
            incident: "collision", // assumed?
            impact: "+10s"
          }
        ]
      },
      {
        id: 11,
        finishPosition: 3,
        starPosition: 4
      },
      {
        id: 12,
        finishPosition: 14,
        starPosition: 4
      }
    ]
  },
  {
    seriesId: 3,
    events: [
      {
        id: 13,
        retiredPosition: 16, // unsure?
        starPosition: 4
      }
    ]
  }
];
