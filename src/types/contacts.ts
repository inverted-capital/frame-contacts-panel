import { z } from 'zod'

export const contactSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  avatar: z.string().optional(),
  status: z.string().optional(),
  lastSeen: z.string(),
  isOnline: z.boolean().default(false)
})

export const contactsDataSchema = z.object({
  contacts: z.array(contactSchema),
  lastUpdated: z.string()
})

export type Contact = z.infer<typeof contactSchema>
export type ContactsData = z.infer<typeof contactsDataSchema>