import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import Life from './pages/Life';
import Health from './pages/Health';
import Car from './pages/Car';
import Business from './pages/Business';
import Dashboard from './pages/Dashboard';
import Support from './pages/Support';
import Plans from './pages/Plans';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

// Dashboard Components
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminOverview from './pages/dashboard/AdminOverview';
import SuperAdminConsole from './pages/dashboard/SuperAdminConsole';
import CSRHub from './pages/dashboard/CSRHub';

// Wrapper to conditionally show Navbar/Footer
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || 
                      location.pathname.startsWith('/super-admin') || 
                      location.pathname.startsWith('/csr');

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <AppLayout>
        <Routes>
          {/* Main Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/life" element={<Life />} />
          <Route path="/health" element={<Health />} />
          <Route path="/car" element={<Car />} />
          <Route path="/business" element={<Business />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="dashboard" element={<AdminOverview />} />
            {/* Other admin routes can be added here */}
            <Route path="users" element={<Admin />} /> {/* Reuse existing Admin for User Control */}
          </Route>

          {/* Super Admin Dashboard Routes */}
          <Route path="/super-admin" element={<DashboardLayout />}>
            <Route index element={<SuperAdminConsole />} />
            <Route path="dashboard" element={<SuperAdminConsole />} />
            {/* Other super admin routes */}
          </Route>

          {/* CSR Dashboard Routes */}
          <Route path="/csr" element={<DashboardLayout />}>
            <Route index element={<CSRHub />} />
            <Route path="dashboard" element={<CSRHub />} />
            {/* Other CSR routes */}
          </Route>
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
