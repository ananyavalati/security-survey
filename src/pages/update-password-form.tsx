import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';

export default function UpdatePasswordForm() {
  const supabase = createClient();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // When the user comes from the email link, Supabase sets a recovery session.
  // checks that a session exists before allowing password update.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setReady(true);
      } else {
        setErr('Open this page from the password reset email link.');
      }
    });
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);

    if (password.length < 8) {
      setErr('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setErr('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) setErr(error.message);
    else setMsg('Password updated. You can now sign in.');
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Set a new password</h2>

      {!ready && !err && <p>Checking your session…</p>}

      {ready && (
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
          <label htmlFor="pw">New password</label>
          <input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="pw2">Confirm password</label>
          <input
            id="pw2"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Updating…' : 'Update password'}
          </button>
        </form>
      )}

      {msg && <p style={{ color: 'green' }}>{msg}</p>}
      {err && <p style={{ color: 'crimson' }}>{err}</p>}
    </div>
  );
}
