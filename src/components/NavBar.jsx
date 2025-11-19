// NavLink + Link are special link components that change the URL without reloading the page.
import { NavLink, Link, useNavigate } from 'react-router-dom';

// useMemo: creates a value once and reuse it, instead of recreating it every render.
import { useMemo } from 'react';

// createClient: function that gives us a Supabase client to call supabase.auth.signOut().
import { createClient } from '../lib/supabase/client';

// gives us the current logged-in user from AuthProvider.
import { useAuth } from '../lib/supabase/auth/AuthProvider';

export default function NavBar() {
  // // Basic style object for links (no underline, light gray color).
  const linkStyle = { textDecoration: 'none', color: '#e0e0e0' };
  //  style to apply when a nav link is "active" (bold text).
  const activeStyle = { fontWeight: 700 };
  const navigate = useNavigate();

  // Create a single Supabase client instance for this NavBar.
  // useMemo with [] means: only run createClient() once when NavBar mounts,
  // reuse the same client every time NavBar re-renders.
  const supabase = useMemo(() => createClient(), []);

  // Get the currently logged-in user from AuthProvider.
  const { user } = useAuth();

  // Function that runs when the user clicks "Logout".
  const handleLogout = async () => {
    await supabase.auth.signOut(); // Tell Supabase to clear the auth session.
    navigate('/login');  // After logging out, send user to the login page.
  };

  return (
    <header style={{ maxWidth: 1200, margin: '0 auto' }}>
      <nav
        style={{
          display: 'flex',  // flexbox to lay out items in a row
          alignItems: 'center',
          gap: 16,
          padding: '16px 24px',
          borderBottom: '1px solid #3e5e7b',
        }}
      >
        <Link to="/" style={{ ...linkStyle, fontWeight: 700, marginRight: 16 }} aria-label="Go to Home">
          SecuriMe
        </Link>
        
        {/* NavLink gives us an isActive flag so we can style the active route differently. */}
        <NavLink to="/" end style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Home
        </NavLink>

        <NavLink to="/survey" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Survey
        </NavLink>
        
        {/* Right side of the nav bar.
            marginLeft: 'auto' pushes this section to the far right. */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
          {user ? (
            // If a user is logged in: show a Logout button.
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
          ) : (
            // If no user is logged in: show a "Log in / Sign up" link instead.
            <NavLink
              to="/login"
              // Ask React Router if this link is the current page (isActive).
              // If it IS active, use the normal link style plus the bold "active" style.
              // If it is NOT active, just use the normal link style.
              style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
            >
              Log in / Sign up
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
