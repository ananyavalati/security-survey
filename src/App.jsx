
// external
// Import pieces from React Router:
// - Router: wraps the app and enables client-side routing.
// - Routes: the place where you list all your routes.
// - Route: defines one URL path and which component to show.
// - Navigate: used to redirect from one route to another.
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// internal
// component that checks who is logged in, and shares it with whole app
import { AuthProvider } from "./lib/supabase/auth/AuthProvider";

// wrapper that only lets logged-in users see certain pages
import ProtectedRoute from "./lib/supabase/auth/ProtectedRoute";
import NavBar from './components/NavBar'
import Footer from './components/Footer'

// pages
// main page components for each part of app.
import Home from './pages/home'
import LoginPage from './pages/login'
import SignUpForm from './pages/sign-up-form'
import ForgotPasswordForm from './pages/forgot-password-form'
import UpdatePasswordForm from './pages/update-password-form'
import SurveyPage from './pages/SurveyPage'

// built-in
// Global styles for App component
import './App.css';

// app is the main react component (defines the layout/header/footer, routes, and wraps)
export default function App() {
  return (
    <AuthProvider>
      {/* Router enables navigation between pages without full page reloads. */}
      <Router>
        <NavBar />
        {/* main is the central content area of the page. */}
        <main style={{ maxWidth: 1200, margin: '60px auto', padding: '0 24px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/update-password" element={<UpdatePasswordForm />} />
            <Route
              path="/survey"
              element={
                <ProtectedRoute>
                  <SurveyPage />
                </ProtectedRoute>
              }
            />
            {/* path="*" matches any URL that doesn't match the above routes.
                <Navigate to="/" replace /> redirects the user back to the home page.
                So if someone types a wrong path like "/asdf", they get sent to "/". */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  )
}