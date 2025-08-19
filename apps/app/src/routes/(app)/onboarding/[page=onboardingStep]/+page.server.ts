import { redirect } from '@sveltejs/kit'

import { onboardingStepsOrder, onboardingStepToSlugsMap } from '@hovanka/shared/onboarding'
import { getOnboardingStepBySlug } from '@hovanka/shared/utils/onboarding'

import type { OnboardingFormSubmission } from '@api-types'

import { createOnboardingForm, getOnboardingData, updateOnboardingForm, updateProfile } from '$lib/api'

import type { Actions } from './$types'

export const load = async ({ request: { headers }, params: { page }, locals: { user } }) => {
  const onboardingData = await getOnboardingData({ headers })

  if (!user?.onboardingStep) redirect(307, '/onboarding')
  if (user?.onboardingStep && onboardingStepToSlugsMap[user.onboardingStep] !== page)
    redirect(307, `/onboarding/${onboardingStepToSlugsMap[user.onboardingStep]}`)

  return {
    onboardingStep: getOnboardingStepBySlug(page),
    onboardingData,
  }
}

export const actions = {
  default: async ({ request, request: { headers }, params: { page }, locals }) => {
    try {
      const onboardingStep = getOnboardingStepBySlug(page)
      const formData = await request.formData()
      const formDataValues = formData.getAll('values')
      const formDataValue = formData.get('value')
      console.log(formDataValue)

      const formDataObj = {
        [onboardingStep]:
          typeof formDataValues === 'object' && formDataValues.length > 0
            ? formDataValues.map((value) => Number(value))
            : Boolean(formDataValue),
      }

      // if (!content || typeof content !== 'string') throw new Error('Content is required')

      let onboardingForm = locals.user?.onboardingForm?.docs?.[0]
      let onboardingFormId: number = onboardingForm && typeof onboardingForm === 'object' ? onboardingForm.id : 0

      try {
        if (!onboardingFormId && locals.user)
          onboardingForm = (await createOnboardingForm({
            headers,
            content: { user: locals.user.id },
          })) as unknown as OnboardingFormSubmission
        onboardingFormId = onboardingForm && typeof onboardingForm === 'object' ? onboardingForm.id : 0
      } catch (error) {
        console.error('Failed to create onboarding form:', error)
      }

      const data = await updateOnboardingForm({
        headers,
        id: onboardingFormId,
        content: {
          user: locals.user!.id,
          ...formDataObj,
        },
      })

      const isLastStep = onboardingStep === onboardingStepsOrder[onboardingStepsOrder.length - 1]

      await updateProfile({
        headers,
        id: locals.user!.id,
        data: isLastStep
          ? { onboardingCompleted: true }
          : { onboardingStep: onboardingStepsOrder[onboardingStepsOrder.indexOf(onboardingStep) + 1] },
      })

      return data
    } catch (error) {
      console.error(error)

      return null
    }
  },
} satisfies Actions
