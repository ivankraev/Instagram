import { useEffect, useRef, useState } from 'react'
import { Button, Container, Box, Stack, TextField } from '@mui/material'
import io, { Socket } from 'Socket.IO-client'

import SendIcon from '@mui/icons-material/Send'
import MessageItem from './message-item'
import SEOLayout from 'components/seo-layout'
import { MessageWrapper, Wrapper } from './ChatRoom.styled'

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
  }, [])

  const sendMessage = async () => {
    if (message) {
      lastMessageRef.current?.scrollIntoView()
      setMessages((prev) => [...prev, { body: message }])
      socket.emit('send-message', message)
      setMessage('')
    }
  }

  return (
    <SEOLayout title="Chat Room">
      <Wrapper disableGutters maxWidth={'sm'}>
        <Box>
          <MessageWrapper>
            {messages.map((message, idx) => (
              <div key={idx} ref={idx === messages.length - 1 ? lastMessageRef : undefined}>
                <MessageItem message={message} />
              </div>
            ))}
          </MessageWrapper>
        </Box>
        <Container disableGutters maxWidth={'sm'} sx={{ position: 'fixed', bottom: 0 }}>
          <Stack direction={'row'}>
            <TextField
              placeholder="Type your message..."
              sx={{ flex: 1, '.MuiInputBase-root': { borderRadius: 0 } }}
              size="small"
              value={message}
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
      </Wrapper>
    </SEOLayout>
  )
}
