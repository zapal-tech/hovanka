import { Access, User as AuthUser, FieldAccess, PayloadRequest } from 'payload'

import { UserRole } from '@hovanka/shared/types'

import { User } from '@api/types/generated-types'

export const isRootUser = (user?: User | AuthUser | null): boolean => checkUserRoles([UserRole.Root], user)

export const checkUserRoles = (allRoles: User['roles'] = [], user?: User | AuthUser | null): boolean => {
  if (!user) return false

  return allRoles.some((role) => (user as User)?.roles?.some((individualRole) => individualRole === role))
}

export const anyone: Access = () => true

export const allUsers: Access = ({ req: { user } }) => !!user
export const rootUsers: Access = ({ req: { user } }) => isRootUser(user)
export const rootUsersAdminAccess = ({ req: { user } }: { req: PayloadRequest }): boolean => isRootUser(user)

// Fields

export const rootUsersFieldAccess: FieldAccess = ({ req: { user } }) => isRootUser(user)
