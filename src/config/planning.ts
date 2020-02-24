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
const listLength = 6
const listLengthLong = 4
type List = {
  name: string
  number_of_lists?: number
  length_of_lists: number
  primary_stadium?: Stadium
  secondary_stadia?: Stadia
  exclude_stadia?: Stadia
}
type Lists = List[]
export const listsWeek: Lists =
  [
    {
      name: "Maandag Ochtend",
      length_of_lists: listLength,
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Maandag Middag",
      length_of_lists: listLength,
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Maandag Avond",
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
      length_of_lists: listLength,
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Dinsdag Middag",
      length_of_lists: listLength,
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Dinsdag Avond",
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
      length_of_lists: listLength,
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Woensdag Middag",
      length_of_lists: listLength,
      exclude_stadia: ["Avondronde", "Weekend buitendienstonderzoek"]
    },
    {
      name: "Woensdag Avond",
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
      length_of_lists: listLengthLong,
      primary_stadium: "Weekend buitendienstonderzoek",
      secondary_stadia: [
        "Hercontrole",
        "2de hercontrole",
        "3de hercontrole"
      ],
      exclude_stadia: ["Avondronde"]
    }
  ]
export const listsDay = (dayOfWeek: number) => {
    const isWeekend = dayOfWeek > 4
    const isSunday = dayOfWeek === 6
    const start = isSunday ? 16 : dayOfWeek * 3
    const length = isWeekend ? 1 : 3
    const lists = listsWeek.splice(start, length)
    return lists
  }
