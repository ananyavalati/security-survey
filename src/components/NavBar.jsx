
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const linkStyle = { textDecoration: 'none', color: '#e0e0e0' };
  const activeStyle = { fontWeight: 700 };

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
        <span style={{ marginRight: 16, fontWeight: 700 }}>My App</span>

        <NavLink to="/" end style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Home
        </NavLink>

        <NavLink to="/survey" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Survey
        </NavLink>

        <NavLink to="/login" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Login
        </NavLink>

        <NavLink to="/sign-up" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Sign Up
        </NavLink>
      </nav>
    </header>
  );
}
