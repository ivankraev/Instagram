import { useEffect, useRef, useState } from 'react'
import { Button, Container, Box, Stack, TextField } from '@mui/material'
import io, { Socket } from 'Socket.IO-client'

import SendIcon from '@mui/icons-material/Send'
import MessageItem from './message-item'
import SEOLayout from 'components/seo-layout'

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([{ body: 'Hey there' }])

  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    socketInitializer()
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket')

    socketRef.current = io()

    socketRef.current.on('connect', () => {
      console.log('ws connected')
    })
  }

  return (
    <SEOLayout title="Chat Room">
      <Container
        disableGutters
        sx={{
          pb: 1,
          height: {
            xs: 'calc(100vh - 55.99px)',
            sm: 'calc(100vh - 63.99px)',
            position: 'relative',
          },
        }}
        maxWidth={'sm'}>
        <Box
          sx={{
            height: '100%',
            background:
              'linear-gradient(0deg, rgba(247,247,247,1) 0%, rgba(104,230,255,0.3603816526610645) 51%, rgba(56,162,228,0.6488970588235294) 77%, rgba(25,118,210,0.8365721288515406) 100%)',
          }}>
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
            {messages.map((message) => (
              <MessageItem key={message.body} message={message} />
            ))}
          </Box>
        </Box>
        <Stack direction={'row'} sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <TextField
            placeholder="Type your message..."
            sx={{ flex: 1, '.MuiInputBase-root': { borderRadius: 0 } }}
            size="small"
          />
          <Button sx={{ borderRadius: 0 }} variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Stack>
      </Container>
    </SEOLayout>
  )
}
