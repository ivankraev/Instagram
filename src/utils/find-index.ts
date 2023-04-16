type DynamicHeightItem = {
  height: number
}

const TRESHOLD_ITEMS = 3

export const findStartIndex = (
  scrollTop: number,
  data: DynamicHeightItem[],
  cache: Map<number, number>,
) => {
  const scrollTopInt = Math.floor(scrollTop)

  if (cache.has(scrollTopInt)) {
    return cache.get(scrollTopInt) as number
  }

  let sum = 0
  for (let i = 0; i < data.length; i++) {
    sum += data[i].height
    if (sum >= scrollTopInt) {
      const startIndex = Math.max(0, i - TRESHOLD_ITEMS)
      cache.set(scrollTopInt, startIndex)
      return startIndex
    }
  }
  cache.set(scrollTopInt, 0)
  return 0
}

export const findEndIndex = (
  data: DynamicHeightItem[],
  startIndex: number,
  containerHeight: number,
  cache: Map<number, number>,
) => {
  if (cache.has(startIndex)) {
    return cache.get(startIndex) as number
  }

  let sum = 0
  let i = startIndex + TRESHOLD_ITEMS

  while (sum < containerHeight && i < data.length) {
    sum += data[i].height
    i++
  }

  const index = i + TRESHOLD_ITEMS
  cache.set(startIndex, index)

  return index
}

export const calculateContentHeight = (data: DynamicHeightItem[]) => {
  return data.reduce((acc, curr) => acc + curr.height, 0)
}
