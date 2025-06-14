import { useEffect, useState, useMemo } from 'react'
import { Users, UserPlus } from 'lucide-react'
import useAgentsData from './hooks/useAgentsData'
import useAgentsSaver from './hooks/useAgentsSaver'
import SearchBar from './components/SearchBar'
import SortDropdown, { type SortOption } from './components/SortDropdown'
import AgentItem from './components/AgentItem'
import AgentDetails from './components/AgentDetails'
import type { AgentsData, Agent } from './types/agents'

const defaultAgents: AgentsData = {
  agents: [],
  lastUpdated: new Date().toISOString()
}

export default function App() {
  const { data, loading, error } = useAgentsData()
  const save = useAgentsSaver()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  useEffect(() => {
    if (error === 'agents.json not found') {
      save(defaultAgents)
    }
  }, [error, save])

  const filteredAndSortedAgents = useMemo(() => {
    if (!data?.agents) return []

    const filtered = data.agents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.phone.includes(searchQuery) ||
        agent.email?.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [data?.agents, searchQuery, sortBy])

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent)
  }

  const handleCloseDetails = () => {
    setSelectedAgent(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span>Loading agents...</span>
        </div>
      </div>
    )
  }

  const onlineCount = data?.agents.filter((c) => c.isOnline).length || 0
  const totalCount = data?.agents.length || 0

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
                  <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
                  <p className="text-sm text-gray-500">
                    {totalCount} agents • {onlineCount} online
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <UserPlus className="w-4 h-4" />
                Add Agent
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

        {/* Agents List */}
        <div className="max-w-2xl mx-auto">
          {filteredAndSortedAgents.length === 0 ? (
            <div className="text-center py-12">
              {searchQuery ? (
                <div>
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No agents found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search terms
                  </p>
                </div>
              ) : (
                <div>
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No agents yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Start by adding your first agent
                  </p>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <UserPlus className="w-4 h-4" />
                    Add Agent
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white mx-4 mb-4 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {filteredAndSortedAgents.map((agent) => (
                <AgentItem
                  key={agent.id}
                  agent={agent}
                  onClick={handleAgentClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Agent Details Modal */}
      {selectedAgent && (
        <AgentDetails
          agent={selectedAgent}
          onClose={handleCloseDetails}
        />
      )}
    </>
  )
}