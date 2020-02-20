export const openingDate = "2018-01-01"
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
  "Project Sahara",
  "Safari",
  "Safari 2015",
  "Sahara Adams Suites",
  "Sahara hele woning",
  "Sahara meer dan 4",
  "Sahara Recensies",
  "Sahara veel adv",
  "Social Media 2019",
  "Woonschip (woonboot)",
  "Zebra"
]
const createPlanningRequestBody = (inputs: any) => {
  const listLength = 6
  const listLengthLong = 12
  const lists = [
    {
      name: "Maandag Ochtend",
      number_of_lists: inputs[0].inputs[0],
      length_of_lists: listLength
    },
    {
      name: "Maandag Middag",
      number_of_lists: inputs[0].inputs[1],
      length_of_lists: listLength
    },
    {
      name: "Maandag Avond",
      number_of_lists: inputs[0].inputs[2],
      length_of_lists: listLength
    },
    {
      name: "Dinsdag Ochtend",
      number_of_lists: inputs[1].inputs[0],
      length_of_lists: listLength
    },
    {
      name: "Dinsdag Middag",
      number_of_lists: inputs[1].inputs[1],
      length_of_lists: listLength
    },
    {
      name: "Dinsdag Avond",
      number_of_lists: inputs[1].inputs[2],
      length_of_lists: listLength
    },
    {
      name: "Woensdag Ochtend",
      number_of_lists: inputs[2].inputs[0],
      length_of_lists: listLength
    },
    {
      name: "Woensdag Middag",
      number_of_lists: inputs[2].inputs[1],
      length_of_lists: listLength
    },
    {
      name: "Woensdag Avond",
      number_of_lists: inputs[2].inputs[2],
      length_of_lists: listLength
    },
    {
      name: "Donderdag Ochtend",
      number_of_lists: inputs[3].inputs[0],
      length_of_lists: listLength
    },
    {
      name: "Donderdag Middag",
      number_of_lists: inputs[3].inputs[1],
      length_of_lists: listLength
    },
    {
      name: "Donderdag Avond",
      number_of_lists: inputs[3].inputs[2],
      length_of_lists: listLength
    },
    {
      name: "Vrijdag Ochtend",
      number_of_lists: inputs[4].inputs[0],
      length_of_lists: listLength
    },
    {
      name: "Vrijdag Middag",
      number_of_lists: inputs[4].inputs[1],
      length_of_lists: listLength
    },
    {
      name: "Vrijdag Avond",
      number_of_lists: inputs[4].inputs[2],
      length_of_lists: listLength
    },
    {
      name: "Zaterdag Weekend",
      number_of_lists: inputs[5].inputs[0],
      length_of_lists: listLengthLong
    },
    {
      name: "Zondag Weekend",
      number_of_lists: inputs[6].inputs[0],
      length_of_lists: listLengthLong
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
