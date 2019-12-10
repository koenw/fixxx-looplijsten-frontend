const moveInArray = (arr: Itineraries, index: Index, newIndex: Index) => {
  const clone = [...arr]
  clone.splice(newIndex, 0, clone.splice(index, 1)[0])
  return clone
}
export default moveInArray
