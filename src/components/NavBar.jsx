import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const linkStyle = { textDecoration: "none", color: "#0f172a" };
  const activeStyle = { fontWeight: 700 };

  return (
    <nav style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb" }}>
      <span style={{ marginRight: 16, fontWeight: 700 }}>My App</span>

      <NavLink
      to="/"
      end
      lassName={({ isActive }) => (isActive ? "active" : undefined)}
      style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
>
  Home
</NavLink>


      <span style={{ margin: "0 10px" }}>·</span>

      <NavLink to="/survey"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
      >
        Survey
      </NavLink>

      <span style={{ margin: "0 10px" }}>·</span>

      <NavLink to="/dashboard"
        style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
      >
        Dashboard
      </NavLink>

      <span style={{ margin: "0 10px" }}>·</span>

      <Link to="/login" style={linkStyle}>Login</Link>
    </nav>
  );
}
