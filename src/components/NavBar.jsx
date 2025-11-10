// src/components/NavBar.jsx
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const linkStyle = { textDecoration: 'none', color: '#e0e0e0' };
  const activeStyle = { fontWeight: 700 };

  return (
    <nav style={{ padding: '12px 16px', borderBottom: '1px solid #3e5e7b' }}>
      <span style={{ marginRight: 16, fontWeight: 700 }}>My App</span>

      <NavLink to="/" end style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
        Home
      </NavLink>

      <span style={{ margin: '0 10px' }} />

      <NavLink to="/survey" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
        Survey
      </NavLink>

      <span style={{ margin: '0 10px' }} />

      <NavLink to="/login" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
        Login
      </NavLink>

      <span style={{ margin: '0 10px' }} />

      {/* ⬇️ New Sign Up link */}
      <NavLink to="/sign-up" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
        Sign Up
      </NavLink>
    </nav>
  );
}
