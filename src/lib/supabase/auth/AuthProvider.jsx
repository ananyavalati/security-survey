import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createClient } from '../client'

// Make a shared “box” that will hold two things: user and loading state
const AuthContext = createContext({ user: null, loading: true })

// This will wrap entire app and provide user + loading to it
export function AuthProvider({ children }) {
  const supabase = useMemo(() => createClient(), [])

  // Keep track of the current user and whether we are still checking
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession()
      // safety flag so we do not set state after unmount
      if (isMounted) {
        setUser(error ? null : data.session?.user ?? null)
        setLoading(false)
      }
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    loadSession()

    return () => {
      isMounted = false
      sub.subscription.unsubscribe()
    }
  }, [supabase])

//Share user and loading with everything wrapped inside this provider.
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}