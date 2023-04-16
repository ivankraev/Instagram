import { Select, MenuItem, SelectChangeEvent } from '@mui/material'

type Props = {
  options: SelectItem[]
  value: string
  onChange: (event: SelectChangeEvent<string>) => void
}

export default function SelectMenu({ options, value, onChange }: Props) {
  return (
    <Select size="small" value={value} onChange={onChange} fullWidth aria-label="select filter">
      <MenuItem aria-hidden={true} value="" disabled>
        Select a filter
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value} aria-selected={option.value === value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}
