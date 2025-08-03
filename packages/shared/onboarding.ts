import { OnboardingStep } from './types/onboarding'

export const onboardingStepSlugs = ['user-goals', 'emotional-state', 'features', 'ai'] as const

export const onboardingSteps = [
  OnboardingStep.UserGoals,
  OnboardingStep.InitialEmotionalState,
  OnboardingStep.WantedFeatures,
  OnboardingStep.PersonalizedAINotificationsPermission,
] as const

export const onboardingStepToSlugsMap = {
  [OnboardingStep.UserGoals]: 'user-goals',
  [OnboardingStep.InitialEmotionalState]: 'emotional-state',
  [OnboardingStep.WantedFeatures]: 'features',
  [OnboardingStep.PersonalizedAINotificationsPermission]: 'ai',
} as const

export const onboardingStepsOrder = [
  OnboardingStep.UserGoals,
  OnboardingStep.InitialEmotionalState,
  OnboardingStep.WantedFeatures,
  OnboardingStep.PersonalizedAINotificationsPermission,
] as const
