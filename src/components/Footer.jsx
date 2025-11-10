// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer
      style={{
        padding: '16px',
        borderTop: '1px solid #e5e7eb',
        marginTop: '40px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#666',
      }}
    >
      <small>© {new Date().getFullYear()} My App. All rights reserved.</small>
    </footer>
  );
}
