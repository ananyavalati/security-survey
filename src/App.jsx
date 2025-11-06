// internal

// external
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import LoginPage from './pages/login'
import SurveyPage from './pages/SurveyPage'

// built-in

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="sign-up" element={<LoginPage />} />
        <Route path="/update-password" element={<LoginPage />} />
        <Route path="/forgot-password" element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
