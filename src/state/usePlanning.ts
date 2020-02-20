import { useReducer } from "react"
import reducer, {
  initialState,
  createStartFetching,
  createSetResults,
  createSetError,
  createClear
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

  return [state, { initialize, generate, clear }]
}

export default usePlanning
