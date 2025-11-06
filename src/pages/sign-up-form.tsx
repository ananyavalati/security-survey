import { useState } from 'react'
import { createClient } from '../lib/supabase/client'

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    const supabase = createClient()
    e.preventDefault()
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      return
    }
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      setSuccess(true)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // used chatgpt by replacing cn(...) with a plain class string join.
    <div className={`flex flex-col gap-6 ${className ?? ''}`} {...props}>
      {success ? (
        <div>
          <div>
            <div className="text-2xl">Thank you for signing up!</div>
            <div>Check your email to confirm</div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              You've successfully signed up. Please check your email to confirm your account before
              signing in.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className="text-2xl">Sign up</div>
            <div>Create a new account</div>
          </div>
          <div>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="password">Password</label>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="repeat-password">Repeat Password</label>
                  </div>
                  <input
                    id="repeat-password"
                    type="password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating an account...' : 'Sign up'}
                </button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <a href="/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
