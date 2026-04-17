import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BarChart2, Sparkles, Settings, Search,
  Bell, Sun, Moon, TrendingUp, TrendingDown, Wallet,
  ArrowUpRight, ArrowDownRight, ShoppingCart, Zap, Home,
  Briefcase, Coffee, Car, ChevronDown, X, Menu,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut", delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut", delay },
});

const lineData = {
  "7D": [
    { name: "Mon", income: 3200, expense: 1800 },
    { name: "Tue", income: 2800, expense: 2200 },
    { name: "Wed", income: 4100, expense: 1600 },
    { name: "Thu", income: 3600, expense: 2800 },
    { name: "Fri", income: 5200, expense: 2100 },
    { name: "Sat", income: 4800, expense: 3200 },
    { name: "Sun", income: 3900, expense: 1900 },
  ],
  "30D": [
    { name: "W1", income: 18000, expense: 9500 },
    { name: "W2", income: 22000, expense: 12000 },
    { name: "W3", income: 19500, expense: 10800 },
    { name: "W4", income: 25000, expense: 11200 },
  ],
  "3M": [
    { name: "Jan", income: 85000, expense: 42000 },
    { name: "Feb", income: 92000, expense: 48000 },
    { name: "Mar", income: 125000, expense: 48620 },
  ],
};

const pieData = [
  { name: "Food", value: 37, color: "#f16b6b" },
  { name: "Bills", value: 20, color: "#a78bfa" },
  { name: "Travel", value: 13, color: "#f59e0b" },
  { name: "Shopping", value: 18, color: "#60a5fa" },
  { name: "Other", value: 12, color: "#2dd4a0" },
];

