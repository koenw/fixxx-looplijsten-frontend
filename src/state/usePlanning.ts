import { useReducer } from "react"
import reducer, {
  initialState,
  createStartFetching,
  createSetResults,
  createSetError,
  createClear,
  createRemoveItinerary,
  createAddItinerary
} from "./planningReducer"
import { post, notOk, isForbidden } from "../lib/utils/fetch"
import { getUrl } from "../config/api"
import handleForbiddenResponse from "../lib/handleForbiddenResponse"
import navigateTo from "../lib/navigateTo"

const usePlanning = () : [PlanningState, PlanningActions] => {

  const localStorageKey = "planningResult"

  const [state, dispatch] = useReducer(reducer, initialState as never)

  const initialize = () => {
    try {
      const item = window.localStorage.getItem(localStorageKey)
      if (item == null) return
      const result = JSON.parse(item)
      dispatch(createSetResults(result))
    } catch {}
  }

  const generate = (params: any) => {

    (async () => {

      dispatch(createStartFetching())

      const url = getUrl("generate-weekly-itineraries")
      const [response, result] = await post(url, params)

      // Handle error responses
      if (notOk(response)) {
        dispatch(createSetError(response.statusText))
        return isForbidden(response) ? handleForbiddenResponse() : false
      }

      // Set results
      dispatch(createSetResults(result))
      window.localStorage.setItem(localStorageKey, JSON.stringify(result))
      navigateTo("planning/result")
    })()
  }

  const clear = () => {
    window.localStorage.removeItem(localStorageKey)
    dispatch(createClear())
  }

  const removeItinerary = (caseId: CaseId) => {
    const { results } = state
    if (results === undefined) return
    let indices: [number, number, number] | undefined = undefined
    results.lists
      .forEach((list, index0) =>
        list.itineraries.forEach(
          (itineraries, index1) => {
            const index2 = itineraries.findIndex(itinerary => itinerary.case_id === caseId)
            if (index2 !== -1) indices = [index0, index1, index2]
          }
        )
      )
    if (indices === undefined) return
    dispatch(createRemoveItinerary(indices))
  }

  const addItinerary = (siblingCaseId: CaseId, caseId: CaseId) => {
    const { results } = state
    if (results === undefined) return
    let indices: [number, number] | undefined = undefined
    results.lists
      .forEach((list, index0) =>
        list.itineraries.forEach(
          (itineraries, index1) => {
            const index2 = itineraries.findIndex(itinerary => itinerary.case_id === siblingCaseId)
            if (index2 !== -1) indices = [index0, index1]
          }
        )
      )
    console.log(indices)
    if (indices === undefined) return
    const { unplanned_cases: unplannedCases } = results
    const itinerary = unplannedCases.find(itinerary => itinerary.case_id === caseId)
    console.log(itinerary)
    if (itinerary === undefined) return
    console.log(itinerary, indices)
    dispatch(createAddItinerary(itinerary, indices))
  }

  return [state, { initialize, generate, clear, removeItinerary, addItinerary }]
}

export default usePlanning
