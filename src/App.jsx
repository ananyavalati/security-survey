
// internal
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// external
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import Home from './pages/home';
import LoginPage from './pages/login';
import SurveyPage from './pages/SurveyPage';
import SignUpForm from './pages/sign-up-form';
import ForgotPasswordForm from './pages/forgot-password-form';
import UpdatePasswordForm from './pages/update-password-form';
import ResultsPage from './pages/results';

// built-in
import './App.css';

export default function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<SurveyPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/update-password" element={<UpdatePasswordForm />} />
      </Routes>

      <Footer />
    </Router>
  );
}
