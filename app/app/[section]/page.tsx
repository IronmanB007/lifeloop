import { notFound } from 'next/navigation'
import { CollectionPage } from '@/components/lifeloop/workspace-pages'

const sections = ['life', 'purchases', 'subscriptions', 'documents', 'reminders', 'settings']

export function generateStaticParams() {
  return sections.map(section => ({ section }))
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  if (!sections.includes(section)) notFound()
  return <CollectionPage section={section} />
}
