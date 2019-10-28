export default [
  {
    seriesId: 1,
    events: [
      {
        id: 1,
        status: "complete",
        country: "China",
        weather: {
          sprint: {
            qualifying: ["cloud"],
            race: ["drizzle"]
          },
          feature: {
            qualifying: ["cloud"],
            race: ["drizzle"]
          }
        }
      },
      {
        id: 2,
        status: "complete",
        country: "Austria",
        weather: {
          sprint: {
            qualifying: ["rain"],
            race: ["sun"]
          },
          feature: {
            qualifying: ["sun"], // missing data
            race: ["cloud"]
          }
        }
      },
      {
        id: 3,
        status: "complete",
        country: "Abu Dhabi",
        weather: {
          sprint: {
            qualifying: ["sun"],
            race: ["sun"]
          },
          feature: {
            qualifying: ["sun"], // missing data
            race: ["sun"]
          }
        }
      },
      {
        id: 4,
        status: "complete",
        country: "Russia",
        weather: {
          sprint: {
            qualifying: ["sun"],
            race: ["sun"]
          },
          feature: {
            qualifying: ["rain"],
            race: ["sun"]
          }
        }
      },
      {
        id: 5,
        status: "complete",
        country: "Malaysia",
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
        }
      },
      {
        id: 6,
        status: "complete",
        country: "Bahrain",
        weather: {
          sprint: {
            qualifying: ["sun"],
            race: ["sun"]
          },
          feature: {
            qualifying: ["sun"],
            race: ["sun"]
          }
        }
      }
    ]
  },
  {
    seriesId: 2,
    events: [
      {
        id: 7,
        status: "complete",
        country: "USA",
        weather: {
          sprint: {
            qualifying: ["sun"],
            race: ["sun"]
          },
          feature: {
            qualifying: ["rain"],
            race: ["sun"]
          }
        }
      },
      {
        id: 8,
        status: "complete",
        country: "Germany",
        weather: {
          sprint: {
            qualifying: ["cloud"],
            race: ["sun"]
          },
          feature: {
            qualifying: ["sun"],
            race: ["sun", "rain"]
          }
        }
      },
      {
        id: 9,
        status: "complete",
        country: "Spain",
        weather: {
          sprint: {
            qualifying: ["sun"],
            race: ["sun"]
          },
          feature: {
            qualifying: ["rain"],
            race: ["cloud", "drizzle"]
          }
        }
      },
      {
        id: 10,
        status: "complete",
        country: "Australia",
        weather: {
          sprint: {
            qualifying: ["sun"],
            race: ["sun"]
          },
          feature: {
            qualifying: ["cloud"],
            race: ["sun"]
          }
        }
      },
      {
        id: 11,
        status: "upcoming",
        country: "Hungary"
      },
      {
        id: 12,
        status: "upcoming",
        country: "Singapore"
      }
    ]
  }
];
