import { useArtifact } from '@artifact/client/hooks'
import type { AgentsData } from '../types/agents.ts'

const useAgentsSaver = () => {
  const artifact = useArtifact()

  return async (data: AgentsData): Promise<void> => {
    artifact.files.write.json('agents.json', data)
    await artifact.branch.write.commit('Update agents data')
  }
}

export default useAgentsSaver
