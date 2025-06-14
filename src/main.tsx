import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArtifactFrame, ArtifactSyncer } from '@artifact/client/react'
import { HOST_SCOPE } from '@artifact/client/api'
import App from './App.tsx'
import type { ContactsData } from './types/contacts'
import './index.css'

const mockContacts: ContactsData = {
  contacts: [
    {
      id: '1',
      name: 'Alice Johnson',
      phone: '+1 (555) 123-4567',
      email: 'alice.johnson@email.com',
      status: 'Hey there! I am using WhatsApp.',
      lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      isOnline: true
    },
    {
      id: '2',
      name: 'Bob Smith',
      phone: '+1 (555) 234-5678',
      email: 'bob.smith@email.com',
      status: 'Busy at work 💼',
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      isOnline: false
    },
    {
      id: '3',
      name: 'Carol Davis',
      phone: '+1 (555) 345-6789',
      email: 'carol.davis@email.com',
      status: 'Coffee lover ☕',
      lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
      isOnline: true
    },
    {
      id: '4',
      name: 'David Wilson',
      phone: '+1 (555) 456-7890',
      status: 'Available',
      lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      isOnline: false
    },
    {
      id: '5',
      name: 'Emma Brown',
      phone: '+1 (555) 567-8901',
      email: 'emma.brown@email.com',
      status: 'On vacation 🌴',
      lastSeen: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      isOnline: false
    },
    {
      id: '6',
      name: 'Frank Miller',
      phone: '+1 (555) 678-9012',
      email: 'frank.miller@email.com',
      status: 'Can\'t talk, WhatsApp only',
      lastSeen: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
      isOnline: true
    },
    {
      id: '7',
      name: 'Grace Taylor',
      phone: '+1 (555) 789-0123',
      status: 'Living my best life ✨',
      lastSeen: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      isOnline: false
    },
    {
      id: '8',
      name: 'Henry Anderson',
      phone: '+1 (555) 890-1234',
      email: 'henry.anderson@email.com',
      lastSeen: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
      isOnline: true
    }
  ],
  lastUpdated: new Date().toISOString()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ArtifactFrame
      mockRepos={{ mock: { main: { 'contacts.json': mockContacts } } }}
      mockFrameProps={{
        target: { did: HOST_SCOPE.did, repo: 'mock', branch: 'main' }
      }}
    >
      <ArtifactSyncer>
        <App />
      </ArtifactSyncer>
    </ArtifactFrame>
  </StrictMode>
)