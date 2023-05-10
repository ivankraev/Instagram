import { Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'

type Props = {
  options: SelectItem[]
  onChange: (event: SelectChangeEvent<string>) => void
}

export default function SelectMenu({ options, onChange }: Props) {
  const [value, setValue] = useState(options[0].value)

  return (
    <Select
      size="small"
      value={value}
      data-cy="select"
      onChange={(e) => {
        setValue(e.target.value)
        onChange(e)
      }}
      fullWidth
      aria-label="select filter">
      <MenuItem aria-hidden={true} value="" disabled>
        Select a filter
      </MenuItem>
      {options.map((option) => (
        <MenuItem
          data-cy={`menu-item-${option.value}`}
          key={option.value}
          value={option.value}
          aria-selected={option.value === value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}