const transactions = [
  { id: 1, name: "Swiggy Order", date: "Today, 1:32 PM", category: "Food", amount: -548, icon: ShoppingCart, color: "text-blue-400", bg: "bg-blue-500/10" },
  { id: 2, name: "Salary Credit", date: "Apr 15, 9:00 AM", category: "Income", amount: 95000, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { id: 3, name: "Electricity Bill", date: "Apr 14, 11:15 AM", category: "Bills", amount: -2340, icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { id: 4, name: "Netflix + Hotstar", date: "Apr 13, 8:00 AM", category: "Entertainment", amount: -849, icon: Coffee, color: "text-purple-400", bg: "bg-purple-500/10" },
  { id: 5, name: "Freelance - Design", date: "Apr 12, 3:20 PM", category: "Income", amount: 30000, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { id: 6, name: "House Rent", date: "Apr 10, 10:00 AM", category: "Housing", amount: -18000, icon: Home, color: "text-red-400", bg: "bg-red-500/10" },
  { id: 7, name: "Petrol Fill", date: "Apr 9, 6:45 PM", category: "Travel", amount: -3200, icon: Car, color: "text-amber-400", bg: "bg-amber-500/10" },
  { id: 8, name: "Client Payment", date: "Apr 8, 2:00 PM", category: "Income", amount: 45000, icon: Briefcase, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { label: "Analytics", icon: BarChart2, id: "analytics" },
  { label: "AI Insights", icon: Sparkles, id: "insights" },
  { label: "Settings", icon: Settings, id: "settings" },
];

const portfolio = [
  { label: "Nifty 50 SIP", value: 82000, target: 120000, color: "from-violet-500 to-purple-600" },
  { label: "Emergency Fund", value: 60000, target: 100000, color: "from-emerald-500 to-teal-600" },
  { label: "Gold ETF", value: 35000, target: 50000, color: "from-amber-500 to-yellow-500" },
  { label: "Fixed Deposit", value: 150000, target: 200000, color: "from-blue-500 to-cyan-500" },
];

const aiInsights = [
  {
    type: "warn", icon: ShoppingCart, title: "Food Overspend Alert",
    desc: "You've spent ₹17,800 on food this month — 37% above your ₹13,000 target. Cut dining out by 2×/week.",
    tag: "Action Needed", tagColor: "text-red-400 bg-red-500/12 border-red-500/20",
    glow: "hover:shadow-red-500/15", border: "hover:border-red-500/30",
    iconBg: "bg-red-500/12 text-red-400",
  },
  {
    type: "tip", icon: TrendingUp, title: "SIP Opportunity",
    desc: "₹5,000/month in a Nifty 50 index fund can grow to ₹12.7L in 10 years at 14.2% CAGR.",
    tag: "Opportunity", tagColor: "text-violet-400 bg-violet-500/12 border-violet-500/20",
    glow: "hover:shadow-violet-500/15", border: "hover:border-violet-500/30",
    iconBg: "bg-violet-500/12 text-violet-400",
  },
  {
    type: "good", icon: Wallet, title: "Savings Up 12%",
    desc: "Your savings rate rose from 28% to 31.4% this quarter. You're ahead of your annual savings goal.",
    tag: "Positive Trend", tagColor: "text-emerald-400 bg-emerald-500/12 border-emerald-500/20",
    glow: "hover:shadow-emerald-500/15", border: "hover:border-emerald-500/30",
    iconBg: "bg-emerald-500/12 text-emerald-400",
  },
];

const CustomTooltip = ({ active, payload, label, dark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`px-4 py-3 rounded-xl border shadow-2xl text-sm ${dark ? "bg-[#13102a]/95 border-white/10 text-white" : "bg-white/95 border-black/10 text-gray-900"} backdrop-blur-xl`}>
        <p className="font-semibold mb-2 text-xs uppercase tracking-wider opacity-60">{label}</p>
        {payload.map((p) => (
          <div key={p.dataKey} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="opacity-70 capitalize">{p.dataKey}:</span>
            <span className="font-bold">₹{p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const StatCard = ({ title, value, change, positive, icon: Icon, gradient, delay }) => (
  <motion.div {...fadeUp(delay)}
    whileHover={{ y: -4, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="relative overflow-hidden rounded-2xl border border-white/8 backdrop-blur-xl p-6 cursor-default group"
    style={{ background: "rgba(255,255,255,0.03)" }}>
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
      style={{ background: gradient, filter: "blur(40px)", transform: "scale(0.6)", transformOrigin: "top right" }} />
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">{title}</p>
          <h3 className="text-3xl font-black tracking-tight" style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {value}
          </h3>
        </div>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: gradient + "22" }}>
          <Icon size={20} style={{ color: gradient.includes("violet") ? "#a78bfa" : gradient.includes("emerald") ? "#2dd4a0" : "#f16b6b" }} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {positive ? <ArrowUpRight size={14} className="text-emerald-400" /> : <ArrowDownRight size={14} className="text-red-400" />}
        <span className={`text-sm font-semibold ${positive ? "text-emerald-400" : "text-red-400"}`}>{change}</span>
        <span className="text-xs text-white/30">vs last month</span>
      </div>
    </div>
  </motion.div>
);

const StatCardLight = ({ title, value, change, positive, icon: Icon, gradient, delay }) => (
  <motion.div {...fadeUp(delay)}
    whileHover={{ y: -4, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="relative overflow-hidden rounded-2xl border border-black/6 bg-white shadow-sm shadow-black/5 p-6 cursor-default group">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{title}</p>
        <h3 className="text-3xl font-black tracking-tight" style={{ background: gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {value}
        </h3>
      </div>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: gradient + "20" }}>
        <Icon size={20} style={{ color: gradient.includes("violet") ? "#7c3aed" : gradient.includes("emerald") ? "#059669" : "#dc2626" }} />
      </div>
    </div>
    <div className="flex items-center gap-2">
      {positive ? <ArrowUpRight size={14} className="text-emerald-600" /> : <ArrowDownRight size={14} className="text-red-500" />}
      <span className={`text-sm font-semibold ${positive ? "text-emerald-600" : "text-red-500"}`}>{change}</span>
      <span className="text-xs text-gray-400">vs last month</span>
    </div>
  </motion.div>
);

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("finsight-theme") !== "light");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [filter, setFilter] = useState("30D");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) { root.classList.add("dark"); localStorage.setItem("finsight-theme", "dark"); }
    else { root.classList.remove("dark"); localStorage.setItem("finsight-theme", "light"); }
  }, [dark]);

  useEffect(() => {
    const handler = (e) => { if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const Card = ({ children, className = "", delay = 0, ...props }) => (
    <motion.div {...scaleIn(delay)} className={`rounded-2xl border backdrop-blur-xl transition-all duration-300 ${dark ? "bg-white/[0.03] border-white/8 hover:border-white/14 hover:bg-white/[0.055]" : "bg-white border-black/6 shadow-sm shadow-black/5 hover:shadow-md hover:shadow-black/8"} ${className}`} {...props}>
      {children}
    </motion.div>
  );

  const filterLabels = { "7D": "Last 7 Days", "30D": "Last 30 Days", "3M": "3 Months" };

  return (
    <div className={`${dark ? "dark" : ""} min-h-screen font-sans antialiased`}>
      <div className={`min-h-screen flex transition-colors duration-500 ${dark ? "bg-[#06060f] text-white" : "bg-[#f4f3fa] text-gray-900"}`}
        style={dark ? { backgroundImage: "radial-gradient(ellipse 80% 50% at 20% -10%, rgba(99,78,210,0.22) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 85% 100%, rgba(168,85,247,0.14) 0%, transparent 55%)" } : {}}>

        {/* Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)} />
          )}
        </AnimatePresence>

        {/* SIDEBAR */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          className={`fixed top-0 left-0 h-full w-[228px] z-40 flex flex-col border-r transition-colors duration-500 lg:translate-x-0 lg:static lg:z-auto backdrop-blur-2xl ${dark ? "bg-white/[0.025] border-white/7" : "bg-white/80 border-black/8 shadow-xl shadow-black/5"}`}>
          <div className={`flex items-center gap-3 px-6 py-7 border-b ${dark ? "border-white/7" : "border-black/6"}`}>
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-black text-sm shadow-lg"
              style={{ background: "linear-gradient(135deg,#6d4ef7 0%,#a855f7 60%,#d946ef 100%)", boxShadow: "0 0 20px rgba(124,92,252,0.5)" }}>
              ◈
            </div>
            <div>
              <div className="text-[15px] font-black tracking-tight" style={{ background: "linear-gradient(135deg,#c4b5fd,#e879f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                FinSight AI
              </div>
              <div className={`text-[9px] font-semibold tracking-[1px] ${dark ? "text-white/25" : "text-gray-400"}`}>FINANCE INTELLIGENCE</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-5 space-y-1">
            <p className={`text-[9px] font-bold tracking-[1.5px] px-3 mb-3 ${dark ? "text-white/25" : "text-gray-400"}`}>MAIN MENU</p>
            {navItems.map(({ label, icon: Icon, id }, i) => (
              <motion.button key={id} onClick={() => { setActiveNav(id); setSidebarOpen(false); }}
                whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative group ${activeNav === id
                  ? dark ? "text-violet-300 bg-violet-500/15 border border-violet-500/20" : "text-violet-700 bg-violet-50 border border-violet-200/60"
                  : dark ? "text-white/45 hover:text-white/80 hover:bg-white/5 border border-transparent" : "text-gray-500 hover:text-gray-800 hover:bg-black/4 border border-transparent"}`}>
                {activeNav === id && (
                  <motion.div layoutId="activeNav" className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[55%] rounded-r-full"
                    style={{ background: "linear-gradient(180deg,#7c5cfc,#a855f7)" }} />
                )}
                <div className={`w-7 h-7 rounded-[8px] flex items-center justify-center transition-all ${activeNav === id ? dark ? "bg-violet-500/25" : "bg-violet-100" : dark ? "bg-white/6 group-hover:bg-white/10" : "bg-black/4 group-hover:bg-black/7"}`}>
                  <Icon size={14} />
                </div>
                {label}
                {id === "insights" && <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${dark ? "bg-violet-500/20 text-violet-300" : "bg-violet-100 text-violet-600"}`}>3</span>}
              </motion.button>
            ))}
          </nav>

          <div className={`px-3 py-4 border-t ${dark ? "border-white/7" : "border-black/6"}`}>
            <motion.div whileHover={{ scale: 1.02 }} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${dark ? "hover:bg-white/5" : "hover:bg-black/4"}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#7c5cfc,#ec4899)", boxShadow: "0 0 12px rgba(124,92,252,0.4)" }}>AK</div>
              <div className="min-w-0">
                <div className={`text-[13px] font-semibold ${dark ? "text-white/85" : "text-gray-800"}`}>Arjun Kumar</div>
                <div className={`text-[10px] ${dark ? "text-white/30" : "text-gray-400"}`}>Pro Plan · Active</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 ml-auto flex-shrink-0" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.7)" }} />
            </motion.div>
          </div>
        </motion.aside>

        {/* MAIN */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* NAVBAR */}
          <header className={`sticky top-0 z-20 flex items-center gap-3 px-5 h-16 border-b transition-colors duration-500 backdrop-blur-2xl ${dark ? "bg-white/[0.02] border-white/7" : "bg-white/70 border-black/8"}`}>
            <motion.button whileTap={{ scale: 0.93 }} onClick={() => setSidebarOpen(true)}
              className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center ${dark ? "bg-white/6 text-white/60 hover:bg-white/10" : "bg-black/5 text-gray-600 hover:bg-black/8"}`}>
              <Menu size={17} />
            </motion.button>

            <div className={`flex items-center gap-2 rounded-xl px-3 h-9 border transition-all duration-200 flex-1 max-w-sm focus-within:max-w-md ${dark ? "bg-white/[0.045] border-white/8 focus-within:border-violet-500/35 focus-within:bg-white/[0.06]" : "bg-black/4 border-black/8 focus-within:border-violet-400/50 focus-within:bg-white"}`}>
              <Search size={13} className={dark ? "text-white/30" : "text-gray-400"} />
              <input placeholder="Search transactions, reports…" className="bg-transparent outline-none text-[13px] w-full placeholder-current"
                style={{ color: "inherit" }} />
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center relative transition-all ${dark ? "bg-white/[0.045] border-white/8 text-white/55 hover:bg-white/[0.07] hover:text-white/80" : "bg-white border-black/8 text-gray-500 hover:text-gray-800 shadow-sm"}`}>
                <Bell size={15} />
                <span className="absolute top-2 right-2 w-[7px] h-[7px] rounded-full bg-red-500 border-2 border-[#06060f]"
                  style={dark ? { boxShadow: "0 0 6px rgba(239,68,68,0.8)" } : { borderColor: "white" }} />
              </motion.button>

              <motion.button whileHover={{ scale: 1.07, rotate: 15 }} whileTap={{ scale: 0.93 }}
                onClick={() => setDark(!dark)}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${dark ? "bg-white/[0.045] border-white/8 text-amber-300 hover:bg-amber-500/10 hover:border-amber-500/25" : "bg-white border-black/8 text-violet-500 hover:bg-violet-50 hover:border-violet-200 shadow-sm"}`}>
                <AnimatePresence mode="wait">
                  <motion.div key={dark ? "moon" : "sun"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    {dark ? <Moon size={15} /> : <Sun size={15} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              <motion.div whileHover={{ scale: 1.08 }} className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-black text-white cursor-pointer border-2 border-violet-500/40 hover:border-violet-400 transition-all"
                style={{ background: "linear-gradient(135deg,#7c5cfc,#ec4899)", boxShadow: dark ? "0 0 14px rgba(124,92,252,0.4)" : "0 2px 8px rgba(124,92,252,0.3)" }}>
                AK
              </motion.div>
            </div>
          </header>

          {/* CONTENT */}
          <main className="flex-1 p-5 lg:p-7 space-y-6 overflow-x-hidden">
            {/* Page header */}
            <motion.div {...fadeUp(0)} className="flex items-end justify-between">
              <div>
                <h1 className={`text-2xl font-black tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>Good morning, Arjun 👋</h1>
                <p className={`text-sm mt-1 ${dark ? "text-white/40" : "text-gray-400"}`}>Your portfolio is up this month. Here's your full financial overview.</p>
              </div>
              <div className={`hidden sm:block px-4 py-2 rounded-xl border text-xs font-semibold ${dark ? "bg-white/4 border-white/8 text-white/40" : "bg-white border-black/8 text-gray-400 shadow-sm"}`}>
                April 17, 2026
              </div>
            </motion.div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dark ? (
                <>
                  <StatCard title="Total Balance" value="₹4,82,350" change="▲ 8.4%" positive icon={Wallet}
                    gradient="linear-gradient(135deg,#c4b5fd,#e879f9)" delay={0.05} />
                  <StatCard title="Monthly Income" value="₹1,25,000" change="▲ 12.1%" positive icon={TrendingUp}
                    gradient="linear-gradient(135deg,#2dd4a0,#059669)" delay={0.1} />
                  <StatCard title="Monthly Expenses" value="₹48,620" change="▲ 3.2%" positive={false} icon={TrendingDown}
                    gradient="linear-gradient(135deg,#f87171,#dc2626)" delay={0.15} />
                </>
              ) : (
                <>
                  <StatCardLight title="Total Balance" value="₹4,82,350" change="▲ 8.4%" positive icon={Wallet}
                    gradient="linear-gradient(135deg,#7c3aed,#a855f7)" delay={0.05} />
                  <StatCardLight title="Monthly Income" value="₹1,25,000" change="▲ 12.1%" positive icon={TrendingUp}
                    gradient="linear-gradient(135deg,#059669,#10b981)" delay={0.1} />
                  <StatCardLight title="Monthly Expenses" value="₹48,620" change="▲ 3.2%" positive={false} icon={TrendingDown}
                    gradient="linear-gradient(135deg,#dc2626,#ef4444)" delay={0.15} />
                </>
              )}
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Line chart */}
              <Card className="lg:col-span-3 p-6" delay={0.2}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className={`text-[15px] font-bold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>Income vs Expenses</h2>
                    <p className={`text-xs mt-0.5 ${dark ? "text-white/35" : "text-gray-400"}`}>Cash flow overview</p>
                  </div>
                  <div className="relative" ref={filterRef}>
                    <motion.button whileTap={{ scale: 0.96 }} onClick={() => setFilterOpen(!filterOpen)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${dark ? "bg-white/5 border-white/10 text-white/60 hover:bg-white/8 hover:text-white/80" : "bg-black/4 border-black/8 text-gray-600 hover:bg-black/6"}`}>
                      {filterLabels[filter]} <ChevronDown size={11} className={`transition-transform ${filterOpen ? "rotate-180" : ""}`} />
                    </motion.button>
                    <AnimatePresence>
                      {filterOpen && (
                        <motion.div initial={{ opacity: 0, y: -8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          className={`absolute right-0 top-10 w-36 rounded-xl border shadow-2xl overflow-hidden z-50 ${dark ? "bg-[#13102a] border-white/10" : "bg-white border-black/8 shadow-xl"}`}>
                          {Object.entries(filterLabels).map(([key, label]) => (
                            <button key={key} onClick={() => { setFilter(key); setFilterOpen(false); }}
                              className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-all ${filter === key ? dark ? "text-violet-300 bg-violet-500/15" : "text-violet-700 bg-violet-50" : dark ? "text-white/55 hover:text-white hover:bg-white/6" : "text-gray-600 hover:bg-gray-50"}`}>
                              {label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={lineData[filter]} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"} vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: dark ? "rgba(255,255,255,0.35)" : "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: dark ? "rgba(255,255,255,0.35)" : "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip dark={dark} />} />
                    <Line type="monotone" dataKey="income" stroke="#2dd4a0" strokeWidth={2.5} dot={{ fill: "#2dd4a0", strokeWidth: 0, r: 3 }} activeDot={{ r: 5, fill: "#2dd4a0" }} />
                    <Line type="monotone" dataKey="expense" stroke="#f16b6b" strokeWidth={2.5} dot={{ fill: "#f16b6b", strokeWidth: 0, r: 3 }} activeDot={{ r: 5, fill: "#f16b6b" }} />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex gap-5 mt-4">
                  {[{ label: "Income", color: "#2dd4a0" }, { label: "Expenses", color: "#f16b6b" }].map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className={`text-xs font-medium ${dark ? "text-white/45" : "text-gray-400"}`}>{label}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Pie chart */}
              <Card className="lg:col-span-2 p-6" delay={0.25}>
                <h2 className={`text-[15px] font-bold tracking-tight mb-1 ${dark ? "text-white" : "text-gray-900"}`}>Spend Breakdown</h2>
                <p className={`text-xs mb-4 ${dark ? "text-white/35" : "text-gray-400"}`}>By category · April</p>
                <ResponsiveContainer width="100%" height={170}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value" stroke="none">
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v) => [`${v}%`, "Share"]} contentStyle={{ background: dark ? "#13102a" : "#fff", border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`, borderRadius: 12, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                  {pieData.map(({ name, value, color }) => (
                    <div key={name} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                      <span className={`text-xs ${dark ? "text-white/50" : "text-gray-500"}`}>{name}</span>
                      <span className="text-xs font-bold ml-auto" style={{ color }}>{value}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* TRANSACTIONS + PORTFOLIO */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Transactions */}
              <Card className="lg:col-span-3 p-6" delay={0.3}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className={`text-[15px] font-bold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>Recent Transactions</h2>
                    <p className={`text-xs mt-0.5 ${dark ? "text-white/35" : "text-gray-400"}`}>{transactions.length} transactions this month</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${dark ? "text-violet-300 bg-violet-500/12 border-violet-500/20 hover:bg-violet-500/20" : "text-violet-700 bg-violet-50 border-violet-200 hover:bg-violet-100"}`}>
                    View All
                  </motion.button>
                </div>
                <div className="space-y-1">
                  {transactions.map(({ id, name, date, category, amount, icon: Icon, color, bg }, i) => (
                    <motion.div key={id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.04 }}
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl border border-transparent cursor-pointer transition-all duration-200 ${dark ? "hover:bg-white/[0.045] hover:border-white/8" : "hover:bg-black/3 hover:border-black/5"}`}>
                      <div className={`w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0 ${bg}`}>
                        <Icon size={15} className={color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-[13px] font-semibold truncate ${dark ? "text-white/88" : "text-gray-800"}`}>{name}</div>
                        <div className={`text-[11px] mt-0.5 ${dark ? "text-white/30" : "text-gray-400"}`}>{date} · {category}</div>
                      </div>
                      <div className={`text-[13.5px] font-bold flex-shrink-0 ${amount > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {amount > 0 ? "+" : ""}₹{Math.abs(amount).toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Portfolio */}
              <Card className="lg:col-span-2 p-6" delay={0.35}>
                <div className="mb-5">
                  <h2 className={`text-[15px] font-bold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>Portfolio Overview</h2>
                  <p className={`text-xs mt-0.5 ${dark ? "text-white/35" : "text-gray-400"}`}>Investments & savings goals</p>
                </div>
                <div className="space-y-5">
                  {portfolio.map(({ label, value, target, color }, i) => {
                    const pct = Math.round((value / target) * 100);
                    return (
                      <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.07 }}>
                        <div className="flex items-end justify-between mb-2">
                          <div>
                            <div className={`text-[13px] font-semibold ${dark ? "text-white/80" : "text-gray-700"}`}>{label}</div>
                            <div className={`text-[11px] mt-0.5 ${dark ? "text-white/30" : "text-gray-400"}`}>
                              ₹{value.toLocaleString()} of ₹{target.toLocaleString()}
                            </div>
                          </div>
                          <div className={`text-[13px] font-black ${dark ? "text-white/75" : "text-gray-700"}`}>{pct}%</div>
                        </div>
                        <div className={`h-1.5 rounded-full overflow-hidden ${dark ? "bg-white/6" : "bg-black/6"}`}>
                          <motion.div className={`h-full rounded-full bg-gradient-to-r ${color}`}
                            initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.4 + i * 0.08, duration: 0.7, ease: "easeOut" }} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className={`mt-6 pt-5 border-t ${dark ? "border-white/6" : "border-black/6"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-semibold ${dark ? "text-white/40" : "text-gray-400"}`}>Net Worth Growth</span>
                    <span className="text-xs font-bold text-emerald-400">+18.3% YTD</span>
                  </div>
                  <div className={`text-2xl font-black tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>₹3,27,000</div>
                  <div className={`text-[11px] mt-0.5 ${dark ? "text-white/30" : "text-gray-400"}`}>Total invested across all goals</div>
                </div>
              </Card>
            </div>

            {/* AI INSIGHTS */}
            <motion.div {...fadeUp(0.4)}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={15} className="text-violet-400" />
                <h2 className={`text-[15px] font-bold tracking-tight ${dark ? "text-white" : "text-gray-900"}`}>AI Insights</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 ${dark ? "bg-violet-500/20 text-violet-300" : "bg-violet-100 text-violet-600"}`}>Powered by AI</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiInsights.map(({ icon: Icon, title, desc, tag, tagColor, glow, border, iconBg }, i) => (
                  <motion.div key={title}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + i * 0.08 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative overflow-hidden rounded-2xl border p-5 cursor-pointer transition-all duration-300 backdrop-blur-xl group ${dark ? `bg-white/[0.03] border-white/8 ${border} hover:shadow-2xl ${glow}` : `bg-white border-black/6 shadow-sm shadow-black/5 hover:shadow-lg ${glow} ${border}`}`}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
                      style={{ background: iconBg.includes("red") ? "linear-gradient(90deg,transparent,rgba(241,107,107,.6),transparent)" : iconBg.includes("violet") ? "linear-gradient(90deg,transparent,rgba(124,92,252,.7),transparent)" : "linear-gradient(90deg,transparent,rgba(45,212,160,.6),transparent)" }} />
                    <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center mb-4 ${iconBg}`}>
                      <Icon size={18} />
                    </div>
                    <h3 className={`text-[13.5px] font-bold mb-2 tracking-tight ${dark ? "text-white/90" : "text-gray-800"}`}>{title}</h3>
                    <p className={`text-[12px] leading-relaxed mb-4 ${dark ? "text-white/45" : "text-gray-500"}`}>{desc}</p>
                    <span className={`inline-flex items-center gap-1 text-[10.5px] font-bold px-3 py-1.5 rounded-full border ${tagColor}`}>{tag}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}