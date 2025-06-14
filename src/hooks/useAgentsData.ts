import { useExists, useJson } from '@artifact/client/hooks'
import { agentsDataSchema } from '../types/agents.ts'
import { useMemo } from 'react'

const useAgentsData = () => {
  const exists = useExists('agents.json')
  const raw = useJson('agents.json')

  const data = useMemo(() => {
    if (raw !== undefined) {
      return agentsDataSchema.parse(raw)
    }
    return undefined
  }, [raw])

  const loading = exists === null || (exists && raw === undefined)
  const error = exists === false ? 'agents.json not found' : null

  return { data, loading, error }
}

export default useAgentsData