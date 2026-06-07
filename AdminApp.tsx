import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, Bell, Stethoscope, DollarSign, 
  User, FileText, Settings, LogOut, Menu, X, CheckCircle, 
  XCircle, Clock, Search, Filter, ChevronDown, ChevronRight,
  Plus, Edit2, Trash2, Pin, Eye, EyeOff
} from 'lucide-react';

// ==========================================
// ADMIN PANEL - Dr. Rakib's Dental Care
// ==========================================

const ADMIN_MENU = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'notices', label: 'Notice Center', icon: Bell },
  { id: 'services', label: 'Services', icon: Stethoscope },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'doctor', label: 'Doctor Profile', icon: User },
  { id: 'blog', label: 'Blog CMS', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// Mock data - replace with API calls
const MOCK_APPOINTMENTS = [
  { id: 1, name: "Amina Rahman", phone: "01612345678", service: "Scaling & Polishing", date: "2026-06-08", time: "10:00", status: "pending", message: "First visit" },
  { id: 2, name: "Kamal Uddin", phone: "01687654321", service: "Root Canal", date: "2026-06-08", time: "11:30", status: "confirmed", message: "Follow-up" },
  { id: 3, name: "Fatima Begum", phone: "01611223344", service: "Braces Check", date: "2026-06-09", time: "17:00", status: "pending", message: "" },
  { id: 4, name: "Tariq Hossain", phone: "01655667788", service: "Tooth Extraction", date: "2026-06-07", time: "10:00", status: "completed", message: "Wisdom tooth" },
  { id: 5, name: "Nusrat Jahan", phone: "01699887766", service: "Teeth Whitening", date: "2026-06-10", time: "18:00", status: "cancelled", message: "Reschedule" },
];

const MOCK_NOTICES = [
  { id: 1, text: "Eid-ul-Adha Holiday: Closed June 15-20", date: "2026-06-01", pinned: true, active: true },
  { id: 2, text: "20% discount on teeth whitening!", date: "2026-05-28", pinned: false, active: true },
];

const STATUS_COLORS = {
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  confirmed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
};

const STATUS_ICONS = {
  pending: Clock,
  confirmed: CheckCircle,
  completed: CheckCircle,
  cancelled: XCircle
};

// ==========================================
// COMPONENTS
// ==========================================

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-2xl p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
        <Icon className="w-5 h-5 text-emerald-400" />
      </div>
      {trend && (
        <span className={`text-xs font-mono ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div className="text-2xl font-serif text-white mb-1">{value}</div>
    <div className="text-[10px] tracking-[0.15em] uppercase font-mono text-white/40">{title}</div>
  </div>
);

const DashboardView = () => {
  const todayApps = MOCK_APPOINTMENTS.filter(a => a.date === '2026-06-08');
  const pendingApps = MOCK_APPOINTMENTS.filter(a => a.status === 'pending');

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Appointments" value="156" icon={Calendar} trend={12} />
        <StatCard title="Today's Bookings" value={todayApps.length} icon={Clock} />
        <StatCard title="Pending" value={pendingApps.length} icon={Filter} trend={-5} />
        <StatCard title="Active Notices" value="3" icon={Bell} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-2xl p-6">
          <h3 className="font-serif text-xl text-white mb-6">Today's Schedule</h3>
          <div className="space-y-3">
            {todayApps.length === 0 ? (
              <p className="text-white/40 text-sm">No appointments today</p>
            ) : (
              todayApps.map(app => (
                <div key={app.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className={`w-2 h-2 rounded-full ${app.status === 'confirmed' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium">{app.name}</div>
                    <div className="text-white/40 text-xs">{app.service} • {app.time}</div>
                  </div>
                  <span className={`text-[10px] tracking-wider uppercase font-mono px-2 py-1 rounded border ${STATUS_COLORS[app.status]}`}>
                    {app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-2xl p-6">
          <h3 className="font-serif text-xl text-white mb-6">Recent Activity</h3>
          <div className="space-y-3">
            {MOCK_APPOINTMENTS.slice(0, 5).map(app => (
              <div key={app.id} className="flex items-center gap-3 text-sm">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${STATUS_COLORS[app.status]}`}>
                  {React.createElement(STATUS_ICONS[app.status], { className: 'w-4 h-4' })}
                </div>
                <div className="flex-1">
                  <span className="text-white">{app.name}</span>
                  <span className="text-white/40"> booked </span>
                  <span className="text-emerald-400">{app.service}</span>
                </div>
                <span className="text-white/30 text-xs">{app.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AppointmentsView = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = MOCK_APPOINTMENTS.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) || 
                          app.phone.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input 
            type="text"
            placeholder="Search patients..."
            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white text-sm w-64 focus:border-emerald-400 focus:outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors ${
                filter === f ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-white/40 hover:text-white border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 text-[10px] tracking-[0.2em] uppercase font-mono text-white/40">
              <th className="text-left p-4">Patient</th>
              <th className="text-left p-4">Service</th>
              <th className="text-left p-4">Date & Time</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(app => (
              <tr key={app.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div className="text-white text-sm font-medium">{app.name}</div>
                  <div className="text-white/40 text-xs">{app.phone}</div>
                </td>
                <td className="p-4 text-white/60 text-sm">{app.service}</td>
                <td className="p-4 text-white/60 text-sm">{app.date} • {app.time}</td>
                <td className="p-4">
                  <span className={`text-[10px] tracking-wider uppercase font-mono px-2 py-1 rounded border ${STATUS_COLORS[app.status]}`}>
                    {app.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {app.status === 'pending' && (
                      <button className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-1.5 bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 bg-red-500/10 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const NoticesView = () => {
  const [notices, setNotices] = useState(MOCK_NOTICES);
  const [newNotice, setNewNotice] = useState('');

  const addNotice = () => {
    if (!newNotice.trim()) return;
    setNotices([...notices, {
      id: Date.now(),
      text: newNotice,
      date: new Date().toISOString().split('T')[0],
      pinned: false,
      active: true
    }]);
    setNewNotice('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-2xl p-6">
        <h3 className="font-serif text-xl text-white mb-4">Create Notice</h3>
        <div className="flex gap-4">
          <input 
            type="text"
            placeholder="Enter notice text..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-emerald-400 focus:outline-none"
            value={newNotice}
            onChange={e => setNewNotice(e.target.value)}
          />
          <button 
            onClick={addNotice}
            className="px-6 py-3 bg-emerald-500 text-[#050505] rounded-xl font-bold text-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-shadow flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {notices.map(notice => (
          <div key={notice.id} className={`bg-white/[0.02] backdrop-blur border ${notice.pinned ? 'border-emerald-500/30' : 'border-white/10'} rounded-2xl p-6 flex items-center gap-4`}>
            <button 
              onClick={() => setNotices(notices.map(n => n.id === notice.id ? {...n, pinned: !n.pinned} : n))}
              className={`p-2 rounded-lg transition-colors ${notice.pinned ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/40 hover:text-white'}`}
            >
              <Pin className="w-4 h-4" />
            </button>
            <div className="flex-1">
              <p className="text-white/80">{notice.text}</p>
              <span className="text-[10px] tracking-wider uppercase font-mono text-white/40">{notice.date}</span>
            </div>
            <button 
              onClick={() => setNotices(notices.map(n => n.id === notice.id ? {...n, active: !n.active} : n))}
              className={`p-2 rounded-lg transition-colors ${notice.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'}`}
            >
              {notice.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setNotices(notices.filter(n => n.id !== notice.id))}
              className="p-2 bg-red-500/10 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Placeholder views for other sections
const PlaceholderView = ({ title }) => (
  <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-2xl p-12 text-center">
    <h3 className="font-serif text-2xl text-white mb-2">{title}</h3>
    <p className="text-white/40 text-sm">This section is under development. Connect backend API to enable full functionality.</p>
  </div>
);

// ==========================================
// MAIN ADMIN APP
// ==========================================

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'appointments': return <AppointmentsView />;
      case 'notices': return <NoticesView />;
      case 'services': return <PlaceholderView title="Services Manager" />;
      case 'pricing': return <PlaceholderView title="Pricing Manager" />;
      case 'doctor': return <PlaceholderView title="Doctor Profile Manager" />;
      case 'blog': return <PlaceholderView title="Blog CMS" />;
      case 'settings': return <PlaceholderView title="Settings" />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#EBEBEB] font-sans flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#0a0a0a] border-r border-white/5 transition-all duration-500 flex flex-col`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0">
            <Stethoscope className="w-5 h-5 text-[#050505]" />
          </div>
          {sidebarOpen && (
            <div>
              <h1 className="text-white font-serif text-sm">Admin Panel</h1>
              <p className="text-[10px] text-emerald-400 tracking-wider uppercase font-mono">Dental Care</p>
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {ADMIN_MENU.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all ${
                activeTab === item.id 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="font-serif text-xl text-white capitalize">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <span className="text-emerald-400 text-xs font-bold">DR</span>
            </div>
            <span className="text-white/60 text-sm">Dr. Rakib</span>
          </div>
        </header>

        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
