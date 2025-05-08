import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import OwnerLoginPage from './pages/auth/OwnerLoginPage';
import ResidentDashboard from './pages/dashboards/ResidentDashboard';
import OwnerDashboard from './pages/dashboards/OwnerDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import FacilityBooking from './pages/services/FacilityBooking';
import ComplaintSystem from './pages/services/ComplaintSystem';
import PaymentPortal from './pages/services/PaymentPortal';
import GatepassSystem from './pages/services/GatepassSystem';
import VotingPortal from './pages/services/VotingPortal';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route path="/owner-login" element={<OwnerLoginPage />} />
              <Route path="/resident-dashboard/*" element={<ResidentDashboard />} />
              <Route path="/owner-dashboard/*" element={<OwnerDashboard />} />
              <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
              <Route path="/facility-booking" element={<FacilityBooking />} />
              <Route path="/complaints" element={<ComplaintSystem />} />
              <Route path="/payments" element={<PaymentPortal />} />
              <Route path="/gatepass" element={<GatepassSystem />} />
              <Route path="/voting" element={<VotingPortal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;