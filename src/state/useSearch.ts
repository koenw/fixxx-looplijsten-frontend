import { useReducer } from "react"
import reducer, {
  initialState,
  createStartFetching,
  createSetResults,
  createClear
} from "./searchReducer"
import { get, notOk } from "../lib/utils/fetch"
import { getUrl } from "../config/domain"
import isEmptyObject from "../lib/utils/isEmptyObject"

const useSearch = () : [SearchState, SearchActions] => {

  const [state, dispatch] = useReducer(reducer, initialState as never)

  const search = (postalCode: PostalCode, streetNumber: StreetNumberString, suffix: StreetSuffix) => {

    (async () => {

      dispatch(createStartFetching([postalCode, streetNumber, suffix]))

      const params = { postalCode, streetNumber, suffix }
      const url = getUrl("search", params)
      const [response, result] = await get(url)

      // Handle error responses
      if (notOk(response)) return false

      // Set results
      const { cases } = result
      const nonEmptyCases = cases.filter((obj: Object) => !isEmptyObject(obj))
      const hasCases = nonEmptyCases.length > 0
      const results = hasCases ?
        [{
          success: true,
          data: { cases: nonEmptyCases }
        }] :
        []
      dispatch(createSetResults(results))
    })()
  }

  const clear = () => {
    dispatch(createClear())
  }

  return [state, { search, clear }]
}

export default useSearch
