import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import RoleProtectedRoute from './components/common/RoleProtectedRoute';
import PublicRoute from './components/common/PublicRoute';

// Dashboard Components
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminOverview from './pages/dashboard/AdminOverview';
import SuperAdminConsole from './pages/dashboard/SuperAdminConsole';
import CSRHub from './pages/dashboard/CSRHub';
import AgentPortal from './pages/dashboard/AgentPortal';

// New Dashboard Pages
import Policies from './pages/dashboard/Policies';
import Renewals from './pages/dashboard/Renewals';
import Payments from './pages/dashboard/Payments';
import Notifications from './pages/dashboard/Notifications';
import Performance from './pages/dashboard/Performance';
import Customers from './pages/dashboard/Customers';
import Tasks from './pages/dashboard/Tasks';
import Communication from './pages/dashboard/Communication';
import StaffMembers from './pages/dashboard/StaffMembers';
import CustomerManagement from './pages/dashboard/CustomerManagement';
import PolicyPlans from './pages/dashboard/PolicyPlans';
import Reports from './pages/dashboard/Reports';
import MasterSettings from './pages/dashboard/MasterSettings';
import SystemConfig from './pages/dashboard/SystemConfig';
import ClaimsSupport from './pages/dashboard/ClaimsSupport';
import TicketsQueries from './pages/dashboard/TicketsQueries';
import PolicyServicing from './pages/dashboard/PolicyServicing';

// Wrapper to conditionally show Navbar/Footer
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || 
                      location.pathname.startsWith('/super-admin') || 
                      location.pathname.startsWith('/staff') ||
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
          <Route path="/" element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          } />
          <Route path="/life" element={<Life />} />
          <Route path="/health" element={<Health />} />
          <Route path="/car" element={<Car />} />
          <Route path="/business" element={<Business />} />
          <Route path="/plans" element={<Plans />} />
          {/* User Dashboard */}
          <Route path="/dashboard" element={
            <RoleProtectedRoute allowedRoles={['user']}>
              <Dashboard />
            </RoleProtectedRoute>
          } />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={
            <RoleProtectedRoute allowedRoles={['admin', 'super_admin']}>
              <DashboardLayout />
            </RoleProtectedRoute>
          }>
            <Route index element={<AdminOverview />} />
            <Route path="dashboard" element={<AdminOverview />} />
            <Route path="policies" element={<Policies />} />
            <Route path="renewals" element={<Renewals />} />
            <Route path="payments" element={<Payments />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="performance" element={<Performance />} />
            <Route path="customers" element={<Customers />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="communication" element={<Communication />} />
            <Route path="users" element={<Admin />} />
          </Route>

          {/* Super Admin Dashboard Routes */}
          <Route path="/super-admin" element={
            <RoleProtectedRoute allowedRoles={['super_admin']}>
              <DashboardLayout />
            </RoleProtectedRoute>
          }>
            <Route index element={<SuperAdminConsole />} />
            <Route path="dashboard" element={<SuperAdminConsole />} />
            <Route path="staff" element={<StaffMembers />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="policies" element={<Policies />} />
            <Route path="plans" element={<PolicyPlans />} />
            <Route path="renewals" element={<Renewals />} />
            <Route path="payments" element={<Payments />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<MasterSettings />} />
            <Route path="config" element={<SystemConfig />} />
          </Route>

          {/* Staff/CSR Dashboard Routes */}
          <Route path="/staff" element={
            <RoleProtectedRoute allowedRoles={['csr', 'agent', 'admin', 'super_admin']}>
              <DashboardLayout />
            </RoleProtectedRoute>
          }>
            <Route index element={
              (() => {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                return user.role === 'agent' ? <AgentPortal /> : <CSRHub />;
              })()
            } />
            <Route path="dashboard" element={
              (() => {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                return user.role === 'agent' ? <AgentPortal /> : <CSRHub />;
              })()
            } />
            <Route path="customers" element={<Customers />} />
            <Route path="claims" element={<ClaimsSupport />} />
            <Route path="renewals" element={<Renewals />} />
            <Route path="tickets" element={<TicketsQueries />} />
            <Route path="servicing" element={<PolicyServicing />} />
            <Route path="communication" element={<Communication />} />
          </Route>

          {/* Legacy CSR route redirection or alias */}
          <Route path="/csr/*" element={<Navigate to="/staff" replace />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
