import authToken from "./authToken"

describe("authToken", () => {

  it("get", () => {
    expect(authToken.get()).toBeUndefined()
  })

  it("set", () => {
    expect(authToken.set()).toBe(false)
    expect(authToken.set("0123456789abcdef1234567890abcdef01234567")).toBe(true)
  })

  it("set, get", () => {
    authToken.set("0123456789abcdef1234567890abcdef01234567")
    expect(authToken.get()).toBe("0123456789abcdef1234567890abcdef01234567")
  })

  it("clear", () => {
    expect(authToken.clear()).toBe(true)
    authToken.set("0123456789abcdef1234567890abcdef01234567")
    authToken.clear()
    expect(authToken.get()).toBeUndefined()
  })
})
