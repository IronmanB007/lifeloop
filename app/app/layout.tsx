import { AppShell } from '@/components/lifeloop/app-shell'

export default function ApplicationLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>
}
