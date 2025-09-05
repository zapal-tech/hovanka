import { redirect } from '@sveltejs/kit'

export const load = async ({ locals, url }) => {
  const { user } = locals

  if (user && user.onboardingCompleted) {
    if (url.pathname.endsWith('/onboarding/completed')) return { user }

    redirect(307, '/onboarding/completed')
  }

  return { user }
}
