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
        status: "complete",
        country: "Hungary",
        weather: {
          sprint: {
            qualifying: ["cloud"],
            race: ["sun"]
          },
          feature: {
            qualifying: ["sun"],
            race: ["cloud"]
          }
        }
      },
      {
        id: 12,
        status: "complete",
        country: "Singapore",
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
    seriesId: 3,
    events: [
      {
        id: 13,
        status: "complete",
        country: "Italy",
        weather: {
          sprint: {
            qualifying: ["sun"],
            race: ["sun"]
          },
          feature: {
            qualifying: ["cloud"],
            race: ["rain"]
          }
        }
      },
      {
        id: 14,
        status: "complete",
        country: "Canada",
        weather: {
          sprint: {
            qualifying: ["cloud"],
            race: ["sun"]
          },
          feature: {
            qualifying: ["drizzle"],
            race: ["cloud"]
          }
        }
      },
      {
        id: 15,
        status: "complete",
        country: "Belgium",
        weather: {
          sprint: {
            qualifying: ["sun"],
            race: ["sun"]
          },
          feature: {
            qualifying: ["cloud"],
            race: ["cloud", "drizzle"]
          }
        }
      },
      {
        id: 16,
        status: "complete",
        country: "Japan",
        isSafety: true,
        weather: {
          sprint: {
            qualifying: ["sun"],
            race: ["rain"]
          },
          feature: {
            qualifying: ["sun"],
            race: ["drizzle", "cloud"]
          }
        }
      },
      {
        id: 17,
        status: "upcoming",
        country: "Great Britan",
        weather: {
          sprint: {
            qualifying: [],
            race: []
          },
          feature: {
            qualifying: [],
            race: []
          }
        }
      },
      {
        id: 18,
        status: "upcoming",
        country: "Brazil",
        weather: {
          sprint: {
            qualifying: [],
            race: []
          },
          feature: {
            qualifying: [],
            race: []
          }
        }
      }
    ]
  }
];
