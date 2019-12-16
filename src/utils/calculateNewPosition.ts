const calculateNewPosition = (items: { position: number }[], index: Index, newIndex: Index) : number => {

  if (index === newIndex) return items[index].position

  const precedingPosition = newIndex > 0 ? items[newIndex - 1].position : 0
  const length = items.length
  const succeedingPosition = newIndex <= length - 1 ? items[newIndex].position : undefined
  const position = succeedingPosition ?
    precedingPosition + (succeedingPosition - precedingPosition) / 2 :
    items[length - 1].position + 10
  return position
}
export default calculateNewPosition
