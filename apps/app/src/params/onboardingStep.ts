import type { ParamMatcher } from '@sveltejs/kit'

import { onboardingStepSlugs } from '@hovanka/shared/onboarding'

export const match = ((param: string): param is (typeof onboardingStepSlugs)[number] => {
  return (onboardingStepSlugs as unknown as string[]).includes(param)
}) satisfies ParamMatcher
