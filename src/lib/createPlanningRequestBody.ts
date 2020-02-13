const createPlanningRequestBody = (inputs: any) => {
  const openingDate = "2018-01-01"
  const openingReasons = [
    "Zebra",
    "Woonschip (woonboot)",
    "Social Media 2019",
    "Safari 2015",
    "Safari",
    "Project Lobith",
    "Project Jordaan",
    "Project Andes",
    "Mystery Guest",
    "Hotline",
    "Haarlemmerbuurt",
    "Digital toezicht Zebra",
    "Digital toezicht Safari",
    "Corpo-rico",
    "Burgwallenproject Oudezijde",
    "Bed en breakfast 2019"
  ]
  const listLength = 6
  const listLengthLong = 5
  const days = [
    {
      day: "monday",
      lists: [
        {
          name: "Ochtend",
          number_of_lists: inputs[0].inputs[0],
          length_of_lists: listLength
        },
        {
          name: "Middag",
          number_of_lists: inputs[0].inputs[1],
          length_of_lists: listLength
        },
        {
          name: "Avond",
          number_of_lists: inputs[0].inputs[2],
          length_of_lists: listLength
        }
      ]
    },
    {
      day: "tuesday",
      lists: [
        {
          name: "Ochtend",
          number_of_lists: inputs[1].inputs[0],
          length_of_lists: listLength
        },
        {
          name: "Middag",
          number_of_lists: inputs[1].inputs[1],
          length_of_lists: listLength
        },
        {
          name: "Avond",
          number_of_lists: inputs[1].inputs[2],
          length_of_lists: listLength
        }
      ]
    },
    {
      day: "wednesday",
      lists: [
        {
          name: "Ochtend",
          number_of_lists: inputs[2].inputs[0],
          length_of_lists: listLength
        },
        {
          name: "Middag",
          number_of_lists: inputs[2].inputs[1],
          length_of_lists: listLength
        },
        {
          name: "Avond",
          number_of_lists: inputs[2].inputs[2],
          length_of_lists: listLength
        }
      ]
    },
    {
      day: "thursday",
      lists: [
        {
          name: "Ochtend",
          number_of_lists: inputs[3].inputs[0],
          length_of_lists: listLength
        },
        {
          name: "Middag",
          number_of_lists: inputs[3].inputs[1],
          length_of_lists: listLength
        },
        {
          name: "Avond",
          number_of_lists: inputs[3].inputs[2],
          length_of_lists: listLength
        }
      ]
    },
    {
      day: "friday",
      lists: [
        {
          name: "Ochtend",
          number_of_lists: inputs[4].inputs[0],
          length_of_lists: listLength
        },
        {
          name: "Middag",
          number_of_lists: inputs[4].inputs[1],
          length_of_lists: listLength
        },
        {
          name: "Avond",
          number_of_lists: inputs[4].inputs[2],
          length_of_lists: listLength
        }
      ]
    },
    {
      day: "saturday",
      lists: [
        {
          name: "Weekend",
          number_of_lists: inputs[5].inputs[0],
          length_of_lists: listLengthLong
        }
      ]
    },
    {
      day: "sunday",
      lists: [
        {
          name: "Weekend",
          number_of_lists: inputs[6].inputs[0],
          length_of_lists: listLengthLong
        }
      ]
    }
  ]
  const body = {
    opening_date: openingDate,
    opening_reasons: openingReasons,
    days
  }
  return body
}
export default createPlanningRequestBody
