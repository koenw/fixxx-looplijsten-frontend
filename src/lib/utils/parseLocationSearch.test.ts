import parseLocationSearch from "./parseLocationSearch"

it("one", () => {
  expect(parseLocationSearch("?key=value")).toEqual({ key: "value" })
})

it("multiple", () => {
  expect(parseLocationSearch("?key=value&two=2")).toEqual({ key: "value", two: "2" })
})
