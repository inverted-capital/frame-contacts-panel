import { useExists, useJson } from '@artifact/client/hooks'
import { contactsDataSchema } from '../types/contacts.ts'
import { useMemo } from 'react'

const useContactsData = () => {
  const exists = useExists('contacts.json')
  const raw = useJson('contacts.json')

  const data = useMemo(() => {
    if (raw !== undefined) {
      return contactsDataSchema.parse(raw)
    }
    return undefined
  }, [raw])

  const loading = exists === null || (exists && raw === undefined)
  const error = exists === false ? 'contacts.json not found' : null

  return { data, loading, error }
}

export default useContactsData
