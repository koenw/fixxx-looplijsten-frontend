export const openingDate = "2019-01-01"
export const openingReasons = [
  "Bed en breakfast 2019",
  "Burgwallenproject Oudezijde",
  "Corpo-rico",
  "Digital toezicht Safari",
  "Digital toezicht Zebra",
  "Haarlemmerbuurt",
  "Hotline",
  "Mystery Guest",
  "Project Andes",
  "Project Jordaan",
  "Project Lobith",
  //"Project Sahara",
  "Safari",
  "Safari 2015",
  //"Sahara Adams Suites",
  //"Sahara hele woning",
  //"Sahara meer dan 4",
  //"Sahara Recensies",
  //"Sahara veel adv",
  "Social Media 2019",
  "Woonschip (woonboot)",
  "Zebra"
]
const createPlanningRequestBody = (inputs: { inputs: number[] }[]) => {
  const listLength = 6
  const listLengthLong = 4
  const lists = inputs.length === 7 ?
  [
    {
      name: "Maandag Ochtend",
      number_of_lists: inputs[0].inputs[0],
      length_of_lists: listLength,
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Maandag Middag",
      number_of_lists: inputs[0].inputs[1],
      length_of_lists: listLength,
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Maandag Avond",
      number_of_lists: inputs[0].inputs[2],
      length_of_lists: listLength,
      primary_stadium: "Avondronde",
      secondary_stadia: [
        "Hercontrole",
        "2de hercontrole",
        "3de hercontrole"
      ],
      exclude_stadia: ["Weekend buitendienstonderzoek"]
    },
    {
      name: "Dinsdag Ochtend",
      number_of_lists: inputs[1].inputs[0],
      length_of_lists: listLength,
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Dinsdag Middag",
      number_of_lists: inputs[1].inputs[1],
      length_of_lists: listLength,
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Dinsdag Avond",
      number_of_lists: inputs[1].inputs[2],
      length_of_lists: listLength,
      primary_stadium: "Avondronde",
      secondary_stadia: [
        "Hercontrole",
        "2de hercontrole",
        "3de hercontrole"
      ],
      exclude_stadia: ["Weekend buitendienstonderzoek"]
    },
    {
      name: "Woensdag Ochtend",
      number_of_lists: inputs[2].inputs[0],
      length_of_lists: listLength,
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Woensdag Middag",
      number_of_lists: inputs[2].inputs[1],
      length_of_lists: listLength,
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Woensdag Avond",
      number_of_lists: inputs[2].inputs[2],
      length_of_lists: listLength,
      primary_stadium: "Avondronde",
      secondary_stadia: [
        "Hercontrole",
        "2de hercontrole",
        "3de hercontrole"
      ],
      exclude_stadia: ["Weekend buitendienstonderzoek"]
    },
    {
      name: "Donderdag Ochtend",
      number_of_lists: inputs[3].inputs[0],
      length_of_lists: listLength,
      primary_stadium: "Onderzoek buitendienst",
      secondary_stadia: [
        "2de Controle",
        "3de Controle"
      ],
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Donderdag Middag",
      number_of_lists: inputs[3].inputs[1],
      length_of_lists: listLength,
      primary_stadium: "Onderzoek buitendienst",
      secondary_stadia: [
        "2de Controle",
        "3de Controle"
      ],
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Donderdag Avond",
      number_of_lists: inputs[3].inputs[2],
      length_of_lists: listLength,
      primary_stadium: "Avondronde",
      secondary_stadia: [
        "Hercontrole",
        "2de hercontrole",
        "3de hercontrole"
      ],
      exclude_stadia: ["Weekend buitendienstonderzoek"]
    },
    {
      name: "Vrijdag Ochtend",
      number_of_lists: inputs[4].inputs[0],
      length_of_lists: listLength,
      primary_stadium: "Onderzoek buitendienst",
      secondary_stadia: [
        "2de Controle",
        "3de Controle"
      ],
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Vrijdag Middag",
      number_of_lists: inputs[4].inputs[1],
      length_of_lists: listLength,
      primary_stadium: "Onderzoek buitendienst",
      secondary_stadia: [
        "2de Controle",
        "3de Controle"
      ],
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Vrijdag Avond",
      number_of_lists: inputs[4].inputs[2],
      length_of_lists: listLength,
      primary_stadium: "Avondronde",
      secondary_stadia: [
        "Hercontrole",
        "2de hercontrole",
        "3de hercontrole"
      ],
      exclude_stadia: ["Weekend buitendienstonderzoek"]
    },
    {
      name: "Zaterdag Weekend",
      number_of_lists: inputs[5].inputs[0],
      length_of_lists: listLengthLong,
      primary_stadium: "Weekend buitendienstonderzoek",
      secondary_stadia: [
        "Hercontrole",
        "2de hercontrole",
        "3de hercontrole"
      ],
      exclude_stadia: ["Avondronde"]
    },
    {
      name: "Zondag Weekend",
      number_of_lists: inputs[6].inputs[0],
      length_of_lists: listLengthLong,
      primary_stadium: "Weekend buitendienstonderzoek",
      secondary_stadia: [
        "Hercontrole",
        "2de hercontrole",
        "3de hercontrole"
      ],
      exclude_stadia: ["Avondronde"]
    }
  ] : [
    {
      name: "Dag Ochtend",
      number_of_lists: inputs[0].inputs[0],
      length_of_lists: listLength,
      primary_stadium: "Onderzoek buitendienst",
      secondary_stadia: [
        "2de Controle",
        "3de Controle"
      ],
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Dag Middag",
      number_of_lists: inputs[0].inputs[1],
      length_of_lists: listLength,
      primary_stadium: "Onderzoek buitendienst",
      secondary_stadia: [
        "2de Controle",
        "3de Controle"
      ],
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Dag Avond",
      number_of_lists: inputs[0].inputs[2],
      length_of_lists: listLength,
      primary_stadium: "Avondronde",
      secondary_stadia: [
        "Hercontrole",
        "2de hercontrole",
        "3de hercontrole"
      ],
      exclude_stadia: ["Weekend buitendienstonderzoek"]
    }

  ]
  const body = {
    opening_date: openingDate,
    opening_reasons: openingReasons,
    lists
  }
  return body
}
export default createPlanningRequestBody
