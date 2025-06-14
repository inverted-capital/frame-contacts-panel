import {
  X,
  Phone,
  MessageCircle,
  Mail,
  Video,
  User,
  Clock,
  Shield
} from 'lucide-react'
import ContactAvatar from './ContactAvatar'
import type { Contact } from '../types/contacts'

interface ContactDetailsProps {
  contact: Contact
  onClose: () => void
}

const ContactDetails = ({ contact, onClose }: ContactDetailsProps) => {
  const formatLastSeen = (lastSeen: string) => {
    const date = new Date(lastSeen)
    const now = new Date()
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    )

    if (contact.isOnline) return 'Online now'
    if (diffInHours < 1) return 'Last seen just now'
    if (diffInHours < 24) return `Last seen ${diffInHours}h ago`
    if (diffInHours < 168)
      return `Last seen ${Math.floor(diffInHours / 24)}d ago`
    return `Last seen ${date.toLocaleDateString()}`
  }

  const handleAction = (action: string) => {
    console.log(`${action} action for ${contact.name}`)
    // In a real app, this would trigger the appropriate action
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <ContactAvatar
              name={contact.name}
              avatar={contact.avatar}
              isOnline={contact.isOnline}
              size="lg"
            />
            <h2 className="text-2xl font-bold mt-4 mb-2">{contact.name}</h2>
            <div className="flex items-center gap-2 text-blue-100">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                {formatLastSeen(contact.lastSeen)}
              </span>
            </div>
            {contact.status && (
              <p className="text-blue-100 text-sm mt-2 italic">
                "{contact.status}"
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around p-6 border-b border-gray-100">
          <button
            onClick={() => handleAction('call')}
            className="flex flex-col items-center gap-2 p-3 hover:bg-green-50 rounded-xl transition-colors group"
          >
            <div className="p-3 bg-green-100 group-hover:bg-green-200 rounded-xl transition-colors">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Call</span>
          </button>

          <button
            onClick={() => handleAction('video')}
            className="flex flex-col items-center gap-2 p-3 hover:bg-blue-50 rounded-xl transition-colors group"
          >
            <div className="p-3 bg-blue-100 group-hover:bg-blue-200 rounded-xl transition-colors">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Video</span>
          </button>

          <button
            onClick={() => handleAction('message')}
            className="flex flex-col items-center gap-2 p-3 hover:bg-purple-50 rounded-xl transition-colors group"
          >
            <div className="p-3 bg-purple-100 group-hover:bg-purple-200 rounded-xl transition-colors">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Message</span>
          </button>
        </div>

        {/* Contact Information */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Contact Info
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Phone className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{contact.phone}</p>
              </div>
            </div>

            {contact.email && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Mail className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{contact.email}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Contact ID</p>
                <p className="font-medium text-gray-900 font-mono text-xs">
                  {contact.id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="p-6 pt-0 space-y-2">
          <button
            onClick={() => handleAction('block')}
            className="w-full flex items-center justify-center gap-2 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <Shield className="w-4 h-4" />
            <span className="font-medium">Block Contact</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactDetails
