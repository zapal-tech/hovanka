import { Access } from 'payload'

import { isRootUser } from '@api/access'
import { Journal } from '@api/types/generated-types'
import { isAdminPanel } from '@api/utils/isAdminPanel'

export const createAccess: Access<Journal> = ({ req: { user } }) => {
  if (!user) return false

  return true
}

export const readAccess: Access<Journal> = ({ req, req: { user } }) => {
  if (!user) return false
  if (isRootUser(user) && isAdminPanel(req)) return true

  return {
    user: { equals: user.id },
  }
}

export const updateAndDeleteAccess: Access<Journal> = ({ req, req: { user } }) => {
  if (!user) return false
  if (isRootUser(user) && isAdminPanel(req)) return true

  return {
    user: { equals: user.id },
  }
}
