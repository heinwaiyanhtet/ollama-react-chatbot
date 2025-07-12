import { useState } from 'react'
import { useChatViewModel } from '../viewmodel/useChatViewModel.js'
import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/solid'

export default function ChatView() {
  const { messages, loading, sendMessage } = useChatViewModel()
  const [input, setInput] = useState('')

  const send = () => {
    const trimmed = input.trim()
    if (trimmed) {
      sendMessage(trimmed)
      setInput('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    send()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl p-4 space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`rounded-xl px-4 py-2 text-sm md:text-base break-words max-w-full ${m.role === 'user' ? 'bg-green-500 text-white' : 'bg-white text-gray-900'}`}
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
      </div>
      <form onSubmit={handleSubmit} className="border-t bg-white p-4">
        <div className="flex mx-auto max-w-2xl gap-2">
          <textarea
            className="flex-1 border rounded-md p-2 resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows="1"
            placeholder="Type your message..."
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2">
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}
