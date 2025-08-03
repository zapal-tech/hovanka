import { onboardingStepToSlugsMap } from '../onboarding'
import { OnboardingStep } from '../types/onboarding'

export const getOnboardingStepBySlug = (slug: string): OnboardingStep => {
  const step = Object.keys(onboardingStepToSlugsMap).find((key) => onboardingStepToSlugsMap[key as OnboardingStep] === slug)

  if (!step) throw new Error(`Onboarding step with slug "${slug}" not found`)

  return step as OnboardingStep
}
