import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArtifactFrame, ArtifactSyncer } from '@artifact/client/react'
import { HOST_SCOPE } from '@artifact/client/api'
import App from './App.tsx'
import type { AgentsData } from './types/agents'
import './index.css'

const mockAgents: AgentsData = {
  agents: [
    {
      id: '1',
      name: 'Alice Johnson',
      phone: '+1 (555) 123-4567',
      email: 'alice.johnson@email.com',
      status: 'Available for assignments',
      lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
      isOnline: true
    },
    {
      id: '2',
      name: 'Bob Smith',
      phone: '+1 (555) 234-5678',
      email: 'bob.smith@email.com',
      status: 'On mission 🎯',
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      isOnline: false
    },
    {
      id: '3',
      name: 'Carol Davis',
      phone: '+1 (555) 345-6789',
      email: 'carol.davis@email.com',
      status: 'Standby mode ⚡',
      lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
      isOnline: true
    },
    {
      id: '4',
      name: 'David Wilson',
      phone: '+1 (555) 456-7890',
      status: 'Ready for deployment',
      lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      isOnline: false
    },
    {
      id: '5',
      name: 'Emma Brown',
      phone: '+1 (555) 567-8901',
      email: 'emma.brown@email.com',
      status: 'Training mode 📚',
      lastSeen: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      isOnline: false
    },
    {
      id: '6',
      name: 'Frank Miller',
      phone: '+1 (555) 678-9012',
      email: 'frank.miller@email.com',
      status: 'Secure communications only',
      lastSeen: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
      isOnline: true
    },
    {
      id: '7',
      name: 'Grace Taylor',
      phone: '+1 (555) 789-0123',
      status: 'Field operations active 🌟',
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
      mockRepos={{ mock: { main: { 'agents.json': mockAgents } } }}
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