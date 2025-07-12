import { useState } from 'react'
import { useChatViewModel } from '../viewmodel/useChatViewModel.js'
import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/solid'

export default function ChatView() {
  const { messages, loading, sendMessage } = useChatViewModel()
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (trimmed) {
      sendMessage(trimmed)
      setInput('')
    }
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`rounded-lg px-3 py-2 max-w-xs break-words ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <ArrowPathIcon className="h-5 w-5 text-gray-500 animate-spin" />
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex border-t p-4 gap-2">
        <input
          className="flex-1 border rounded-md p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2">
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
}
