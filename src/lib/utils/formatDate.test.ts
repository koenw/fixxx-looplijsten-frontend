import formatDate from "./formatDate"

it("future date", () => {
  const date = "12-31-2019"
  expect(formatDate(date)).toBe("31 dec 2019")
})

it("past date (pre epoch)", () => {
  const date = "2-13-1960"
  expect(formatDate(date)).toBe("13 feb 1960")
})

it("invalid date", () => {
  const date = "31-12-2019"
  expect(formatDate(date)).toBeUndefined()
})

it("day", () => {
  const date = "11-15-2019"
  expect(formatDate(date, true)).toBe("vr 15 nov 2019")
})

it("time", () => {
  const date = "11-18-2019 00:00:00"
  expect(formatDate(date)).toBe("18 nov 2019")
})
