import { useState, useMemo } from 'react'
import { Users, UserPlus } from 'lucide-react'
import useContactsData from './hooks/useContactsData'
import useContactsSaver from './hooks/useContactsSaver'
import SearchBar from './components/SearchBar'
import SortDropdown, { type SortOption } from './components/SortDropdown'
import ContactItem from './components/ContactItem'
import ContactDetails from './components/ContactDetails'
import AddContactModal from './components/AddContactModal'
import type { Contact } from './types/contacts'

export default function App() {
  const { data, loading } = useContactsData()
  const saveContact = useContactsSaver()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredAndSortedContacts = useMemo(() => {
    if (!data?.contacts) return []

    const filtered = data.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery) ||
        contact.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    switch (sortBy) {
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name))
      case 'lastSeen':
        return filtered.sort(
          (a, b) =>
            new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
        )
      case 'online':
        return filtered.sort((a, b) => {
          if (a.isOnline && !b.isOnline) return -1
          if (!a.isOnline && b.isOnline) return 1
          return a.name.localeCompare(b.name)
        })
      default:
        return filtered
    }
  }, [data?.contacts, searchQuery, sortBy])

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact)
  }

  const handleCloseDetails = () => {
    setSelectedContact(null)
  }

  const handleAddContact = async (
    contactData: Omit<Contact, 'id' | 'lastSeen'>
  ) => {
    await saveContact({ ...contactData, lastSeen: new Date().toISOString() })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span>Loading contacts...</span>
        </div>
      </div>
    )
  }

  const onlineCount = data?.contacts.filter((c) => c.isOnline).length || 0
  const totalCount = data?.contacts.length || 0

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
                  <p className="text-sm text-gray-500">
                    {totalCount} contacts • {onlineCount} online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Add Contact
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search by name, phone, or email..."
                />
              </div>
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="max-w-2xl mx-auto">
          {filteredAndSortedContacts.length === 0 ? (
            <div className="text-center py-12">
              {searchQuery ? (
                <div>
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No contacts found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms
                  </p>
                </div>
              ) : (
                <div>
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No contacts yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Start by adding your first contact
                  </p>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Add Contact
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white mx-4 mb-4 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {filteredAndSortedContacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  file={contact.file}
                  onClick={handleContactClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <ContactDetails
          contact={selectedContact}
          onClose={handleCloseDetails}
        />
      )}

      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddContact}
      />
    </>
  )
}
