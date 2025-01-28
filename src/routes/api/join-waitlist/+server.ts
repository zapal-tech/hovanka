import type { RequestHandler } from '@sveltejs/kit'

import { SENDGRID_API_KEY, SENDGRID_LIST_ID } from '$env/static/private'

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json()
  const email = body.email

  console.log(email)

  const list_id = SENDGRID_LIST_ID

  try {
    const response = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        list_ids: [list_id],
        contacts: [{ email }],
      }),
    })

    const body = await response.json()

    console.log(response.status)
    console.log(body)

    return new Response(null, { status: response.status, statusText: response.statusText })
  } catch (error) {
    console.error(error)

    return new Response(null, { status: 500 })
  }
}
