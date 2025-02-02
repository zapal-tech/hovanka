import type { MeOperationResult } from 'payload'

import type { Collection } from '@hovanka/shared/types'

import type { User } from '@api-types'

import { PUBLIC_API_URL } from '$env/static/public'

const apiUrl = `${PUBLIC_API_URL}/api`
const authCollectionApiUrl = `${apiUrl}/users`

type GetMeSuccessResponse = MeOperationResult & { user: User }
type GetMeErrorResponse = null
type GetMeResponse = GetMeSuccessResponse | GetMeErrorResponse

export const getMe = async ({ headers }: { headers: Headers }): Promise<GetMeResponse> => {
  let data: (MeOperationResult & { user: User }) | null = null

  try {
    const response = await fetch(`${authCollectionApiUrl}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: headers.get('cookie') || '',
      },
    })

    if (!response.ok) throw new Error('Failed to get user')

    data = (await response.json()) as GetMeSuccessResponse
  } catch (error) {
    console.error(error)
  }

  return data as GetMeErrorResponse
}

type GetPreferenceSuccessResponse = {
  _id: number
  key: string
  user: number
  userCollection: Collection
  createdAt: string
  updatedAt: string
  value: unknown
}
type GetPreferenceErrorResponse = null
type GetPreferenceResponse = GetPreferenceSuccessResponse | GetPreferenceErrorResponse

export const getPreference = async <T extends string>({
  headers,
  key,
}: {
  headers: Headers
  key: T
}): Promise<GetPreferenceResponse> => {
  let data: GetPreferenceResponse = null

  try {
    const response = await fetch(`${apiUrl}/payload-preferences/${encodeURIComponent(key)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: headers.get('cookie') || '',
      },
    })

    if (!response.ok) throw new Error('Failed to get preference')

    const responseData = (await response.json()) as GetPreferenceSuccessResponse | { value: null; message: string }

    if (responseData?.value === null && 'message' in responseData) {
      console.error(responseData.message)
    } else data = responseData
  } catch (error) {
    console.error(error)
  }

  return data
}

type SetPreferenceSuccessResponse = GetPreferenceSuccessResponse
type SetPreferenceErrorResponse = null
type SetPreferenceResponse = SetPreferenceSuccessResponse | SetPreferenceErrorResponse

export const setPreference = async <T extends string>({
  headers,
  key,
  value,
}: {
  headers: Headers
  key: T
  value: string | boolean | number
}): Promise<SetPreferenceResponse> => {
  let data: GetPreferenceSuccessResponse | SetPreferenceErrorResponse = null

  try {
    const response = await fetch(`${apiUrl}/payload-preferences/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: headers.get('cookie') || '',
      },
      body: JSON.stringify({ value }),
    })

    if (!response.ok) throw new Error('Failed to get preference')

    const responseData = (await response.json()) as {
      message: string
      doc: GetPreferenceSuccessResponse | null
    }

    if (responseData.doc) data = responseData.doc
  } catch (error) {
    console.error(error)
  }

  return data
}

export const updateProfile = async ({ headers }: { headers: Headers }) => {
  let data: (MeOperationResult & { user: User }) | null = null

  try {
    const response = await fetch(`${authCollectionApiUrl}/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: headers.get('cookie') || '',
      },
    })

    if (!response.ok) throw new Error('Failed to update profile')

    data = (await response.json()) as MeOperationResult & { user: User }
  } catch (error) {
    console.error(error)
  }

  return data
}
