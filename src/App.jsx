// internal
import Home  from './pages/home'
import Dashboard from './pages/dashboard'
import SurveyPage from './pages/SurveyPage'
import LoginPage from './pages/login'

// external
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// built-in

import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/survey' element={<SurveyPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
