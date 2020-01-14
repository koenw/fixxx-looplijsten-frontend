import parseLocationSearch from "./parseLocationSearch"

it("one", () => {
  expect(parseLocationSearch("?api=acc")).toEqual({ api: "acc" })
})

it("multiple", () => {
  expect(parseLocationSearch("?api=acc&two=2")).toEqual({ api: "acc", two: "2" })
})
