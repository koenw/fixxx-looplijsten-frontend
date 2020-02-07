import { useReducer } from "react"
import reducer, {
  initialState,
  createStartFetching,
  createSetResults
} from "./planningReducer"
import { post, notOk, isForbidden } from "../lib/utils/fetch"
import { getUrl } from "../config/api"
import handleForbiddenResponse from "../lib/handleForbiddenResponse"
import generateWeeklyItinerariesResponse from "../mocks/generate-weekly-itineraries.json"
import navigateTo from "../lib/navigateTo"

const usePlanning = () : [PlanningState, PlanningActions] => {

  const [state, dispatch] = useReducer(reducer, initialState as never)

  const generate = (params: any) => {

    (async () => {

      dispatch(createStartFetching())

      const url = getUrl("generate-weekly-itineraries")
      const [response, result] = await post(url, params)

      // tmp
      const results = {
        success: true,
        data: generateWeeklyItinerariesResponse
      }
      window.setTimeout(() => {
        dispatch(createSetResults(results.data))
        navigateTo("planning/result")
      }, 500)

      /*
      // Handle error responses
      if (isForbidden(response)) return handleForbiddenResponse()
      if (notOk(response)) return false

      // Set results
      console.log(result)
      dispatch(createSetResults(result))
      */
    })()
  }

  return [state, { generate }]
}

export default usePlanning
