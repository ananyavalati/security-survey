import { Navigate } from 'react-router-dom'

// useAuth gives  access to { user, loading } from the auth context: can see who is logged in and whether we are still checking.
import { useAuth } from './AuthProvider'

export default function ProtectedRoute({ children }) {
  // Call useAuth to get the current auth info.
  const { user, loading } = useAuth()

  // If still loading, don't render anything yet.
  if (loading) return null

  //do not show the protected content if no user logged in
  if (!user) return <Navigate to="/login" replace />

  // If we get here, that means: loading is false (we finished checking) user is not null
  // can show protected content
  return children
}