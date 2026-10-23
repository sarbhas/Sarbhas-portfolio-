import { useState, useRef, useEffect, useId } from 'react'
import {
  Bot,
  X,
  Send,
  Sparkles,
  Trash2,
  Minimize2,
  Maximize2,
  ShieldAlert,
  ArrowUpRight,
} from 'lucide-react'
import { SplineRobotViewer } from './SplineRobotViewer'
import { SUGGESTED_QUESTIONS, getBotResponse } from './chatbotKnowledge'
import type { ChatMessage } from './types'
import { profile } from '../../data/profile'

export function RobotChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showRobot3D, setShowRobot3D] = useState(true)
  const [inputQuery, setInputQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hello! I am **Sarbhas-Bot** 🤖, an interactive AI assistant equipped with 3D Spline robotics.\n\nI am programmed to answer **strictly about Mohammed Sarbhas** — including his AI/ML projects, technical skills, education at AJ Institute, and contact details.\n\nHow can I help you today? Feel free to ask a question or click one of the suggested prompts below!`,
      timestamp: 'Just now',
      tags: ['AI Assistant', 'Mohammed Sarbhas', 'Strict Profile Scope'],
      links: [
        { label: 'Explore Projects', href: '#projects' },
        { label: 'View Skills', href: '#skills' },
      ],
    },
  ])

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom()
    }
  }, [messages, isOpen, isMinimized, isTyping])

  // Focus input when opening chat
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setHasUnread(false)
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend ?? inputQuery).trim()
    if (!query || isTyping) return

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: now,
    }

    setMessages((prev) => [...prev, userMessage])
    if (!textToSend) setInputQuery('')
    setIsTyping(true)

    // Simulate natural robotic cognition delay
    setTimeout(() => {
      const response = getBotResponse(query)
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRefusal: response.isRefusal,
        links: response.links,
        tags: response.tags,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 450)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleClearHistory = () => {
    setMessages([
      {
        id: `cleared-${Date.now()}`,
        sender: 'bot',
        text: `Memory cleared! 🧹 What would you like to know about **${profile.name}**?`,
        timestamp: 'Just now',
      },
    ])
  }

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. FLOATING LAUNCHER BUTTON                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 print:hidden">
        {!isOpen && (
          <div className="group relative flex items-center">
            {/* Tooltip speech bubble */}
            <div className="mr-3 hidden items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-navy/95 px-3 py-1.5 text-xs font-medium text-cloud shadow-xl backdrop-blur-md transition-all sm:flex group-hover:scale-105">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              <span>Ask about Mohammed Sarbhas!</span>
            </div>

            {/* Pulsing button */}
            <button
              onClick={() => {
                setIsOpen(true)
                setIsMinimized(false)
              }}
              aria-label="Open Sarbhas-Bot 3D Chatbot"
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-navy via-surface-2 to-cyan-950 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-300 hover:scale-110 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] active:scale-95 focus-visible:outline-2 focus-visible:outline-cyan-400"
            >
              {/* Animated outer ring */}
              <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-brand-2 to-violet-500 opacity-30 blur-sm animate-pulse-glow" />

              <Bot className="relative h-7 w-7 transition-transform group-hover:rotate-6 text-cyan-200" />

              {/* Unread indicator */}
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-80" />
                  <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-ink bg-cyan-400 text-[9px] font-bold text-ink items-center justify-center">
                    !
                  </span>
                </span>
              )}
            </button>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. CHATBOT MODAL / WINDOW                                     */}
      {/* ------------------------------------------------------------- */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Mohammed Sarbhas AI Assistant Chatbot"
          className={`fixed z-50 transition-all duration-300 print:hidden ${
            isMinimized
              ? 'bottom-5 right-5 w-80'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[460px] md:w-[480px] max-w-[480px] h-[640px] max-h-[calc(100vh-32px)]'
          }`}
        >
          <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-cyan-500/30 bg-navy/95 shadow-[0_25px_60px_-15px_rgba(3,7,18,0.9),0_0_40px_rgba(6,182,212,0.2)] backdrop-blur-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-surface/80">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/40 bg-gradient-to-br from-cyan-500/20 to-brand/20 text-cyan-300">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-navy bg-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-cloud tracking-wide">
                      Sarbhas-Bot
                    </h3>
                    <span className="rounded bg-cyan-500/15 border border-cyan-400/30 px-1.5 py-0.2 font-mono text-[10px] text-cyan-300">
                      AI 3D
                    </span>
                  </div>
                  <p className="text-[11px] text-mist">
                    Verified Profile Assistant • Only about Mohammed
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 text-mist">
                {!isMinimized && (
                  <>
                    <button
                      onClick={() => setShowRobot3D(!showRobot3D)}
                      title={showRobot3D ? 'Hide 3D Robot' : 'Show 3D Robot'}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        showRobot3D
                          ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                          : 'border-transparent text-mist hover:text-cloud hover:bg-surface-2'
                      }`}
                    >
                      <Bot className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleClearHistory}
                      title="Clear chat history"
                      className="p-1.5 rounded-lg hover:bg-surface-2 hover:text-cloud transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                )}

                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? 'Expand' : 'Minimize'}
                  className="p-1.5 rounded-lg hover:bg-surface-2 hover:text-cloud transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chatbot"
                  className="p-1.5 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Minimized View Bar */}
            {isMinimized ? (
              <div
                onClick={() => setIsMinimized(false)}
                className="flex cursor-pointer items-center justify-between px-4 py-2 text-xs text-mist hover:bg-surface-2 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Click to resume chat</span>
                </span>
                <span className="text-[11px] text-cyan-300 font-mono">Expand ↗</span>
              </div>
            ) : (
              /* Expanded Full View */
              <div className="flex flex-1 flex-col overflow-hidden">
                {/* 3D Spline Robot Viewport */}
                {showRobot3D && (
                  <div className="p-3 pb-1 border-b border-line/60 bg-ink/40">
                    <SplineRobotViewer isTyping={isTyping} compact={messages.length > 3} />
                  </div>
                )}

                {/* Suggested Questions Section */}
                <div className="border-b border-line/60 bg-surface/40 px-3 py-2">
                  <div className="mb-1.5 flex items-center justify-between text-[11px] text-mist">
                    <span className="flex items-center gap-1 font-medium text-cyan-300/90">
                      <Sparkles className="h-3 w-3 text-cyan-400" />
                      Suggested questions about Mohammed:
                    </span>
                    <span className="text-[10px] text-mist/60 font-mono">Strict Scope</span>
                  </div>

                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {SUGGESTED_QUESTIONS.map((sugg) => (
                      <button
                        key={sugg.id}
                        onClick={() => handleSendMessage(sugg.query)}
                        disabled={isTyping}
                        className="whitespace-nowrap rounded-lg border border-cyan-500/20 bg-surface px-2.5 py-1 text-[11px] text-cloud/90 transition-all hover:border-cyan-400 hover:bg-cyan-950/40 hover:text-cyan-200 active:scale-95 disabled:opacity-50"
                      >
                        {sugg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages Stream */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 text-sm ${
                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 shadow-sm mt-0.5">
                          <Bot className="h-4 w-4" />
                        </div>
                      )}

                      <div
                        className={`relative max-w-[85%] rounded-2xl px-3.5 py-2.5 transition-all ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-brand to-brand-2 text-white shadow-md rounded-tr-sm'
                            : msg.isRefusal
                            ? 'border border-amber-500/30 bg-amber-950/20 text-cloud rounded-tl-sm'
                            : 'border border-line bg-surface/90 text-cloud rounded-tl-sm shadow-sm'
                        }`}
                      >
                        {/* Refusal Badge if query was out-of-scope */}
                        {msg.isRefusal && (
                          <div className="mb-2 flex items-center gap-1.5 rounded border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                            <ShieldAlert className="h-3 w-3" />
                            <span>STRICT BOUNDARY ACTIVATED</span>
                          </div>
                        )}

                        {/* Message Content with Markdown Formatting */}
                        <div className="whitespace-pre-line leading-relaxed text-[13px]">
                          {msg.text}
                        </div>

                        {/* Optional Quick Link Buttons */}
                        {msg.links && msg.links.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap gap-1.5 pt-2 border-t border-line/60">
                            {msg.links.map((link, idx) => (
                              <a
                                key={idx}
                                href={link.href}
                                onClick={() => {
                                  if (link.href.startsWith('#')) {
                                    // Smoothly navigate within page
                                    const target = document.querySelector(link.href)
                                    target?.scrollIntoView({ behavior: 'smooth' })
                                  }
                                }}
                                className="inline-flex items-center gap-1 rounded-md border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 text-[11px] font-medium text-cyan-300 transition-colors hover:bg-cyan-500/20 hover:text-cyan-100"
                              >
                                <span>{link.label}</span>
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            ))}
                          </div>
                        )}

                        {/* Optional Meta Tags */}
                        {msg.tags && msg.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {msg.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="rounded bg-navy-2/80 px-1.5 py-0.5 font-mono text-[9px] text-mist/80"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <span className="mt-1 block text-right font-mono text-[9px] text-mist/60">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3 text-sm">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/60 text-cyan-300">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-line bg-surface/90 px-4 py-3">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce" />
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.15s]" />
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.3s]" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-line bg-surface/90 p-3">
                  <div className="relative flex items-center">
                    <input
                      ref={inputRef}
                      id={inputId}
                      type="text"
                      value={inputQuery}
                      onChange={(e) => setInputQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask anything about Mohammed Sarbhas..."
                      aria-label="Ask chatbot question"
                      disabled={isTyping}
                      className="w-full rounded-xl border border-line bg-navy/90 py-2.5 pl-3.5 pr-12 text-sm text-cloud placeholder-mist/60 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 disabled:opacity-60"
                    />

                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputQuery.trim() || isTyping}
                      aria-label="Send question"
                      className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-ink transition-all hover:bg-cyan-400 active:scale-95 disabled:opacity-30 disabled:hover:bg-cyan-500 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] text-mist/70">
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      Strict AI Guard: Answers solely about Mohammed
                    </span>
                    <span className="font-mono text-mist/50">Enter ↵</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
