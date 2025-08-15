import { redirect } from 'next/navigation'

// This is the landing page for the authenticated part of the app.
// It just redirects to the dashboard.
export default function AuthenticatedRootPage() {
  redirect('/dashboard')
}
