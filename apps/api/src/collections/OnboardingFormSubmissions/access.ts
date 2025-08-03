import { Access } from 'payload'

import { isRootUser } from '@api/access'
import { User } from '@api/types/generated-types'

export const readAndCreateAndUpdateAccess: Access<User> = ({ req: { user } }) => {
  if (!user) return false
  if (isRootUser(user)) return true

  return {
    user: { equals: user.id },
  }
}
