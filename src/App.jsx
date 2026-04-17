import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  LayoutDashboard, BarChart3, BrainCircuit, Settings, Search,
  Bell, Sun, Moon, ArrowUpRight, ArrowDownRight, Wallet,
  CreditCard, TrendingUp, Zap, ChevronDown, Activity
} from 'lucide-react';
// --- MOCK DATA ---
const revenueData = [
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Feb', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 2000, expenses: 9800 },
  { name: 'Apr', income: 2780, expenses: 3908 },
  { name: 'May', income: 1890, expenses: 4800 },
  { name: 'Jun', income: 2390, expenses: 3800 },
  { name: 'Jul', income: 3490, expenses: 4300 },
];

const categoryData = [
  { name: 'Housing', value: 400 },
  { name: 'Food', value: 300 },
  { name: 'Transport', value: 300 },
  { name: 'Entertainment', value: 200 },
];
const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];

const transactions = [
  { id: 1, name: 'Apple Store', date: 'Today, 2:45 PM', category: 'Electronics', amount: -199.00 },
  { id: 2, name: 'Salary Deposit', date: 'Yesterday, 9:00 AM', category: 'Income', amount: 4500.00 },
  { id: 3, name: 'Uber Rides', date: 'Oct 24, 8:30 PM', category: 'Transport', amount: -24.50 },
  { id: 4, name: 'Whole Foods', date: 'Oct 23, 6:15 PM', category: 'Groceries', amount: -112.30 },
  { id: 5, name: 'Netflix Subscription', date: 'Oct 21, 10:00 AM', category: 'Entertainment', amount: -15.99 },
];

const insights = [
  { id: 1, title: 'Overspending Warning', desc: 'You are overspending on food by 24% this month.', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 2, title: 'Smart Investment', desc: 'Invest ₹5000 in SIP to stay on track for your yearly goal.', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 3, title: 'Savings Milestone', desc: 'Great job! Your savings increased by 12% compared to last month.', icon: Wallet, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
];

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } }
};

// --- COMPONENTS ---

