import { useEffect, useRef, useState } from 'react'
import { Button, Container, Box, Stack, TextField } from '@mui/material'
import io, { Socket } from 'Socket.IO-client'

import SendIcon from '@mui/icons-material/Send'
import MessageItem from './message-item'
import SEOLayout from 'components/seo-layout'

let socket: Socket

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState('')

  const lastMessageRef = useRef<HTMLDivElement | null>(null)

  const socketInitializer = async () => {
    await fetch('/api/socket')

    socket = io()

    socket.on('connect', () => {
      console.log('connected to socket')
    })

    socket.on('update-messages', (msg) => {
      setMessages((prev) => [...prev, { body: msg }])
    })
  }

  useEffect(() => {
    socketInitializer()
    // eslint-disable-next-line
  }, [])

  const sendMessage = async () => {
    if (message) {
      lastMessageRef.current?.scrollIntoView()
      setMessages((prev) => [...prev, { body: message }])
      socket.emit('send-message', message)
    }
  }

  return (
    <SEOLayout title="Chat Room">
      <Container
        disableGutters
        sx={{
          height: {
            xs: 'calc(100vh - 55.99px - 2.5rem)',
            sm: 'calc(100vh - 63.99px - 2.5rem)',
            position: 'relative',
            overflowY: 'auto',
            background:
              'linear-gradient(0deg, rgba(247,247,247,1) 0%, rgba(104,230,255,0.3603816526610645) 51%, rgba(56,162,228,0.6488970588235294) 77%, rgba(25,118,210,0.8365721288515406) 100%)',
          },
        }}
        maxWidth={'sm'}>
        <Box sx={{}}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
              gap: '0.5rem',
            }}>
            {messages.map((message, idx) => (
              <div key={idx} ref={idx === messages.length - 1 ? lastMessageRef : undefined}>
                <MessageItem message={message} />
              </div>
            ))}
          </Box>
        </Box>
        <Container disableGutters maxWidth={'sm'} sx={{ position: 'fixed', bottom: 0 }}>
          <Stack direction={'row'}>
            <TextField
              placeholder="Type your message..."
              sx={{ flex: 1, '.MuiInputBase-root': { borderRadius: 0 } }}
              size="small"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage()
                }
              }}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              sx={{ borderRadius: 0 }}
              variant="contained"
              endIcon={<SendIcon />}
              onClick={sendMessage}>
              Send
            </Button>
          </Stack>
        </Container>
      </Container>
    </SEOLayout>
  )
}
