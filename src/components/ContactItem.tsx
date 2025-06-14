import { Phone, Mail, MessageCircle } from 'lucide-react'
import ContactAvatar from './ContactAvatar'
import type { Contact } from '../types/contacts'

interface ContactItemProps {
  contact: Contact
  onClick?: (contact: Contact) => void
}

const ContactItem = ({ contact, onClick }: ContactItemProps) => {
  const formatLastSeen = (lastSeen: string) => {
    const date = new Date(lastSeen)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (contact.isOnline) return 'Online'
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div 
      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer group border-b border-gray-100 last:border-b-0"
      onClick={() => onClick?.(contact)}
    >
      <ContactAvatar 
        name={contact.name} 
        avatar={contact.avatar} 
        isOnline={contact.isOnline}
        size="md"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
          <span className="text-xs text-gray-500 flex-shrink-0">
            {formatLastSeen(contact.lastSeen)}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <Phone className="w-3 h-3" />
          <span className="truncate">{contact.phone}</span>
        </div>
        
        {contact.email && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Mail className="w-3 h-3" />
            <span className="truncate">{contact.email}</span>
          </div>
        )}
        
        {contact.status && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MessageCircle className="w-3 h-3" />
            <span className="truncate italic">{contact.status}</span>
          </div>
        )}
      </div>
      
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
      </div>
    </div>
  )
}

export default ContactItem