import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createClient } from '../client'

const AuthContext = createContext({ user: null, loading: true })

export function AuthProvider({ children }) {
  const supabase = useMemo(() => createClient(), [])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession()
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

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
