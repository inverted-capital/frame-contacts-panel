import { z } from 'zod'

export const agentSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  avatar: z.string().optional(),
  status: z.string().optional(),
  lastSeen: z.string(),
  isOnline: z.boolean().default(false)
})

export const agentsDataSchema = z.object({
  agents: z.array(agentSchema),
  lastUpdated: z.string()
})

export type Agent = z.infer<typeof agentSchema>
export type AgentsData = z.infer<typeof agentsDataSchema>