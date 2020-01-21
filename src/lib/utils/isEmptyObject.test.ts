import isEmptyObject from "./isEmptyObject"

describe("isEmptyObject", () => {
  it("empty", () => {
    expect(isEmptyObject({})).toBeTruthy()
  })
  it("non empty", () => {
    expect(isEmptyObject({ k: "v" })).toBeFalsy()
  })
  it("date", () => {
    expect(isEmptyObject(new Date())).toBeFalsy()
  })
})
