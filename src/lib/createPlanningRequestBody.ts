import { openingDate, openingReasons, listsWeek, listsDay } from "../config/planning"

const createPlanningRequestBody = (inputs: number[], dayOfWeek?: number) => {
  const singleDay = dayOfWeek !== undefined
  const lists = singleDay ? listsDay(dayOfWeek!) : listsWeek
  inputs.forEach((input, index) => lists[index].number_of_lists = input)
  const body = {
    opening_date: openingDate,
    opening_reasons: openingReasons,
    lists
  }
  return body
}
export default createPlanningRequestBody
