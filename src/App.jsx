

// external
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// internal
import { AuthProvider } from "./lib/supabase/auth/AuthProvider";
import ProtectedRoute from "./lib/supabase/auth/ProtectedRoute";
import NavBar from './components/NavBar'
import Footer from './components/Footer'

// pages
import Home from './pages/home'
import LoginPage from './pages/login'
import SignUpForm from './pages/sign-up-form'
import ForgotPasswordForm from './pages/forgot-password-form'
import UpdatePasswordForm from './pages/update-password-form'
import SurveyPage from './pages/SurveyPage'

// built-in
import './App.css';
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />

        <main style={{ maxWidth: 920, margin: '60px auto', padding: '0 16px' }}>
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </AuthProvider>
  )
}
