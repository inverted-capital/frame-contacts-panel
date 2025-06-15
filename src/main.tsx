import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArtifactFrame, ArtifactSyncer } from '@artifact/client/react'
import { HOST_SCOPE } from '@artifact/client/api'
import App from './App.tsx'
import type { Contact } from './types/contacts'
import './index.css'

const contacts: Contact[] = [
  {
    id: '01JXS0NVP4MTGAMWNXS06X9XTG',
    name: 'Alice Johnson',
    phone: '+1 (555) 123-4567',
    email: 'alice.johnson@email.com',
    status: 'Hey there! I am using WhatsApp.',
    lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isOnline: true
  },
  {
    id: '01JXS0NVP87P8DDAXCJYGVW16P',
    name: 'Bob Smith',
    phone: '+1 (555) 234-5678',
    email: 'bob.smith@email.com',
    status: 'Busy at work \ud83d\udcbc',
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isOnline: false
  },
  {
    id: '01JXS0NVP88VJHQJRD0K7ZYGYM',
    name: 'Carol Davis',
    phone: '+1 (555) 345-6789',
    email: 'carol.davis@email.com',
    status: 'Coffee lover \u2615',
    lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    isOnline: true
  },
  {
    id: '01JXS0NVP8RHW3D3FB6X9RC9HK',
    name: 'David Wilson',
    phone: '+1 (555) 456-7890',
    status: 'Available',
    lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isOnline: false
  },
  {
    id: '01JXS0NVP975QS1YVTD8NHN42S',
    name: 'Emma Brown',
    phone: '+1 (555) 567-8901',
    email: 'emma.brown@email.com',
    status: 'On vacation \ud83c\udf34',
    lastSeen: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isOnline: false
  },
  {
    id: '01JXS0NVP96SETPHQF7VT512T9',
    name: 'Frank Miller',
    phone: '+1 (555) 678-9012',
    email: 'frank.miller@email.com',
    status: "Can't talk, WhatsApp only",
    lastSeen: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    isOnline: true
  },
  {
    id: '01JXS0NVP905E6RH699CSEKPJQ',
    name: 'Grace Taylor',
    phone: '+1 (555) 789-0123',
    status: 'Living my best life \u2728',
    lastSeen: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    isOnline: false
  },
  {
    id: '01JXS0NVP9ZSQCHN4ZB2MD3552',
    name: 'Henry Anderson',
    phone: '+1 (555) 890-1234',
    email: 'henry.anderson@email.com',
    lastSeen: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    isOnline: true
  }
]

const mockRepo = contacts.reduce<Record<string, Contact>>((acc, c) => {
  acc[`contacts/${c.id}.json`] = c
  return acc
}, {})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ArtifactFrame
      mockRepos={{ mock: { main: mockRepo } }}
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
