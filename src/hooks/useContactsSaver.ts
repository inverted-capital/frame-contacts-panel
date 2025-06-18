import { useArtifact } from '@artifact/client/hooks'
import { ulid } from 'ulid'
import { contactSchema } from '../types/contacts.ts'
import type { Contact } from '../types/contacts.ts'

const useContactsSaver = () => {
  const artifact = useArtifact()
  if (!artifact) throw new Error('Artifact not ready')

  return async (contact: unknown): Promise<Contact> => {
    const parsed = contactSchema.parse(contact)
    const id = ulid()
    const file = `contacts/${id}.json`
    artifact.files.write.json(file, { ...parsed, id })
    await artifact.branch.write.commit('Add contact')
    return { ...parsed, id }
  }
}

export default useContactsSaver
