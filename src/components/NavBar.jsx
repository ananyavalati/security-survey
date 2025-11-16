import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { createClient } from '../lib/supabase/client';
import { useAuth } from '../lib/supabase/auth/AuthProvider';

export default function NavBar() {
  const linkStyle = { textDecoration: 'none', color: '#e0e0e0' };
  const activeStyle = { fontWeight: 700 };
  const navigate = useNavigate();
  const supabase = useMemo(() => createClient(), []);
  const { user } = useAuth(); // if you are logged in, this is not null

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <header style={{ maxWidth: 1200, margin: '0 auto' }}>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '16px 24px',
          borderBottom: '1px solid #3e5e7b',
        }}
      >
        <Link to="/" style={{ ...linkStyle, fontWeight: 700, marginRight: 16 }} aria-label="Go to Home">
          My App
        </Link>

        <NavLink to="/" end style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Home
        </NavLink>

        <NavLink to="/survey" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Survey
        </NavLink>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
          {user ? (
            <>
              <span style={{ color: '#9aa7b2' }}>Hi</span>
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  color: '#e0e0e0',
                  border: '1px solid #3e5e7b',
                  borderRadius: 6,
                  padding: '6px 10px',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
                Login
              </NavLink>
              <NavLink to="/sign-up" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
