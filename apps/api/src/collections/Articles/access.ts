import { Access } from 'payload'

import { isRootUser } from '@api/access'
import { Article } from '@api/types/generated-types'
import { isAdminPanel } from '@api/utils/isAdminPanel'

export const adminAccess: Access<Article> = ({ req, req: { user } }) => {
  if (isRootUser(user) && isAdminPanel(req)) return true

  return false
}
