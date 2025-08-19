import { redirect } from '@sveltejs/kit'

export const load = async ({ locals }) => {
  const { user } = locals

  if (user && !user.onboardingCompleted) redirect(307, `/onboarding${user.signUpFlowCompleted ? '' : '?sign_up_flow=true'}`)

  return { user }
}
