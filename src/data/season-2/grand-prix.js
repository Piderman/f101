export default [
  // series 1
  {
    id: 1,
    status: 'complete',
    country: 'China',
    weather: {
      sprint: {
        qualifying: ["cloud"],
        race: ["drizzle"]
      },
      feature: {
        qualifying: ["cloud"],
        race: ["drizzle"]
      }
    },
  },
  {
    id: 2,
    status: 'complete',
    country: 'Austria',
    weather: {
      sprint: {
        qualifying: ["rain"],
        race: ["sun"]
      },
      feature: {
        qualifying: ["sun"], // missing data
        race: ["cloud"]
      }
    },
  },
  {
    id: 3,
    status: 'complete',
    country: 'Abu Dhabi',
    weather: {
      sprint: {
        qualifying: ["sun"],
        race: ["sun"]
      },
      feature: {
        qualifying: ["sun"], // missing data
        race: ["sun"]
      }
    },
  },
  {
    id: 4,
    status: 'complete',
    country: 'Russia',
    weather: {
      sprint: {
        qualifying: ["sun"],
        race: ["sun"]
      },
      feature: {
        qualifying: ["rain"],
        race: ["sun"]
      }
    },
  },
  {
    id: 5,
    status: 'complete',
    country: 'Malaysia',
    isSafety: true,
    weather: {
      sprint: {
        qualifying: ["cloud"],
        race: ["rain"]
      },
      feature: {
        qualifying: ["cloud"],
        race: ["cloud", "drizzle", "rain"]
      }
    },
  },
  {
    id: 6,
    status: 'upcoming',
    country: 'Bahrain'
  }
];