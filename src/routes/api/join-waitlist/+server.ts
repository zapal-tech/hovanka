import client from '@sendgrid/client'

import { SENDGRID_API_KEY, SENDGRID_LIST_ID } from '$env/static/private'

import type { RequestHandler } from '../$types'

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json()
  const email = body.email

  console.log(email)

  client.setApiKey(SENDGRID_API_KEY)

  const list_id = SENDGRID_LIST_ID

  try {
    const [response] = await client.request({
      url: `/v3/marketing/contacts`,
      method: 'PUT',
      body: JSON.stringify({
        list_ids: [list_id],
        contacts: [{ email }],
      }),
    })

    console.log(response.statusCode)
    console.log(response.body)

    return new Response(null, { status: response.statusCode })
  } catch (error) {
    console.error(error)
    console.error((error as Record<string, Record<string, unknown>>)?.response?.body)

    return new Response(null, { status: 500 })
  }
}
