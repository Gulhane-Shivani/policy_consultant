import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, RefreshCw, CreditCard,
  Bell, Users, UserCheck, Shield, MessageSquare,
  Settings, Database, BarChart3, HelpCircle, ChevronRight,
  UserCircle2, PieChart, LifeBuoy, LogOut, ChevronDown, ShieldCheck,
  ShieldAlert, User, Landmark, CloudDownload, Wrench, Zap, ListTodo, Activity
} from 'lucide-react';

const Sidebar = ({ role }) => {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : { full_name: 'John Doe', role: 'user' };

  const toggleMenu = (label) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const getNavItems = () => {
    // Determine the path prefix based on role
    const rolePrefix = role === 'super_admin' ? '/super-admin' : role === 'admin' ? '/admin' : `/${role}`;

    // Shared items
    const profileItem = { label: 'Personal Profile', icon: UserCircle2, path: `${rolePrefix}/profile` };

    // Role-specific nav generation
    switch (role) {
      case 'super_admin':
        return [
          {
            items: [
              { label: 'Dashboard', icon: LayoutDashboard, path: '/super-admin/dashboard' },
              {
                label: 'User Management',
                icon: Shield,
                subItems: [
                  { label: 'Staff Members', path: '/super-admin/staff' },
                  { label: 'Customers', path: '/super-admin/customers' }
                ]
              },
              {
                label: 'Policy Management',
                icon: FileText,
                subItems: [
                  { label: 'Policies', path: '/super-admin/policies' },
                  { label: 'Policy Plan', path: '/super-admin/plans' }
                ]
              },
              { label: 'Renewals', icon: RefreshCw, path: '/super-admin/renewals' },
              { label: 'Payments', icon: CreditCard, path: '/super-admin/payments' },
              { label: 'Commissions', icon: Landmark, path: '/super-admin/commissions' },
              { label: 'Reports', icon: PieChart, path: '/super-admin/reports' },
              { label: 'System Config', icon: Database, path: '/super-admin/config' },
            ]
          }
        ];
      case 'admin':
        return [
          {
            items: [
              { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
              { label: 'Policy Management', icon: FileText, path: '/admin/policies' },
              { label: 'Renewals', icon: RefreshCw, path: '/admin/renewals' },
              { label: 'Payments', icon: CreditCard, path: '/admin/payments' },
              { label: 'Commissions', icon: Landmark, path: '/admin/commissions' },
              { label: 'Customer 360°', icon: Users, path: '/admin/customers' },
              { label: 'Communications', icon: MessageSquare, path: '/admin/communication' },
              profileItem
            ]
          }
        ];
      case 'agent':
        return [
          {
            items: [
              { label: 'Dashboard', icon: LayoutDashboard, path: '/agent/dashboard' },
              { label: 'My Leads', icon: Users, path: '/agent/leads' },
              { label: 'My Customers', icon: UserCheck, path: '/agent/customers' },
              { label: 'Quote & Proposal', icon: Zap, path: '/agent/quotes' },
              { label: 'Tasks & Calendar', icon: ListTodo, path: '/agent/tasks' },
              { label: 'Activity Log', icon: Activity, path: '/agent/activity' },
              
              { label: 'Renewals', icon: RefreshCw, path: '/agent/renewals' },
              { label: 'Commissions', icon: Landmark, path: '/agent/commissions' },
              { label: 'Communications', icon: MessageSquare, path: '/agent/communication' },
              profileItem
            ]
          }
        ];
      case 'csr':
        return [
          {
            items: [
              { label: 'Dashboard', icon: LayoutDashboard, path: '/csr/dashboard' },
              { label: 'Customer Search', icon: Users, path: '/csr/customers' },
              { label: 'Claim Support', icon: ShieldCheck, path: '/csr/claims' },
              { label: 'Active Tickets', icon: MessageSquare, path: '/csr/tickets' },
              { label: 'Policy Servicing', icon: Settings, path: '/csr/servicing' },
              profileItem
            ]
          }
        ];
      default:
        return [
          {
            items: [
              { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
              { label: 'My Policies', icon: Shield, path: '/dashboard/policies' },
              { label: 'Payments', icon: CreditCard, path: '/dashboard/payments' },
              { label: 'Claims', icon: ShieldAlert, path: '/dashboard/claims' },
              { label: 'Service Requests', icon: Wrench, path: '/dashboard/requests' },
              { label: 'Document Vault', icon: Database, path: '/dashboard/documents' },
              { label: 'Policy Loan', icon: Landmark, path: '/dashboard/loan' },
              { label: 'Profile', icon: UserCircle2, path: '/dashboard/profile' },
              { label: 'Support', icon: HelpCircle, path: '/dashboard/support' }
            ]
          }
        ];
    }
  };


  const navItems = getNavItems();

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 overflow-y-auto scrollbar-hide no-scrollbar">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <Link to="/" className="p-8 flex items-center space-x-3">
        <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-200">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-900 tracking-tight">
          Policy Consultant
        </span>
      </Link>

      <nav className="flex-grow px-4 space-y-2 mt-4">
        {navItems.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {group.group && (
              <h3 className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                {group.group}
              </h3>
            )}
            <div className="space-y-1">
              {group.items.map((item, itemIdx) => {
                const isOpen = openMenus[item.label];
                return (
                  <div key={itemIdx}>
                    {item.subItems ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => toggleMenu(item.label)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isOpen ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                          <div className="flex items-center space-x-3">
                            <item.icon className={`w-5 h-5 transition-colors ${isOpen ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            <span className="font-bold text-sm">{item.label}</span>
                          </div>
                          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                        {isOpen && (
                          <div className="pl-12 space-y-1">
                            {item.subItems.map((sub, subIdx) => (
                              <NavLink
                                key={subIdx}
                                to={sub.path}
                                className={({ isActive }) => `block py-2 text-sm font-bold transition-all ${isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-500'}`}
                              >
                                {sub.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <NavLink
                        to={item.path}
                        end={item.label === 'Overview' || item.label === 'My Dashboard'}
                        className={({ isActive }) => `flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all group ${isActive ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                      >
                        {({ isActive }) => (
                          <>
                            <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                            <span className="font-bold text-sm">{item.label}</span>
                          </>
                        )}
                      </NavLink>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-50 mt-auto">
        <button
          onClick={() => {
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            window.location.href = '/login';
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-rose-500 hover:bg-rose-50 rounded-xl font-bold text-sm transition-all group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
