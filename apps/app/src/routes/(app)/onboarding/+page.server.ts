import { redirect } from '@sveltejs/kit'

import { onboardingSteps, onboardingStepToSlugsMap } from '@hovanka/shared/onboarding'
import { OnboardingStep } from '@hovanka/shared/types/onboarding'

import { updateProfile } from '$lib/api'

import type { Actions } from './$types'

export const actions = {
  default: async ({ request: { headers }, locals }) => {
    try {
      const data = await updateProfile({ headers, id: locals.user!.id, data: { onboardingStep: OnboardingStep.UserGoals } })

      return data
    } catch (error) {
      console.error(error)

      return null
    }
  },
} satisfies Actions

export const load = async ({ locals, request, url }) => {
  const { user } = locals

  if (user && user.onboardingStep && (onboardingSteps as unknown as unknown[]).includes(user.onboardingStep))
    redirect(307, `/onboarding/${onboardingStepToSlugsMap[user.onboardingStep]}`)

  const isSignUpFlow = url.searchParams.get('sign_up_flow') === 'true'

  if (isSignUpFlow) await updateProfile({ headers: request.headers, id: user!.id, data: { signUpFlowCompleted: true } })

  return { isSignUpFlow }
}
