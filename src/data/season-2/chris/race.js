export default [
  {
    seriesId: 1,
    events: [
      {
        id: 1,
        finishPosition: 8,
        starPosition: null
      },
      {
        id: 2,
        finishPosition: 3,
        starPosition: null
      },
      {
        id: 3,
        finishPosition: 3,
        starPosition: null
      },
      {
        id: 4,
        finishPosition: 3,
        starPosition: 15
      },
      {
        id: 5,
        finishPosition: 15,
        starPosition: 3,
        penalties: [
          {
            incident: "overtaking under safety car",
            impact: "+10s"
          },
          {
            incident: "overtaking under safety car",
            impact: "+10s"
          },
          {
            incident: "overtaking under safety car",
            impact: "+10s"
          }
        ]
      },
      {
        id: 6,
        finishPosition: 1,
        starPosition: 3
      }
    ]
  },
  {
    seriesId: 2,
    events: [
      {
        id: 7,
        finishPosition: 3,
        starPosition: 12
      },
      {
        id: 8,
        finishPosition: 3,
        starPosition: 2
      },
      {
        id: 9,
        finishPosition: 3,
        starPosition: 14
      },
      {
        id: 10,
        finishPosition: 1,
        starPosition: 2,
        isFastestLap: true
      },
      {
        id: 11,
        finishPosition: 2,
        starPosition: 3
      },
      {
        id: 12,
        finishPosition: 1,
        starPosition: 3
      }
    ]
  },
  {
    seriesId: 3,
    events: [
      {
        id: 13,
        finishPosition: 2,
        starPosition: 3
      },
      {
        id: 14,
        finishPosition: 1,
        starPosition: 2
      },
      {
        id: 15,
        finishPosition: 7,
        starPosition: 2
      },
      {
        id: 16,
        finishPosition: 1,
        starPosition: 1
      }
    ]
  }
];
