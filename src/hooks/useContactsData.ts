import { useExists, useJson } from '@artifact/client/hooks'
import { contactsDataSchema, type ContactsData } from '../types/contacts.ts'
import { useEffect, useState } from 'react'

const useContactsData = () => {
  const exists = useExists('contacts.json')
  const raw = useJson('contacts.json')
  const [data, setData] = useState<ContactsData>()

  useEffect(() => {
    if (raw !== undefined) {
      setData(contactsDataSchema.parse(raw))
    }
  }, [raw])

  const loading = exists === null || (exists && raw === undefined)
  const error = exists === false ? 'contacts.json not found' : null

  return { data, loading, error }
}

export default useContactsData