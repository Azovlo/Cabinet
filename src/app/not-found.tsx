import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <div className="flex items-center space-x-4">
        <h1 className="text-4xl font-bold">404</h1>
        <div className="h-12 border-l border-black"></div>
        <p>This page could not be found.</p>
      </div>
       <Link href="/dashboard" className="mt-8 text-blue-600 hover:underline">
        Go back to Dashboard
      </Link>
    </div>
  )
}
