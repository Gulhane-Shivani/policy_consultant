import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Clock, CheckCircle2, 
  Circle, AlertCircle, Plus, ChevronLeft, 
  ChevronRight, MoreVertical, User, Phone,
  Mail, MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

const TasksCalendar = () => {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState([
    { id: 1, time: '09:00 AM', title: 'Call with Rajiv Bajaj', type: 'Call', status: 'completed', description: 'Discuss Life Insurance renewal terms.' },
    { id: 2, time: '11:30 AM', title: 'Meeting: Anita Singh', type: 'Meeting', status: 'pending', description: 'New Health Insurance proposal presentation.' },
    { id: 3, time: '02:00 PM', title: 'Document Collection', type: 'Service', status: 'pending', description: 'Collect KYC docs from Mr. Gupta.' },
    { id: 4, time: '04:30 PM', title: 'Sales Team Sync', type: 'Meeting', status: 'pending', description: 'Weekly performance review.' },
  ]);

  const [newTask, setNewTask] = useState({ title: '', time: '09:00 AM', type: 'Call', description: '' });

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      ...newTask,
      status: 'pending'
    };
    setTasks([...tasks, task]);
    setIsModalOpen(false);
    setNewTask({ title: '', time: '09:00 AM', type: 'Call', description: '' });
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Simple calendar grid generation
  const renderCalendar = () => {
    const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const prevMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    
    const startDay = start.getDay();
    const daysInMonth = end.getDate();
    
    const calendarDays = [];
    
    // Previous month padding
    for (let i = startDay - 1; i >= 0; i--) {
      calendarDays.push({ day: prevMonthEnd.getDate() - i, current: false });
    }
    
    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({ day: i, current: true, today: i === currentDate.getDate() });
    }
    
    // Next month padding
    const remaining = 42 - calendarDays.length;
    for (let i = 1; i <= remaining; i++) {
      calendarDays.push({ day: i, current: false });
    }
    
    return calendarDays;
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Tasks & Calendar</h1>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">Manage your schedule and follow-ups</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>New Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
              </h3>
              <div className="flex space-x-1">
                <button className="p-2 hover:bg-slate-50 rounded-xl transition-all"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
                <button className="p-2 hover:bg-slate-50 rounded-xl transition-all"><ChevronRight className="w-5 h-5 text-slate-400" /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {days.map(d => (
                <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest py-2">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {renderCalendar().map((item, i) => (
                <button 
                  key={i} 
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-bold transition-all relative group
                    ${!item.current ? 'text-slate-200' : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'}
                    ${item.today ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:text-white' : ''}
                  `}
                >
                  {item.day}
                  {item.current && i % 7 === 2 && (
                    <div className="absolute bottom-2 w-1 h-1 bg-rose-500 rounded-full" />
                  )}
                  {item.current && i % 5 === 0 && (
                    <div className="absolute bottom-2 w-1 h-1 bg-emerald-400 rounded-full ml-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white overflow-hidden relative group">
            <div className="relative z-10">
              <h4 className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">Productivity Tip</h4>
              <p className="font-bold text-lg leading-tight mb-4">You have 3 meetings and 1 call scheduled for today.</p>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                View Full Agenda
              </button>
            </div>
            <CalendarIcon className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>

        {/* Tasks Side */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col">
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Today's Schedule</h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">Wednesday, 24 May 2024</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex bg-slate-50 p-1 rounded-xl">
                  {['all', 'pending', 'completed'].map((f) => (
                    <button 
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all ${filter === f ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="flex bg-slate-50 p-1 rounded-xl">
                  <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-[10px] font-black text-indigo-600 uppercase tracking-tighter">List</button>
                  <button className="px-4 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-tighter">Time</button>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {filteredTasks.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No tasks found for this filter</p>
                </div>
              ) : filteredTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-6 group">
                  <div className="flex flex-col items-center pt-1 min-w-[70px]">
                    <span className="text-xs font-black text-slate-900">{task.time}</span>
                    <div className="w-0.5 h-16 bg-slate-100 my-2 group-last:hidden" />
                  </div>
                  
                  <div className="flex-grow bg-slate-50 p-6 rounded-[2rem] border border-transparent hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        {task.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-300" />
                        )}
                        <h4 className={`font-black tracking-tight ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                          {task.title}
                        </h4>
                      </div>
                      <button className="p-1 hover:bg-slate-100 rounded-lg transition-all"><MoreVertical className="w-4 h-4 text-slate-400" /></button>
                    </div>
                    <p className="text-xs font-medium text-slate-500 ml-6">{task.description}</p>
                    
                    <div className="mt-4 flex items-center justify-between ml-6">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white overflow-hidden">
                          <img src="https://i.pravatar.cc/100?u=1" alt="user" />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[8px] font-black text-emerald-600">+</div>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                        task.type === 'Call' ? 'bg-blue-50 text-blue-600' : 
                        task.type === 'Meeting' ? 'bg-orange-50 text-orange-600' : 'bg-purple-50 text-purple-600'
                      }`}>
                        {task.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 border-t border-slate-100">
              <button className="w-full py-4 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-dashed border-slate-200">
                + Add task at 06:00 PM
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Create New Task</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
                <Plus className="w-5 h-5 text-slate-400 rotate-45" />
              </button>
            </div>
            <form onSubmit={handleAddTask} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Task Title</label>
                <input 
                  required
                  type="text" 
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="e.g. Follow up with client"
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Time</label>
                  <input 
                    type="time" 
                    value={newTask.time}
                    onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Type</label>
                  <select 
                    value={newTask.type}
                    onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all appearance-none"
                  >
                    <option>Call</option>
                    <option>Meeting</option>
                    <option>Service</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Description</label>
                <textarea 
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  rows="3"
                  placeholder="Additional details..."
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all resize-none"
                />
              </div>
              <button type="submit" className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200">
                Create Task
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TasksCalendar;
