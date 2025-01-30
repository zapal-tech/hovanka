import { Access } from 'payload'

import { isRootUser } from '@api/access'
import { User } from '@api/types/generated-types'

export const createAccess: Access<User> = ({ req: { user } }) => {
  if (!user) return false
  if (isRootUser(user)) return true

  return false
}

export const readAccess: Access<User> = ({ req: { user } }) => {
  if (!user) return false
  if (isRootUser(user)) return true

  return {
    id: { equals: user.id },
  }
}

export const updateAndDeleteAccess: Access<User> = ({ req: { user } }) => {
  if (!user) return false
  if (isRootUser(user)) return true

  return {
    id: { equals: user.id },
  }
}
