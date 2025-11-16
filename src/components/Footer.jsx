
export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #3e5e7b' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px' }}>
        <small style={{ color: '#9aa7b2' }}>© {new Date().getFullYear()} My App</small>
      </div>
    </footer>
  );
}
