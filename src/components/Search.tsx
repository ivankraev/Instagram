import React, { useState } from 'react'

const text =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, totam hic harum, odit aperiam perferendis aspernatur provident nisi et vitae eum modi eos sit eligendi vel nemo aliquam quam maiores.'

const HighlightedText: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) {
      return <>{text}</>
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi')

    const parts = text.split(regex)

    return (
      <>
        {parts.map((part, i) => (
          <span
            key={i}
            style={{
              backgroundColor: regex.test(part) ? 'red' : 'transparent',
            }}>
            {part}
          </span>
        ))}
      </>
    )
  }

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <p>{highlightText(text, searchTerm)}</p>
    </div>
  )
}

export default HighlightedText
