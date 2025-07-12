import { useState } from 'react'
import { askBackend } from '../model/chatModel.js'

export function useChatViewModel() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (prompt) => {
    if (!prompt) return
    const userMsg = { role: 'user', text: prompt }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)
    try {
      const response = await askBackend(prompt)
      const botMsg = { role: 'assistant', text: response }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      const errorMsg = { role: 'assistant', text: 'Error: ' + err.message }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, sendMessage }
}
