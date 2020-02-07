const createPlanningRequestBody = (inputs: any) => {
  const openingDate = "2018-01-01"
  const openingReasons = ["Sahara"]
  const listLength = 8
  const listLengthLong = 40
  const stages = ["onderzoek buitendienst"]
  const days = {
    monday: [
      {
        name: "Ochtend",
        number_of_lists: inputs[0].inputs[0],
        list_of_length: listLength,
        stages
      },
      {
        name: "Middag",
        number_of_lists: inputs[0].inputs[1],
        list_of_length: listLength,
        stages
      },
      {
        name: "Avond",
        number_of_lists: inputs[0].inputs[2],
        list_of_length: listLength,
        stages
      }
    ],
    tuesday: [
      {
        name: "Ochtend",
        number_of_lists: inputs[1].inputs[0],
        list_of_length: listLength,
        stages
      },
      {
        name: "Middag",
        number_of_lists: inputs[1].inputs[1],
        list_of_length: listLength,
        stages
      },
      {
        name: "Avond",
        number_of_lists: inputs[1].inputs[2],
        list_of_length: listLength,
        stages
      }
    ],
    wednesday: [
      {
        name: "Ochtend",
        number_of_lists: inputs[2].inputs[0],
        list_of_length: listLength,
        stages
      },
      {
        name: "Middag",
        number_of_lists: inputs[2].inputs[1],
        list_of_length: listLength,
        stages
      },
      {
        name: "Avond",
        number_of_lists: inputs[2].inputs[2],
        list_of_length: listLength,
        stages
      }
    ],
    thursday: [
      {
        name: "Ochtend",
        number_of_lists: inputs[3].inputs[0],
        list_of_length: listLength,
        stages
      },
      {
        name: "Middag",
        number_of_lists: inputs[3].inputs[1],
        list_of_length: listLength,
        stages
      },
      {
        name: "Avond",
        number_of_lists: inputs[3].inputs[2],
        list_of_length: listLength,
        stages
      }
    ],
    friday: [
      {
        name: "Ochtend",
        number_of_lists: inputs[4].inputs[0],
        list_of_length: listLength,
        stages
      },
      {
        name: "Middag",
        number_of_lists: inputs[4].inputs[1],
        list_of_length: listLength,
        stages
      },
      {
        name: "Avond",
        number_of_lists: inputs[4].inputs[2],
        list_of_length: listLength,
        stages
      }
    ],
    saturday: [
      {
        name: "Weekend",
        number_of_lists: inputs[5].inputs[0],
        list_of_length: listLengthLong,
        stages
      }
    ],
    sunday: [
      {
        name: "Weekend",
        number_of_lists: inputs[6].inputs[0],
        list_of_length: listLengthLong,
        stages
      }
    ]
  }
  const body = {
    opening_date: openingDate,
    opening_reasons: openingReasons,
    days
  }
  return body
}
export default createPlanningRequestBody
