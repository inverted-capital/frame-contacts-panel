import { ArtifactContext, useDir, useExists } from '@artifact/client/hooks'
import { useContext, useMemo } from 'react'
import { contactSchema } from '../types/contacts.ts'
import type { Contact } from '../types/contacts.ts'

const useContactsData = () => {
  const { store } = useContext(ArtifactContext)
  const exists = useExists('contacts')
  const metas = useDir('contacts')

  const contacts = useMemo(() => {
    if (!metas || !store) return undefined
    const list: (Contact & { file: string })[] = []
    for (const meta of metas) {
      if (meta.type !== 'blob' || !meta.path.endsWith('.json')) continue
      const raw = store
        .getState()
        .readFile(`contacts/${meta.path}`, (b) =>
          JSON.parse(new TextDecoder().decode(b))
        )
      if (!raw) continue
      try {
        list.push({ ...contactSchema.parse(raw), file: meta.path })
      } catch {
        // ignore invalid files
      }
    }
    return list
  }, [metas, store])

  const data = contacts === undefined ? undefined : { contacts }

  const loading = exists === null || (exists && metas === undefined)
  const error = exists === false ? 'contacts folder not found' : null

  return { data, loading, error }
}

export default useContactsData
