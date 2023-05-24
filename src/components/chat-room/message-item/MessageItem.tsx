import { Chip } from '@mui/material'
import FaceIcon from '@mui/icons-material/Face'

type Props = {
  message: Message
}

export default function MessageItem({ message }: Props) {
  return (
    <Chip
      sx={{
        height: 'auto',
        background: '#fcfcfc',
        padding: '0.5rem',
        '& .MuiChip-label': {
          fontSize: '0.875rem',
          display: 'block',
          whiteSpace: 'normal',
        },
        '.MuiSvgIcon-root': {
          alignSelf: 'start',
        },
      }}
      label={message.body}
      icon={<FaceIcon />}
    />
  )
}
