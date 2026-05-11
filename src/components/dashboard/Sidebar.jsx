import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, RefreshCw, CreditCard, 
  Bell, Users, UserCheck, Shield, MessageSquare, 
  Settings, Database, BarChart3, HelpCircle, ChevronRight,
  UserCircle2, PieChart, LifeBuoy
} from 'lucide-react';

const Sidebar = ({ role }) => {
  const getNavItems = () => {
    switch (role) {
      case 'admin':
        return [
          {
            group: 'Operations',
            items: [
              { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
              { label: 'Policy Management', icon: FileText, path: '/admin/policies' },
              { label: 'Renewals', icon: RefreshCw, path: '/admin/renewals' },
              { label: 'Payments', icon: CreditCard, path: '/admin/payments' },
              { label: 'Notifications', icon: Bell, path: '/admin/notifications' },
            ]
          },
          {
            group: 'Performance',
            items: [
              { label: 'Team Performance', icon: BarChart3, path: '/admin/performance' },
              { label: 'Customer 360°', icon: Users, path: '/admin/customers' },
              { label: 'Approvals & Tasks', icon: UserCheck, path: '/admin/tasks' },
            ]
          },
          {
            group: 'Enterprise',
            items: [
              { label: 'Communication', icon: MessageSquare, path: '/admin/communication' },
            ]
          },
          {
            group: 'System',
            items: [
              { label: 'User Control', icon: Shield, path: '/admin/users' },
            ]
          }
        ];
      case 'super-admin':
        return [
          {
            group: 'Master Console',
            items: [
              { label: 'Dashboard', icon: LayoutDashboard, path: '/super-admin/dashboard' },
              { 
                label: 'User Management', 
                icon: Users, 
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
              { label: 'Notifications', icon: Bell, path: '/super-admin/notifications' },
              { label: 'Reports', icon: PieChart, path: '/super-admin/reports' },
              { label: 'Master Settings', icon: Settings, path: '/super-admin/settings' },
              { label: 'System Config', icon: Database, path: '/super-admin/config' },
            ]
          }
        ];
      case 'csr':
        return [
          {
            group: 'Primary Tabs',
            items: [
              { label: "Today's Tasks", icon: LayoutDashboard, path: '/csr/dashboard' },
              { label: 'Customer 360°', icon: Users, path: '/csr/customers' },
              { label: 'Claims Support', icon: LifeBuoy, path: '/csr/claims' },
              { label: 'Renewal Desk', icon: RefreshCw, path: '/csr/renewals' },
              { label: 'Tickets & Queries', icon: MessageSquare, path: '/csr/tickets' },
              { label: 'Policy Servicing', icon: FileText, path: '/csr/servicing' },
              { label: 'Communications', icon: MessageSquare, path: '/csr/communication' },
            ]
          }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col fixed left-0 top-0 overflow-y-auto scrollbar-hide">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-xl text-white">
          IA
        </div>
        <span className="font-black text-xl tracking-tighter">Insurance Advisor</span>
      </div>

      <nav className="flex-grow px-4 space-y-8 mt-4">
        {navItems.map((group, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {group.group}
            </h3>
            <div className="space-y-1">
              {group.items.map((item, itemIdx) => (
                <div key={itemIdx}>
                  {item.subItems ? (
                    <div className="space-y-1">
                      <button className="w-full flex items-center justify-between px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all group">
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-bold text-sm">{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <div className="pl-12 space-y-1">
                        {item.subItems.map((sub, subIdx) => (
                          <NavLink
                            key={subIdx}
                            to={sub.path}
                            className={({ isActive }) => `block py-2 text-sm font-medium transition-all ${isActive ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-bold text-sm">{item.label}</span>
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {role === 'csr' && (
        <div className="p-4 mt-auto">
          <button className="w-full flex items-center justify-center space-x-2 py-4 bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 rounded-2xl font-black text-xs uppercase tracking-tighter hover:bg-indigo-600 hover:text-white transition-all">
            <HelpCircle className="w-4 h-4" />
            <span>Support Desk</span>
          </button>
        </div>
      )}

      <div className="p-6 border-t border-slate-800 flex items-center space-x-3">
        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
          <UserCircle2 className="w-6 h-6 text-slate-400" />
        </div>
        <div className="flex-grow overflow-hidden">
          <p className="text-sm font-bold truncate">John Doe</p>
          <p className="text-[10px] text-slate-500 font-bold uppercase truncate">
            {role.replace('-', ' ')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
