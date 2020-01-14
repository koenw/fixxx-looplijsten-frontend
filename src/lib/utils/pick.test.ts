import pick from "./pick"

describe("pick", () => {
  
  it("empty", () => {
    expect(pick({}, [])).toEqual({})
  })

  it("key", () => {
    expect(pick({ key: "k" }, ["key"])).toEqual({ key: "k" })
  })

  it("non existent", () => {
    expect(pick({ key: "k" }, ["key", "key2"])).toEqual({ key: "k" })
  })

  it("pick", () => {
    expect(pick({ key: "k", key2: "l" }, ["key"])).toEqual({ key: "k" })
  })
})
