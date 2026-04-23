import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, MessageSquare, ShieldAlert, Loader2, 
  Trash2, CheckCircle, Search, Filter 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('users');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // In a real app, you might want to run these in parallel
      const usersData = await api.get('/admin/users');
      const contactsData = await api.get('/admin/contacts');
      setUsers(usersData.users || []);
      setContacts(contactsData.contacts || []);
    } catch (error) {
      toast.error('Failed to fetch admin data. Redirecting...');
      // apiRequest utility handles 401 and redirects to /login
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto" />
          <p className="text-slate-500 font-bold">Securing Admin Access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900">Admin Control Panel</h1>
              <p className="text-slate-500 font-medium">Manage system users and incoming inquiries</p>
            </div>
          </div>

          <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setActiveView('users')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2 ${activeView === 'users' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-emerald-600'}`}
            >
              <Users className="w-5 h-5" />
              <span>Users ({users.length})</span>
            </button>
            <button 
              onClick={() => setActiveView('contacts')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2 ${activeView === 'contacts' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-emerald-600'}`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Inquiries ({contacts.length})</span>
            </button>
          </div>
        </header>

        <main className="glass rounded-[3rem] shadow-2xl border-white/50 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-white/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
              />
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-all">
              <Filter className="w-5 h-5" />
              <span>Filter Results</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <AnimatePresence mode="wait">
              {activeView === 'users' ? (
                <motion.table 
                  key="users"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="w-full text-left"
                >
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">User Profile</th>
                      <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                      <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Role</th>
                      <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg">
                              {user.full_name?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{user.full_name}</p>
                              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Member since {new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <p className="font-medium text-slate-700">{user.email}</p>
                          <p className="text-xs text-slate-400">{user.mobile}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <button className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </motion.table>
              ) : (
                <motion.table 
                  key="contacts"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="w-full text-left"
                >
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Inquiry Details</th>
                      <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Insurance Type</th>
                      <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Message</th>
                      <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <p className="font-bold text-slate-900">{contact.full_name}</p>
                          <p className="text-xs text-slate-400">{contact.email}</p>
                          <p className="text-xs text-slate-400">{contact.phone}</p>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-4 py-1.5 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase">
                            {contact.insurance_type}
                          </span>
                        </td>
                        <td className="px-8 py-6 max-w-xs">
                          <p className="text-sm text-slate-600 line-clamp-2">{contact.message}</p>
                        </td>
                        <td className="px-8 py-6">
                          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-xs hover:bg-emerald-600 hover:text-white transition-all">
                            <CheckCircle className="w-4 h-4" />
                            <span>Mark Resolved</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </motion.table>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
