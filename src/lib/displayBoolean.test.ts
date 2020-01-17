import displayBoolean from "./displayBoolean"

describe("displayBoolean", () => {
  it("undefined", () => {
    expect(displayBoolean(undefined)).toBe("Nee")
  })
  it("undefined", () => {
    expect(displayBoolean(false)).toBe("Nee")
  })
  it("undefined", () => {
    expect(displayBoolean(true)).toBe("Ja")
  })
})
