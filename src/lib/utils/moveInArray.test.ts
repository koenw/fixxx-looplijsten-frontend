import moveInArray from "./moveInArray"

it("immutable", () => {
  const arr = ["a", "b", "c"]
  const newArr = moveInArray(arr, 1, 0)
  expect(newArr).toEqual(["b", "a", "c"])
  expect(arr).toEqual(["a", "b", "c"])
})
