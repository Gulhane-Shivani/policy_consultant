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

// Admin Pages
import AdminDashboard from './pages/dashboard/admin/Dashboard';
import Performance from './pages/dashboard/admin/Performance';
import Tasks from './pages/dashboard/admin/Tasks';

// Super Admin Pages
import SuperAdminDashboard from './pages/dashboard/super-admin/Dashboard';
import StaffMembers from './pages/dashboard/super-admin/StaffMembers';
import CustomerManagement from './pages/dashboard/super-admin/CustomerManagement';
import PolicyPlans from './pages/dashboard/super-admin/PolicyPlans';
import PlanDetailView from './pages/dashboard/super-admin/PlanDetailView';
import Reports from './pages/dashboard/super-admin/Reports';
import MasterSettings from './pages/dashboard/super-admin/MasterSettings';
import SystemConfig from './pages/dashboard/super-admin/SystemConfig';

// CSR Pages
import CSRDashboard from './pages/dashboard/csr/Dashboard';
import ClaimsSupport from './pages/dashboard/csr/ClaimsSupport';
import TicketsQueries from './pages/dashboard/csr/TicketsQueries';
import PolicyServicing from './pages/dashboard/csr/PolicyServicing';

// Agent Pages
import AgentDashboard from './pages/dashboard/agent/Dashboard';

// Customer Pages
import CustomerDashboard from './pages/dashboard/customer/Dashboard';

// Shared Pages
import Policies from './pages/dashboard/shared/Policies';
import Renewals from './pages/dashboard/shared/Renewals';
import Payments from './pages/dashboard/shared/Payments';
import Notifications from './pages/dashboard/shared/Notifications';
import Customers from './pages/dashboard/shared/Customers';
import Communication from './pages/dashboard/shared/Communication';
import PolicyDetailView from './pages/dashboard/shared/PolicyDetailView';

// Wrapper to conditionally show Navbar/Footer
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin') || 
                      location.pathname.startsWith('/super-admin') || 
                      location.pathname.startsWith('/agent') ||
                      location.pathname.startsWith('/csr') ||
                      location.pathname.startsWith('/staff');

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
          <Route path="/support" element={<Support />} />
          {/* User Dashboard */}
          <Route path="/dashboard" element={
            <RoleProtectedRoute allowedRoles={['user']}>
              <CustomerDashboard />
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
            <RoleProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </RoleProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="policies" element={<Policies />} />
            <Route path="policies/:id" element={<PolicyDetailView />} />
            <Route path="renewals" element={<Renewals />} />
            <Route path="payments" element={<Payments />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="performance" element={<Performance />} />
            <Route path="customers" element={<Customers />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="communication" element={<Communication />} />
          </Route>

          {/* Super Admin Dashboard Routes */}
          <Route path="/super-admin" element={
            <RoleProtectedRoute allowedRoles={['super_admin']}>
              <DashboardLayout />
            </RoleProtectedRoute>
          }>
            <Route index element={<SuperAdminDashboard />} />
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="staff" element={<StaffMembers />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="policies" element={<Policies />} />
            <Route path="policies/:id" element={<PolicyDetailView />} />
            <Route path="plans" element={<PolicyPlans />} />
            <Route path="plans/:id" element={<PlanDetailView />} />
            <Route path="renewals" element={<Renewals />} />
            <Route path="payments" element={<Payments />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<MasterSettings />} />
            <Route path="config" element={<SystemConfig />} />
          </Route>

          {/* Agent Dashboard Routes */}
          <Route path="/agent" element={
            <RoleProtectedRoute allowedRoles={['agent']}>
              <DashboardLayout />
            </RoleProtectedRoute>
          }>
            <Route index element={<AgentDashboard />} />
            <Route path="dashboard" element={<AgentDashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="renewals" element={<Renewals />} />
            <Route path="communication" element={<Communication />} />
          </Route>

          {/* CSR Dashboard Routes */}
          <Route path="/csr" element={
            <RoleProtectedRoute allowedRoles={['csr']}>
              <DashboardLayout />
            </RoleProtectedRoute>
          }>
            <Route index element={<CSRDashboard />} />
            <Route path="dashboard" element={<CSRDashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="claims" element={<ClaimsSupport />} />
            <Route path="renewals" element={<Renewals />} />
            <Route path="tickets" element={<TicketsQueries />} />
            <Route path="servicing" element={<PolicyServicing />} />
            <Route path="communication" element={<Communication />} />
          </Route>

          {/* Fallback Redirections */}
          <Route path="/staff/*" element={
            (() => {
              const user = JSON.parse(localStorage.getItem('user') || '{}');
              if (user.role === 'agent') return <Navigate to="/agent" replace />;
              if (user.role === 'csr') return <Navigate to="/csr" replace />;
              return <Navigate to="/login" replace />;
            })()
          } />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
