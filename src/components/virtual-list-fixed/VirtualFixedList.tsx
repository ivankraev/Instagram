import { useState } from 'react'

type Props = {
  rowHeight: number
  treshold: number
  containerHeight: number
  data: { id: number }[]
}

export default function VirtualList({ rowHeight, treshold, data, containerHeight }: Props) {
  const [scrollTop, setScrollTop] = useState(0)
  const contentHeight = data.length * rowHeight

  const startIndex = Math.ceil(scrollTop / rowHeight)
  const visibleData = data.slice(startIndex, startIndex + treshold)
  const startItemHeight = startIndex * rowHeight
  const endItemHeight = contentHeight - startItemHeight - visibleData.length * rowHeight

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop
    setScrollTop(scrollTop)
  }

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: containerHeight,
        width: 'auto',
        overflowY: 'scroll',
        background: 'grey',
        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
      }}>
      <div style={{ height: startItemHeight }} />
      {visibleData.map((item) => {
        return (
          <div
            key={item.id}
            style={{
              willChange: 'transform',
              height: rowHeight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid lightgrey',
              color: 'lightgrey',
            }}>
            {item.id}
          </div>
        )
      })}
      <div style={{ height: endItemHeight }} />
    </div>
  )
}
