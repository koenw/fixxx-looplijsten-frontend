import { useReducer } from "react"
import reducer, {
  initialState,
  createStartFetching,
  createSetResults,
  createClear
} from "./searchReducer"
import { get, notOk, isForbidden } from "../lib/utils/fetch"
import { getUrl } from "../config/domain"
import isEmptyObject from "../lib/utils/isEmptyObject"
import groupCasesByAddress from "../lib/groupCasesByAddress"
import { navigateToLogin } from "../lib/navigateTo"

const useSearch = () : [SearchState, SearchActions] => {

  const [state, dispatch] = useReducer(reducer, initialState as never)

  const search = (postalCode: PostalCode, streetNumber: StreetNumberString, suffix: StreetSuffix) => {

    (async () => {

      dispatch(createStartFetching([postalCode, streetNumber, suffix]))

      const params = { postalCode, streetNumber, suffix }
      const url = getUrl("search", params)
      const [response, result] = await get(url)

      // Handle error responses
      if (isForbidden(response)) return navigateToLogin()
      if (notOk(response)) return false

      // Set results
      const { cases } = result
      const nonEmptyCases = cases.filter((obj: BWVData) => !isEmptyObject(obj))
      const groupedCases = groupCasesByAddress(nonEmptyCases)
      const results = groupedCases.map(cases => ({ success: true, data: { cases } }))
      dispatch(createSetResults(results))
    })()
  }

  const clear = () => {
    dispatch(createClear())
  }

  return [state, { search, clear }]
}

export default useSearch
