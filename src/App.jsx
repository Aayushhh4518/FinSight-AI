import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Landmark,
  LayoutDashboard,
  Menu,
  Moon,
  PiggyBank,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatMoney = (value) =>
  `\u20B9${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)}`;

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "insights", label: "AI Insights", icon: BrainCircuit },
  { id: "settings", label: "Settings", icon: Settings },
];

const ranges = ["Last 7 days", "Last 30 days", "3 months"];

const trendData = {
  "Last 7 days": [
    { label: "Mon", income: 11200, expenses: 6400, savings: 4800 },
    { label: "Tue", income: 9800, expenses: 7100, savings: 2700 },
    { label: "Wed", income: 12400, expenses: 5900, savings: 6500 },
    { label: "Thu", income: 11700, expenses: 7600, savings: 4100 },
    { label: "Fri", income: 14800, expenses: 6900, savings: 7900 },
    { label: "Sat", income: 13600, expenses: 8200, savings: 5400 },
    { label: "Sun", income: 12100, expenses: 6100, savings: 6000 },
  ],
  "Last 30 days": [
    { label: "Week 1", income: 68200, expenses: 33800, savings: 34400 },
    { label: "Week 2", income: 71400, expenses: 36100, savings: 35300 },
    { label: "Week 3", income: 75800, expenses: 34700, savings: 41100 },
    { label: "Week 4", income: 79200, expenses: 38900, savings: 40300 },
  ],
  "3 months": [
    { label: "Jan", income: 246000, expenses: 132000, savings: 114000 },
    { label: "Feb", income: 258000, expenses: 141000, savings: 117000 },
    { label: "Mar", income: 271000, expenses: 146000, savings: 125000 },
  ],
};

const spendData = [
  { name: "Food", value: 27, color: "#8b5cf6" },
  { name: "Investments", value: 24, color: "#06b6d4" },
  { name: "Bills", value: 18, color: "#f97316" },
  { name: "Travel", value: 14, color: "#22c55e" },
  { name: "Shopping", value: 17, color: "#ec4899" },
];

const transactions = [
  { name: "Salary Credit", date: "17 Apr 2026", category: "Income", amount: 125000, positive: true },
  { name: "HDFC SIP AutoPay", date: "16 Apr 2026", category: "Investments", amount: -5000, positive: false },
  { name: "Swiggy", date: "16 Apr 2026", category: "Food", amount: -1240, positive: false },
  { name: "Uber Premier", date: "15 Apr 2026", category: "Travel", amount: -680, positive: false },
  { name: "Apple Services", date: "15 Apr 2026", category: "Subscriptions", amount: -899, positive: false },
  { name: "Freelance Project", date: "13 Apr 2026", category: "Side Income", amount: 28000, positive: true },
  { name: "Electricity Bill", date: "11 Apr 2026", category: "Bills", amount: -3200, positive: false },
  { name: "Amazon Order", date: "10 Apr 2026", category: "Shopping", amount: -4599, positive: false },
];

const portfolio = [
  { label: "Equity SIP", current: 182000, target: 250000, change: "+14.2%" },
  { label: "Emergency Fund", current: 91000, target: 120000, change: "+8.1%" },
  { label: "Retirement Vault", current: 148000, target: 200000, change: "+10.6%" },
];

const insightCards = [
  {
    title: "You are overspending on food",
    body: "Dining and delivery spend is 19% higher than your monthly target. Reducing two orders a week can save about 4,800 this month.",
    tone: "rose",
    icon: CreditCard,
  },
  {
    title: "Invest 5,000 in SIP",
    body: "Your free cash flow can safely support another 5,000 monthly SIP without dropping below your emergency reserve target.",
    tone: "cyan",
    icon: Landmark,
  },
  {
    title: "Savings increased by 12%",
    body: "You are ahead of your quarterly savings milestone. If you keep the same pace, you will close the quarter above target.",
    tone: "emerald",
    icon: PiggyBank,
  },
];

