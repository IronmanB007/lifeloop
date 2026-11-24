import type { Metadata } from 'next'
import { AssistantPage } from '@/components/lifeloop/assistant-page'

export const metadata: Metadata = {
  title: 'Your LifeLoop Assistant',
  description: 'Ask LifeLoop about deadlines, purchases, subscriptions and documents.',
}

export default function AssistantRoute() {
  return <AssistantPage />
}