const GlassCard = ({ children, className = '' }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02 }}
    className={`bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm dark:shadow-2xl transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 overflow-hidden selection:bg-blue-500/30">
      {/* Dark Mode Background Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none hidden dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#030712] to-[#030712]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Sidebar */}
      <aside className="relative z-10 w-72 border-r border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-2xl hidden lg:flex flex-col justify-between">
        <div>
          <div className="h-20 flex items-center px-8 border-b border-slate-200 dark:border-white/10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              FinSight AI
            </span>
          </div>
          <nav className="p-4 space-y-2 mt-4">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
            <SidebarItem icon={BarChart3} label="Analytics" />
            <SidebarItem icon={BrainCircuit} label="AI Insights" badge="New" />
            <SidebarItem icon={CreditCard} label="Cards" />
          </nav>
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-white/10">
          <SidebarItem icon={Settings} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col h-screen overflow-hidden">
        {/* Navbar */}
        <header className="h-20 border-b border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-xl flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center w-96">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search transactions, insights..."
                className="w-full bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                    <Sun size={20} className="text-slate-400 hover:text-white" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                    <Moon size={20} className="text-slate-600 hover:text-slate-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button className="relative p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <Bell size={20} className="text-slate-600 dark:text-slate-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]"></span>
            </button>
            <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 transition-all">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" className="w-full h-full rounded-full border-2 border-white dark:border-[#030712] object-cover" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto space-y-8 pb-10"
          >
            {/* Header section */}
            <div className="flex justify-between items-end">
              <div>
                <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-1">
                  Welcome back, Alex
                </motion.h1>
                <motion.p variants={itemVariants} className="text-slate-500 dark:text-slate-400 text-sm">
                  Here is your financial overview for this month.
                </motion.p>
              </div>
              <motion.button
                variants={itemVariants}
                className="flex items-center space-x-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl text-sm font-medium hover:scale-105 transition-transform shadow-lg shadow-slate-900/10 dark:shadow-white/10"
              >
                <span>Download Report</span>
                <ChevronDown size={16} />
              </motion.button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard className="p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Wallet size={24} />
                  </div>
                  <span className="flex items-center text-sm font-medium text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    +2.5% <ArrowUpRight size={14} className="ml-1" />
                  </span>
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Balance</p>
                  <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                    $124,563.00
                  </h2>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <TrendingUp size={24} />
                  </div>
                  <span className="flex items-center text-sm font-medium text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    +14.2% <ArrowUpRight size={14} className="ml-1" />
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Income</p>
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">$8,450.00</h2>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
                    <Activity size={24} />
                  </div>
                  <span className="flex items-center text-sm font-medium text-pink-500 bg-pink-500/10 px-2.5 py-1 rounded-full">
                    +4.3% <ArrowDownRight size={14} className="ml-1" />
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Expenses</p>
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">$3,240.50</h2>
                </div>
              </GlassCard>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <GlassCard className="p-6 lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-semibold text-lg">Cash Flow Overview</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Income vs Expenses over time</p>
                  </div>
                  <select className="bg-slate-100 dark:bg-slate-800 border-none text-sm rounded-lg px-3 py-2 outline-none cursor-pointer">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>This Year</option>
                  </select>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} dx={-10} tickFormatter={(value) => `$${value}`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                          borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                          borderRadius: '12px',
                          backdropFilter: 'blur(8px)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Line type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="expenses" stroke="#ec4899" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              <GlassCard className="p-6 flex flex-col">
                <div className="mb-2">
                  <h3 className="font-semibold text-lg">Spend by Category</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Where your money goes</p>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center relative">
                  <div className="h-48 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                      <span className="text-2xl font-bold">$1.2k</span>
                      <span className="text-xs text-slate-500">Total</span>
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-3 mt-4">
                    {categoryData.map((item, index) => (
                      <div key={item.name} className="flex items-center text-xs">
                        <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-slate-600 dark:text-slate-300 truncate">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* AI Insights & Transactions */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* AI Panel */}
              <GlassCard className="p-6 xl:col-span-1 border-t-4 border-t-purple-500 flex flex-col">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="p-2 bg-purple-500/20 text-purple-500 rounded-lg">
                    <BrainCircuit size={20} />
                  </div>
                  <h3 className="font-semibold text-lg">AI Insights</h3>
                </div>
                <div className="space-y-4 flex-1">
                  {insights.map((insight, idx) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (idx * 0.1) }}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 hover:border-purple-500/30 transition-colors cursor-default"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${insight.bg} ${insight.color} shrink-0 mt-0.5`}>
                          <insight.icon size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-1 text-slate-800 dark:text-slate-200">{insight.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{insight.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              {/* Transactions */}
              <GlassCard className="p-0 xl:col-span-2 flex flex-col">
                <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Recent Transactions</h3>
                  <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">View All</button>
                </div>
                <div className="flex-1 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-white/10 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30">
                        <th className="px-6 py-4 font-medium">Transaction</th>
                        <th className="px-6 py-4 font-medium">Date</th>
                        <th className="px-6 py-4 font-medium">Category</th>
                        <th className="px-6 py-4 font-medium text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors last:border-0 group">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                {tx.category === 'Income' ? <TrendingUp size={16} /> : <CreditCard size={16} />}
                              </div>
                              <span className="font-medium text-sm text-slate-800 dark:text-slate-200">{tx.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{tx.date}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                              {tx.category}
                            </span>
                          </td>
                          <td className={`px-6 py-4 text-right text-sm font-semibold ${tx.amount > 0 ? 'text-emerald-500' : 'text-slate-800 dark:text-slate-200'}`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.4); }
      `}} />
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, badge }) {
  return (
    <div className="relative group px-4">
      {active && (
        <motion.div
          layoutId="active-nav"
          className="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <a
        href="#"
        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
          active 
            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' 
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <div className="flex items-center space-x-3">
          <Icon size={20} className={active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors'} />
          <span className="font-medium text-sm">{label}</span>
        </div>
        {badge && (
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full">
            {badge}
          </span>
        )}
      </a>
    </div>
  );
}

// #this is a trail project for a finance dashboard