const themeMap = {
  dark: {
    app: "bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_30%),linear-gradient(145deg,#020617_0%,#081127_45%,#1b1038_100%)] text-white",
    sidebar: "border-white/10 bg-slate-950/60",
    sidebarCard: "border-white/10 bg-white/5",
    topbar: "border-white/10 bg-slate-950/45",
    panel: "border-white/10 bg-white/[0.055] shadow-[0_24px_80px_rgba(15,23,42,0.34)]",
    mutedPanel: "border-white/10 bg-white/5",
    text: "text-white",
    softText: "text-slate-300",
    mutedText: "text-slate-400",
    subtleText: "text-slate-500",
    input: "border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-400/40 focus:bg-white/10",
    button: "border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
    activeNav: "border-violet-400/30 bg-gradient-to-r from-violet-500/20 to-cyan-400/10 text-white",
    inactiveNav: "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white",
    tableHead: "bg-white/5 text-slate-400",
    divider: "divide-white/10",
    overlay: "bg-slate-950/60",
  },
  light: {
    app: "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.10),transparent_30%),linear-gradient(145deg,#f8fbff_0%,#eef4ff_46%,#f8f3ff_100%)] text-slate-900",
    sidebar: "border-slate-200/80 bg-white/78",
    sidebarCard: "border-slate-200/80 bg-white/70",
    topbar: "border-slate-200/80 bg-white/72",
    panel: "border-slate-200/80 bg-white/72 shadow-[0_18px_60px_rgba(148,163,184,0.20)]",
    mutedPanel: "border-slate-200/80 bg-white/78",
    text: "text-slate-900",
    softText: "text-slate-700",
    mutedText: "text-slate-500",
    subtleText: "text-slate-400",
    input: "border-slate-200/80 bg-white/80 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500/40 focus:bg-white",
    button: "border-slate-200/80 bg-white/80 text-slate-700 hover:bg-slate-50",
    activeNav: "border-violet-200 bg-gradient-to-r from-violet-100 to-cyan-100 text-slate-900",
    inactiveNav: "border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900",
    tableHead: "bg-slate-100/70 text-slate-500",
    divider: "divide-slate-200/80",
    overlay: "bg-slate-950/30",
  },
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function toggleClass(tone) {
  if (tone === "rose") return "border-rose-400/20 bg-rose-400/10 text-rose-300";
  if (tone === "cyan") return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
  return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
}

function insightGradient(tone) {
  if (tone === "rose") return "from-rose-500/20 via-rose-400/10 to-transparent";
  if (tone === "cyan") return "from-cyan-500/20 via-cyan-400/10 to-transparent";
  return "from-emerald-500/20 via-emerald-400/10 to-transparent";
}

function ThemeToggle({ dark, onToggle, theme }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.22, ease: "easeInOut" }}
      onClick={onToggle}
      className={cx(
        "relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300",
        theme.button
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ opacity: 0, y: 5, rotate: -16 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -5, rotate: 16 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {dark ? <Moon size={18} /> : <Sun size={18} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

function StatCard({ title, value, change, positive, icon: Icon, theme, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
      className={cx("group relative overflow-hidden rounded-[28px] border p-5 backdrop-blur-2xl", theme.panel)}
    >
      <div className={cx("absolute inset-0 bg-gradient-to-br opacity-90", accent)} />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl transition-transform duration-300 group-hover:scale-125" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className={cx("text-sm", theme.mutedText)}>{title}</div>
            <div className="mt-2 bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
              {value}
            </div>
          </div>
          <div className={cx("flex h-12 w-12 items-center justify-center rounded-2xl border bg-white/10", theme.mutedPanel)}>
            <Icon size={20} />
          </div>
        </div>
        <div className="mt-5 flex items-center gap-2 text-sm">
          {positive ? (
            <ArrowUpRight size={16} className="text-emerald-400" />
          ) : (
            <ArrowDownRight size={16} className="text-rose-400" />
          )}
          <span className={positive ? "text-emerald-400" : "text-rose-400"}>{change}</span>
          <span className={theme.mutedText}>vs previous period</span>
        </div>
      </div>
    </motion.div>
  );
}

function Panel({ children, theme, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
      className={cx("rounded-[30px] border p-5 backdrop-blur-2xl sm:p-6", theme.panel, className)}
    >
      {children}
    </motion.div>
  );
}

function ChartTooltip({ active, payload, label, dark }) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className={cx(
        "rounded-2xl border px-4 py-3 text-sm shadow-2xl backdrop-blur-2xl",
        dark ? "border-white/10 bg-slate-950/90 text-white" : "border-slate-200 bg-white/95 text-slate-900"
      )}
    >
      <div className={cx("mb-2 text-xs uppercase tracking-[0.24em]", dark ? "text-slate-400" : "text-slate-500")}>
        {label}
      </div>
      {payload.map((item) => (
        <div key={item.dataKey} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
          <span className={dark ? "text-slate-300" : "text-slate-600"}>{item.dataKey}</span>
          <span className="ml-auto font-semibold">{formatMoney(item.value)}</span>
        </div>
      ))}
    </div>
  );
}

function Sidebar({ activeNav, setActiveNav, theme, mobileOpen, setMobileOpen, dark }) {
  const sidebarBody = (
    <div className={cx("flex h-full flex-col border-r p-5 backdrop-blur-2xl", theme.sidebar)}>
      <div className={cx("flex items-center gap-3 rounded-2xl border px-4 py-4", theme.sidebarCard)}>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-white shadow-[0_0_30px_rgba(124,58,237,0.35)]">
          <Sparkles size={18} />
        </div>
        <div>
          <div className={cx("text-lg font-semibold tracking-tight", theme.text)}>FinSight AI</div>
          <div className={theme.mutedText}>Premium Finance OS</div>
        </div>
      </div>

      <div className={cx("mt-8 text-[11px] font-semibold uppercase tracking-[0.28em]", theme.subtleText)}>Workspace</div>

      <nav className="mt-4 space-y-2">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activeNav === id;
          return (
            <motion.button
              key={id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onClick={() => {
                setActiveNav(id);
                setMobileOpen(false);
              }}
              className={cx(
                "relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all duration-300",
                active ? theme.activeNav : theme.inactiveNav
              )}
            >
              {active && (
                <motion.span
                  layoutId="activeNavPill"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/8 via-transparent to-cyan-400/8"
                />
              )}
              <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Icon size={18} />
              </span>
              <span className="relative">{label}</span>
            </motion.button>
          );
        })}
      </nav>

      <div className={cx("mt-auto rounded-[28px] border p-4", theme.sidebarCard)}>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-sm font-bold text-white">
            AP
          </div>
          <div>
            <div className={cx("font-semibold", theme.text)}>Aayush Patil</div>
            <div className={theme.mutedText}>Founder Plan</div>
          </div>
        </div>
        <div
          className={cx(
            "mt-4 rounded-2xl border px-3 py-2 text-xs",
            dark ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" : "border-emerald-200 bg-emerald-50 text-emerald-700"
          )}
        >
          AI copilot active
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden xl:fixed xl:inset-y-0 xl:left-0 xl:z-30 xl:block xl:w-72">{sidebarBody}</aside>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={cx("fixed inset-0 z-40 backdrop-blur-sm xl:hidden", theme.overlay)}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 w-72 xl:hidden"
            >
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={() => setMobileOpen(false)}
                  className={cx("flex h-10 w-10 items-center justify-center rounded-2xl border backdrop-blur-xl", theme.button)}
                >
                  <X size={18} />
                </button>
              </div>
              {sidebarBody}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function TopBar({
  dark,
  setDark,
  setMobileOpen,
  theme,
  search,
  setSearch,
  handleSearch,
  notificationsOn,
}) {
  return (
    <div className={cx("sticky top-0 z-20 border-b backdrop-blur-2xl", theme.topbar)}>
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6 xl:px-8">
        <button
          onClick={() => setMobileOpen(true)}
          className={cx("flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-xl xl:hidden", theme.button)}
        >
          <Menu size={18} />
        </button>

        <form onSubmit={handleSearch} className="flex flex-1">
          <div
            className={cx(
              "group flex h-11 w-full items-center gap-3 rounded-2xl border px-4 backdrop-blur-xl transition-all duration-300",
              theme.input
            )}
          >
            <Search size={17} className={theme.mutedText} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search dashboard, analytics, insights, transactions..."
            />
          </div>
        </form>

        <button className={cx("relative flex h-11 w-11 items-center justify-center rounded-2xl border backdrop-blur-xl", theme.button)}>
          <Bell size={18} />
          {notificationsOn && (
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.85)]" />
          )}
        </button>

        <ThemeToggle dark={dark} onToggle={() => setDark((value) => !value)} theme={theme} />

        <div className={cx("flex items-center gap-3 rounded-2xl border px-3 py-2 backdrop-blur-xl", theme.mutedPanel)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-sm font-bold text-white">
            AP
          </div>
          <div className="hidden sm:block">
            <div className={cx("text-sm font-semibold", theme.text)}>Aayush Patil</div>
            <div className={theme.mutedText}>Personal workspace</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSection({
  theme,
  dark,
  range,
  setRange,
  filterOpen,
  setFilterOpen,
  filterRef,
  filteredTransactions,
  prediction,
}) {
  const totalBalance = 482350;
  const income = 125000;
  const expenses = 48620;
  const savings = income - expenses;
  const dateLabel = new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(new Date("2026-04-17T09:00:00"));

  return (
    <>
      <section className={cx("mb-6 rounded-[32px] border p-6 backdrop-blur-2xl", theme.panel)}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div
              className={cx(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.24em]",
                dark ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-200" : "border-cyan-200 bg-cyan-50 text-cyan-700"
              )}
            >
              <Sparkles size={14} />
              Smart Finance Workspace
            </div>
            <h1 className={cx("mt-4 text-3xl font-semibold tracking-tight sm:text-4xl", theme.text)}>
              Welcome back, Aayush Patil
            </h1>
            <p className={cx("mt-2 max-w-2xl text-sm leading-7 sm:text-base", theme.softText)}>
              Your dashboard is now interactive. Switch sections, track analytics, review AI insights, and test live investment predictions with your own amount.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className={cx("rounded-2xl border px-4 py-3", theme.mutedPanel)}>
              <div className={cx("text-xs uppercase tracking-[0.22em]", theme.mutedText)}>Net savings</div>
              <div className={cx("mt-2 text-xl font-semibold", theme.text)}>{formatMoney(savings)}</div>
            </div>
            <div className={cx("rounded-2xl border px-4 py-3", theme.mutedPanel)}>
              <div className={cx("text-xs uppercase tracking-[0.22em]", theme.mutedText)}>Today</div>
              <div className={cx("mt-2 text-sm font-medium", theme.text)}>{dateLabel}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Balance"
          value={formatMoney(totalBalance)}
          change="+8.4%"
          positive
          icon={Wallet}
          theme={theme}
          accent="from-violet-500/25 via-fuchsia-500/12 to-cyan-400/10"
        />
        <StatCard
          title="Income"
          value={formatMoney(income)}
          change="+12.1%"
          positive
          icon={TrendingUp}
          theme={theme}
          accent="from-emerald-500/25 via-cyan-500/12 to-transparent"
        />
        <StatCard
          title="Expenses"
          value={formatMoney(expenses)}
          change="+3.2%"
          positive={false}
          icon={TrendingDown}
          theme={theme}
          accent="from-rose-500/25 via-orange-500/12 to-transparent"
        />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 2xl:grid-cols-[1.45fr_0.95fr]">
        <Panel theme={theme}>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className={cx("text-xl font-semibold tracking-tight", theme.text)}>Income vs expenses</h2>
              <p className={cx("mt-1 text-sm", theme.mutedText)}>Track cash flow patterns over time</p>
            </div>

            <div className="relative w-full sm:w-auto" ref={filterRef}>
              <button
                onClick={() => setFilterOpen((value) => !value)}
                className={cx("flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-all duration-300 sm:min-w-[170px]", theme.button)}
              >
                <span>{range}</span>
                <span className={cx("transition-transform duration-200", filterOpen && "rotate-180")}>v</span>
              </button>

              <AnimatePresence>
                {filterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className={cx(
                      "absolute right-0 top-14 z-20 w-full overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-2xl sm:w-48",
                      dark ? "border-white/10 bg-slate-950/95" : "border-slate-200 bg-white/95"
                    )}
                  >
                    {ranges.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setRange(option);
                          setFilterOpen(false);
                        }}
                        className={cx(
                          "block w-full px-4 py-3 text-left text-sm transition-all duration-200",
                          range === option
                            ? dark
                              ? "bg-violet-500/20 text-white"
                              : "bg-violet-50 text-slate-900"
                            : dark
                              ? "text-slate-300 hover:bg-white/5 hover:text-white"
                              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData[range]} margin={{ top: 5, right: 10, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeStroke" x1="0" x2="1">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                  <linearGradient id="expenseStroke" x1="0" x2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke={dark ? "rgba(148,163,184,0.18)" : "rgba(148,163,184,0.35)"} strokeDasharray="4 4" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: dark ? "#94a3b8" : "#64748b", fontSize: 12 }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: dark ? "#94a3b8" : "#64748b", fontSize: 12 }}
                  tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                />
                <Tooltip content={<ChartTooltip dark={dark} />} />
                <Line type="monotone" dataKey="income" stroke="url(#incomeStroke)" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 5, fill: "#22d3ee", strokeWidth: 0 }} />
                <Line type="monotone" dataKey="expenses" stroke="url(#expenseStroke)" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 5, fill: "#ec4899", strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel theme={theme}>
          <div className="mb-5">
            <h2 className={cx("text-xl font-semibold tracking-tight", theme.text)}>Live prediction preview</h2>
            <p className={cx("mt-1 text-sm", theme.mutedText)}>Your custom amount flows into AI projection instantly</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className={cx("rounded-2xl border p-4", theme.mutedPanel)}>
              <div className={theme.mutedText}>Monthly investment</div>
              <div className={cx("mt-2 text-2xl font-semibold", theme.text)}>{formatMoney(prediction.monthlyInvestment)}</div>
            </div>
            <div className={cx("rounded-2xl border p-4", theme.mutedPanel)}>
              <div className={theme.mutedText}>Projected future value</div>
              <div className="mt-2 text-2xl font-semibold text-cyan-400">{formatMoney(prediction.futureValue)}</div>
            </div>
            <div className={cx("rounded-2xl border p-4", theme.mutedPanel)}>
              <div className={theme.mutedText}>Estimated wealth gain</div>
              <div className="mt-2 text-2xl font-semibold text-emerald-400">{formatMoney(prediction.wealthGain)}</div>
            </div>
          </div>
        </Panel>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 2xl:grid-cols-[1.35fr_1fr]">
        <Panel theme={theme}>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className={cx("text-xl font-semibold tracking-tight", theme.text)}>Recent transactions</h2>
              <p className={cx("mt-1 text-sm", theme.mutedText)}>
                {filteredTransactions.length} result{filteredTransactions.length === 1 ? "" : "s"} visible
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[26px] border border-inherit">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_0.9fr] gap-3 px-4 py-4 text-xs font-semibold uppercase tracking-[0.18em]">
              <div className={theme.tableHead}>Name</div>
              <div className={theme.tableHead}>Date</div>
              <div className={theme.tableHead}>Category</div>
              <div className={cx("text-right", theme.tableHead)}>Amount</div>
            </div>
            <div className={cx("divide-y", theme.divider)}>
              {filteredTransactions.map((item) => (
                <motion.div
                  key={`${item.name}-${item.date}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24, ease: "easeInOut" }}
                  className={cx("grid grid-cols-[1.4fr_1fr_1fr_0.9fr] gap-3 px-4 py-4 text-sm", theme.softText)}
                >
                  <div className={cx("font-medium", theme.text)}>{item.name}</div>
                  <div>{item.date}</div>
                  <div>{item.category}</div>
                  <div className={cx("text-right font-semibold", item.positive ? "text-emerald-400" : "text-rose-400")}>
                    {item.positive ? "+" : "-"}
                    {formatMoney(Math.abs(item.amount))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Panel>

        <Panel theme={theme}>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className={cx("text-xl font-semibold tracking-tight", theme.text)}>Portfolio overview</h2>
              <p className={cx("mt-1 text-sm", theme.mutedText)}>Savings and investment progress</p>
            </div>
            <div className={cx("rounded-2xl border px-3 py-2 text-xs font-medium", dark ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" : "border-emerald-200 bg-emerald-50 text-emerald-700")}>
              +18.3% YTD
            </div>
          </div>

          <div className="space-y-5">
            {portfolio.map((item) => {
              const progress = Math.min(100, Math.round((item.current / item.target) * 100));
              return (
                <div key={item.label} className={cx("rounded-[26px] border p-4", theme.mutedPanel)}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className={cx("text-sm font-semibold", theme.text)}>{item.label}</div>
                      <div className={cx("mt-1 text-sm", theme.mutedText)}>
                        {formatMoney(item.current)} of {formatMoney(item.target)}
                      </div>
                    </div>
                    <div className={cx("rounded-xl border px-2.5 py-1 text-xs font-medium", dark ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-200" : "border-cyan-200 bg-cyan-50 text-cyan-700")}>
                      {item.change}
                    </div>
                  </div>
                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-300/20">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400"
                    />
                  </div>
                  <div className={cx("mt-3 flex items-center justify-between text-xs", theme.mutedText)}>
                    <span>Goal completion</span>
                    <span>{progress}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </section>
    </>
  );
}

function AnalyticsSection({ theme, dark, range }) {
  const analyticsCards = [
    { label: "Average savings rate", value: "31.4%", trend: "+4.2%" },
    { label: "Investment growth", value: "18.3%", trend: "+2.6%" },
    { label: "Expense stability", value: "Healthy", trend: "-1.1%" },
  ];

  return (
    <div className="space-y-6">
      <section className={cx("rounded-[32px] border p-6", theme.panel)}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className={cx("text-3xl font-semibold tracking-tight", theme.text)}>Analytics</h1>
            <p className={cx("mt-2 max-w-2xl text-sm leading-7", theme.softText)}>
              A deeper view into savings quality, spending behavior, and portfolio efficiency for the selected period.
            </p>
          </div>
          <div className={cx("rounded-2xl border px-4 py-3 text-sm", theme.mutedPanel)}>
            Active range: <span className="font-semibold">{range}</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {analyticsCards.map((item) => (
          <Panel key={item.label} theme={theme}>
            <div className={theme.mutedText}>{item.label}</div>
            <div className={cx("mt-3 text-3xl font-semibold", theme.text)}>{item.value}</div>
            <div className="mt-2 text-sm text-cyan-400">{item.trend}</div>
          </Panel>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel theme={theme}>
          <div className="mb-5">
            <h2 className={cx("text-xl font-semibold tracking-tight", theme.text)}>Savings trend</h2>
            <p className={cx("mt-1 text-sm", theme.mutedText)}>Net retained capital after expenses</p>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData[range]} margin={{ top: 5, right: 10, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="savingsStroke" x1="0" x2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke={dark ? "rgba(148,163,184,0.18)" : "rgba(148,163,184,0.35)"} strokeDasharray="4 4" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: dark ? "#94a3b8" : "#64748b", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: dark ? "#94a3b8" : "#64748b", fontSize: 12 }} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                <Tooltip content={<ChartTooltip dark={dark} />} />
                <Line type="monotone" dataKey="savings" stroke="url(#savingsStroke)" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 5, fill: "#8b5cf6", strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel theme={theme}>
          <div className="mb-5">
            <h2 className={cx("text-xl font-semibold tracking-tight", theme.text)}>Spending mix</h2>
            <p className={cx("mt-1 text-sm", theme.mutedText)}>Where your money is going</p>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={spendData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={96} paddingAngle={4}>
                  {spendData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {spendData.map((item) => (
              <div key={item.name} className={cx("flex items-center justify-between rounded-2xl border px-4 py-3", theme.mutedPanel)}>
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className={theme.softText}>{item.name}</span>
                </div>
                <span className={cx("font-semibold", theme.text)}>{item.value}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}

function InsightsSection({
  theme,
  dark,
  predictionInput,
  setPredictionInput,
  years,
  setYears,
  returnRate,
  setReturnRate,
  prediction,
  filteredInsights,
}) {
  return (
    <div className="space-y-6">
      <section className={cx("rounded-[32px] border p-6", theme.panel)}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className={cx("text-3xl font-semibold tracking-tight", theme.text)}>AI Insights</h1>
            <p className={cx("mt-2 max-w-2xl text-sm leading-7", theme.softText)}>
              Smart financial actions, risk nudges, and a live projection tool where you can enter your own amount and see predictions immediately.
            </p>
          </div>
          <div className={cx("rounded-2xl border px-4 py-3 text-sm", theme.mutedPanel)}>
            Live prediction engine: <span className="font-semibold text-cyan-400">Active</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Panel theme={theme}>
          <div className="mb-5 flex items-center gap-2">
            <Zap size={18} className="text-cyan-400" />
            <h2 className={cx("text-xl font-semibold tracking-tight", theme.text)}>Live investment prediction</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className={cx("mb-2 block text-sm font-medium", theme.softText)}>Monthly amount</label>
              <input
                value={predictionInput}
                onChange={(event) => setPredictionInput(event.target.value.replace(/[^\d]/g, ""))}
                className={cx("w-full rounded-2xl border px-4 py-3 outline-none transition-all duration-300", theme.input)}
                placeholder="5000"
              />
            </div>
            <div>
              <label className={cx("mb-2 block text-sm font-medium", theme.softText)}>Years</label>
              <input
                type="number"
                min="1"
                max="40"
                value={years}
                onChange={(event) => setYears(event.target.value)}
                className={cx("w-full rounded-2xl border px-4 py-3 outline-none transition-all duration-300", theme.input)}
              />
            </div>
            <div>
              <label className={cx("mb-2 block text-sm font-medium", theme.softText)}>Expected return %</label>
              <input
                type="number"
                min="1"
                max="30"
                step="0.5"
                value={returnRate}
                onChange={(event) => setReturnRate(event.target.value)}
                className={cx("w-full rounded-2xl border px-4 py-3 outline-none transition-all duration-300", theme.input)}
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className={cx("rounded-[26px] border p-4", theme.mutedPanel)}>
              <div className={theme.mutedText}>Total invested</div>
              <div className={cx("mt-3 text-2xl font-semibold", theme.text)}>{formatMoney(prediction.totalInvested)}</div>
            </div>
            <div className={cx("rounded-[26px] border p-4", theme.mutedPanel)}>
              <div className={theme.mutedText}>Projected value</div>
              <div className="mt-3 text-2xl font-semibold text-cyan-400">{formatMoney(prediction.futureValue)}</div>
            </div>
            <div className={cx("rounded-[26px] border p-4", theme.mutedPanel)}>
              <div className={theme.mutedText}>Estimated returns</div>
              <div className="mt-3 text-2xl font-semibold text-emerald-400">{formatMoney(prediction.wealthGain)}</div>
            </div>
          </div>

          <div className={cx("mt-5 rounded-[26px] border p-5", theme.mutedPanel)}>
            <div className={cx("text-sm", theme.softText)}>
              If you invest <span className="font-semibold text-cyan-400">{formatMoney(prediction.monthlyInvestment)}</span> every month for{" "}
              <span className="font-semibold">{prediction.years}</span> years at an expected return of{" "}
              <span className="font-semibold">{prediction.returnRate}%</span>, your projected value becomes{" "}
              <span className="font-semibold text-emerald-400">{formatMoney(prediction.futureValue)}</span>.
            </div>
          </div>
        </Panel>

        <Panel theme={theme}>
          <div className="mb-5">
            <h2 className={cx("text-xl font-semibold tracking-tight", theme.text)}>Smart recommendations</h2>
            <p className={cx("mt-1 text-sm", theme.mutedText)}>Insights update based on spending behavior and long-term goals</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredInsights.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -4, scale: 1.015 }}
                  transition={{ duration: 0.24, ease: "easeInOut" }}
                  className={cx("relative overflow-hidden rounded-[28px] border p-5", theme.mutedPanel)}
                >
                  <div className={cx("absolute inset-0 bg-gradient-to-br", insightGradient(card.tone))} />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className={cx("flex h-12 w-12 items-center justify-center rounded-2xl border", toggleClass(card.tone))}>
                        <Icon size={20} />
                      </div>
                      <div className={cx("rounded-full border px-3 py-1 text-xs font-medium", toggleClass(card.tone))}>
                        AI signal
                      </div>
                    </div>
                    <h3 className={cx("mt-5 text-lg font-semibold tracking-tight", theme.text)}>{card.title}</h3>
                    <p className={cx("mt-3 text-sm leading-7", theme.softText)}>{card.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Panel>
      </section>
    </div>
  );
}

function SettingsSection({ theme, dark, settings, setSettings, setDark }) {
  const settingRows = [
    {
      key: "notifications",
      title: "Real-time notifications",
      description: "Get alerts for large transactions, savings milestones, and portfolio changes.",
      icon: Bell,
    },
    {
      key: "autoInsights",
      title: "Auto AI insights",
      description: "Generate automatic recommendations whenever new financial activity is detected.",
      icon: BrainCircuit,
    },
    {
      key: "safeMode",
      title: "Privacy safe mode",
      description: "Keep projections and analytics visible only inside your personal workspace.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-6">
      <section className={cx("rounded-[32px] border p-6", theme.panel)}>
        <h1 className={cx("text-3xl font-semibold tracking-tight", theme.text)}>Settings</h1>
        <p className={cx("mt-2 max-w-2xl text-sm leading-7", theme.softText)}>
          Control how the dashboard behaves, how AI suggestions appear, and whether you want dark or light mode.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_0.9fr]">
        <Panel theme={theme}>
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-cyan-400" />
            <h2 className={cx("text-xl font-semibold tracking-tight", theme.text)}>Workspace controls</h2>
          </div>

          <div className="space-y-4">
            {settingRows.map((item) => {
              const Icon = item.icon;
              const enabled = settings[item.key];
              return (
                <div key={item.key} className={cx("flex items-center justify-between gap-4 rounded-[26px] border p-4", theme.mutedPanel)}>
                  <div className="flex items-start gap-4">
                    <div className={cx("flex h-12 w-12 items-center justify-center rounded-2xl border", theme.mutedPanel)}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className={cx("font-semibold", theme.text)}>{item.title}</div>
                      <div className={cx("mt-1 text-sm leading-6", theme.mutedText)}>{item.description}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSettings((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                    className={cx(
                      "relative h-8 w-16 rounded-full border transition-all duration-300",
                      enabled
                        ? "border-cyan-400/30 bg-cyan-400/20"
                        : dark
                          ? "border-white/10 bg-white/10"
                          : "border-slate-300 bg-slate-200"
                    )}
                  >
                    <span
                      className={cx(
                        "absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-900 transition-all duration-300",
                        enabled ? "left-9" : "left-1"
                      )}
                    >
                      {enabled ? <CheckCircle2 size={14} /> : null}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel theme={theme}>
          <div className="mb-5">
            <h2 className={cx("text-xl font-semibold tracking-tight", theme.text)}>Theme mode</h2>
            <p className={cx("mt-1 text-sm", theme.mutedText)}>Switch between dark and light instantly</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <button
              onClick={() => setDark(true)}
              className={cx(
                "rounded-[26px] border p-5 text-left transition-all duration-300",
                dark ? "border-violet-400/30 bg-violet-500/10" : theme.mutedPanel
              )}
            >
              <Moon size={20} className="text-violet-400" />
              <div className={cx("mt-4 text-lg font-semibold", theme.text)}>Dark mode</div>
              <div className={cx("mt-2 text-sm leading-6", theme.mutedText)}>High-contrast premium interface for focus and low-light work.</div>
            </button>
            <button
              onClick={() => setDark(false)}
              className={cx(
                "rounded-[26px] border p-5 text-left transition-all duration-300",
                !dark ? "border-cyan-400/30 bg-cyan-400/10" : theme.mutedPanel
              )}
            >
              <Sun size={20} className="text-cyan-400" />
              <div className={cx("mt-4 text-lg font-semibold", theme.text)}>Light mode</div>
              <div className={cx("mt-2 text-sm leading-6", theme.mutedText)}>Bright clean workspace with softer contrast and clear typography.</div>
            </button>
          </div>

          <div className={cx("mt-5 rounded-[26px] border p-5", theme.mutedPanel)}>
            <div className={cx("flex items-center gap-2 text-sm font-medium", theme.softText)}>
              <DollarSign size={16} />
              Active workspace summary
            </div>
            <div className={cx("mt-4 grid grid-cols-1 gap-3 md:grid-cols-2", theme.mutedText)}>
              <div>Theme: <span className={cx("font-semibold", theme.text)}>{dark ? "Dark" : "Light"}</span></div>
              <div>Notifications: <span className={cx("font-semibold", theme.text)}>{settings.notifications ? "On" : "Off"}</span></div>
              <div>Auto AI insights: <span className={cx("font-semibold", theme.text)}>{settings.autoInsights ? "On" : "Off"}</span></div>
              <div>Privacy safe mode: <span className={cx("font-semibold", theme.text)}>{settings.safeMode ? "On" : "Off"}</span></div>
            </div>
          </div>
        </Panel>
      </section>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("finsight-theme") !== "light");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [range, setRange] = useState("Last 30 days");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [predictionInput, setPredictionInput] = useState("5000");
  const [years, setYears] = useState("10");
  const [returnRate, setReturnRate] = useState("12");
  const [settings, setSettings] = useState({
    notifications: true,
    autoInsights: true,
    safeMode: true,
  });
  const filterRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    localStorage.setItem("finsight-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const handleOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const theme = dark ? themeMap.dark : themeMap.light;
  const searchValue = search.trim().toLowerCase();

  const prediction = useMemo(() => {
    const monthlyInvestment = Math.max(0, Number(predictionInput) || 0);
    const yearsNum = Math.max(1, Number(years) || 1);
    const rateNum = Math.max(1, Number(returnRate) || 1);
    const monthlyRate = rateNum / 100 / 12;
    const months = yearsNum * 12;
    const futureValue = monthlyRate === 0
      ? monthlyInvestment * months
      : monthlyInvestment * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvested = monthlyInvestment * months;
    return {
      monthlyInvestment,
      years: yearsNum,
      returnRate: rateNum,
      totalInvested,
      futureValue: Math.round(futureValue),
      wealthGain: Math.round(futureValue - totalInvested),
    };
  }, [predictionInput, years, returnRate]);

  const filteredTransactions = useMemo(() => {
    if (!searchValue) return transactions;
    return transactions.filter((item) =>
      `${item.name} ${item.category} ${item.date}`.toLowerCase().includes(searchValue)
    );
  }, [searchValue]);

  const filteredInsights = useMemo(() => {
    if (!searchValue) return insightCards;
    return insightCards.filter((item) =>
      `${item.title} ${item.body}`.toLowerCase().includes(searchValue)
    );
  }, [searchValue]);

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchValue) return;

    const matchedNav = navItems.find((item) => item.label.toLowerCase().includes(searchValue));
    if (matchedNav) {
      setActiveNav(matchedNav.id);
      return;
    }

    if (filteredInsights.length) {
      setActiveNav("insights");
      return;
    }

    if (filteredTransactions.length !== transactions.length) {
      setActiveNav("dashboard");
      return;
    }

    setActiveNav("analytics");
  };

  const activeTitle = navItems.find((item) => item.id === activeNav)?.label ?? "Dashboard";

  return (
    <div className={dark ? "dark" : ""}>
      <style>{`
        html, body, #root {
          width: 100%;
          max-width: 100%;
          min-height: 100%;
          margin: 0;
        }
        body {
          text-align: left;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          transition: background 240ms ease-in-out, color 240ms ease-in-out;
        }
        #root {
          border: 0;
          margin: 0;
          display: block;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      <div className={cx("min-h-screen transition-colors duration-300", theme.app)}>
        <Sidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          theme={theme}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          dark={dark}
        />

        <div className="min-h-screen xl:pl-72">
          <TopBar
            dark={dark}
            setDark={setDark}
            setMobileOpen={setMobileOpen}
            theme={theme}
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            notificationsOn={settings.notifications}
          />

          <main className="px-4 py-6 sm:px-6 xl:px-8">
            <div className="mb-4">
              <div className={cx("text-sm uppercase tracking-[0.26em]", theme.subtleText)}>Current section</div>
              <div className={cx("mt-1 text-xl font-semibold", theme.text)}>{activeTitle}</div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeNav}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.24, ease: "easeInOut" }}
              >
                {activeNav === "dashboard" && (
                  <DashboardSection
                    theme={theme}
                    dark={dark}
                    range={range}
                    setRange={setRange}
                    filterOpen={filterOpen}
                    setFilterOpen={setFilterOpen}
                    filterRef={filterRef}
                    filteredTransactions={filteredTransactions}
                    prediction={prediction}
                  />
                )}

                {activeNav === "analytics" && <AnalyticsSection theme={theme} dark={dark} range={range} />}

                {activeNav === "insights" && (
                  <InsightsSection
                    theme={theme}
                    dark={dark}
                    predictionInput={predictionInput}
                    setPredictionInput={setPredictionInput}
                    years={years}
                    setYears={setYears}
                    returnRate={returnRate}
                    setReturnRate={setReturnRate}
                    prediction={prediction}
                    filteredInsights={filteredInsights}
                  />
                )}

                {activeNav === "settings" && (
                  <SettingsSection theme={theme} dark={dark} settings={settings} setSettings={setSettings} setDark={setDark} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
