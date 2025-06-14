import { useArtifact } from '@artifact/client/hooks'
import type { ContactsData } from '../types/contacts.ts'

const useContactsSaver = () => {
  const artifact = useArtifact()

  return async (data: ContactsData): Promise<void> => {
    artifact.files.write.json('contacts.json', data)
    await artifact.branch.write.commit('Update contacts data')
  }
}

export default useContactsSaver