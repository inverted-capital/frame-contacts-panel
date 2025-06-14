import { Phone, Mail, MessageCircle } from 'lucide-react'
import AgentAvatar from './AgentAvatar'
import type { Agent } from '../types/agents'

interface AgentItemProps {
  agent: Agent
  onClick?: (agent: Agent) => void
}

const AgentItem = ({ agent, onClick }: AgentItemProps) => {
  const formatLastSeen = (lastSeen: string) => {
    const date = new Date(lastSeen)
    const now = new Date()
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    )

    if (agent.isOnline) return 'Online'
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div
      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer group border-b border-gray-100 last:border-b-0"
      onClick={() => onClick?.(agent)}
    >
      <AgentAvatar
        name={agent.name}
        avatar={agent.avatar}
        isOnline={agent.isOnline}
        size="md"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 truncate">
            {agent.name}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0">
            {formatLastSeen(agent.lastSeen)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <Phone className="w-3 h-3" />
          <span className="truncate">{agent.phone}</span>
        </div>

        {agent.email && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Mail className="w-3 h-3" />
            <span className="truncate">{agent.email}</span>
          </div>
        )}

        {agent.status && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MessageCircle className="w-3 h-3" />
            <span className="truncate italic">{agent.status}</span>
          </div>
        )}
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
      </div>
    </div>
  )
}

export default AgentItem