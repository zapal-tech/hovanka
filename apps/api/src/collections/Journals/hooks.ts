import { CollectionBeforeValidateHook } from 'payload'

import { isRootUser } from '@api/access'
import { Journal } from '@api/types/generated-types'

export const setJournalOwner: CollectionBeforeValidateHook<Journal> = async ({ data, req: { user } }) => {
  if (isRootUser(user)) {
    if (data && !data.user) data.user = user?.id

    return data
  }

  if (data) data.user = user?.id

  return data
}
