export interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: string
  isRefusal?: boolean
  links?: { label: string; href: string }[]
  tags?: string[]
}

export interface SuggestedQuestion {
  id: string
  label: string
  query: string
  category: 'about' | 'projects' | 'skills' | 'education' | 'contact'
}
