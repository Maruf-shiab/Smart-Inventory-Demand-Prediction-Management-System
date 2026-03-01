'use client';

/**
 * Sales Analytics Page — Interactive & Animated
 * ==============================================
 *
 * Animated charts, interactive widgets, animated stat cards.
 * Uses recharts for professional chart rendering.
 * Dark theme with glass-morphism.
 */

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  HiOutlineChartBar,
  HiOutlineExclamationTriangle,
  HiOutlineBanknotes,
  HiOutlineCube,
  HiOutlineCalendarDays,
  HiOutlineTrophy,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineLightBulb,
  HiOutlineBolt,
  HiOutlineArrowPath,
  HiOutlineArrowLeft,
  HiOutlineUserGroup,
  HiOutlineShoppingBag,
  HiOutlineFire,
  HiOutlineSparkles,
  HiOutlineChevronDown,
  HiOutlinePresentationChartLine,
  HiOutlineTag,
} from 'react-icons/hi2';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadialBarChart, RadialBar, ComposedChart,
} from 'recharts';

// ─── Dark Theme Styles ──────────────────────────────
const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    padding: '1.5rem 2rem 2rem',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '1.5rem', padding: '1.5rem 1.75rem',
    background: 'linear-gradient(145deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9))',
    borderRadius: '20px', border: '1px solid rgba(34,197,94,0.15)',
    backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
    background: 'radial-gradient(circle at 30% 30%, rgba(34,197,94,0.08), transparent 40%)',
    pointerEvents: 'none',
  },
  headerLeft: { position: 'relative', zIndex: 1 },
  headerTitle: {
    fontSize: '1.75rem', fontWeight: '700', color: '#fff',
    letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '0.75rem',
  },
  titleIcon: {
    width: '42px', height: '42px',
    background: 'linear-gradient(135deg, #22c55e, #3b82f6)',
    borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(34,197,94,0.4)', color: '#fff',
  },
  headerSub: { color: 'rgba(148,163,184,0.8)', fontSize: '0.9rem', marginTop: '0.35rem' },
  backBtn: {
    background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)',
    padding: '0.7rem 1.25rem', borderRadius: '12px',
    color: '#60a5fa', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    transition: 'all 0.2s ease', textDecoration: 'none', position: 'relative', zIndex: 1,
  },
  // Year filter
  yearWrap: {
    display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 1,
  },
  yearSelect: {
    padding: '0.55rem 2rem 0.55rem 0.85rem', borderRadius: '10px',
    border: '1px solid rgba(59,130,246,0.25)', background: 'rgba(15,23,42,0.6)',
    color: '#e2e8f0', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
    outline: 'none', appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2360a5fa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '20px',
  },
  // Stats grid
  statsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem',
  },
  statCard: (color, delay) => ({
    background: 'linear-gradient(145deg, rgba(30,41,59,0.7), rgba(15,23,42,0.85))',
    borderRadius: '18px', padding: '1.25rem 1.5rem', position: 'relative', overflow: 'hidden',
    border: `1px solid ${color}15`,
    animation: `fadeSlideUp 0.5s ease ${delay}s both`,
  }),
  statGlow: (color) => ({
    position: 'absolute', top: '-60%', right: '-60%', width: '200%', height: '200%',
    background: `radial-gradient(circle at 70% 30%, ${color}10, transparent 35%)`,
    pointerEvents: 'none',
  }),
  statIconWrap: (color) => ({
    width: '44px', height: '44px',
    background: `linear-gradient(135deg, ${color}20, ${color}08)`,
    borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    color, marginBottom: '0.75rem',
    border: `1px solid ${color}25`,
  }),
  statValue: {
    fontSize: '1.5rem', fontWeight: '700', color: '#fff',
    letterSpacing: '-0.03em', marginBottom: '0.15rem',
  },
  statLabel: { color: 'rgba(148,163,184,0.7)', fontSize: '12.5px', fontWeight: '500' },
  statChange: (positive) => ({
    display: 'inline-flex', alignItems: 'center', gap: '0.2rem',
    fontSize: '11px', fontWeight: '600', marginTop: '0.35rem',
    color: positive ? '#4ade80' : '#f87171',
    background: positive ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
    padding: '2px 8px', borderRadius: '6px',
  }),
  // Cards
  card: {
    background: 'linear-gradient(145deg, rgba(30,41,59,0.7), rgba(15,23,42,0.85))',
    borderRadius: '18px', padding: '1.5rem', position: 'relative', overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  cardGlow: {
    position: 'absolute', top: '-50%', right: '-50%', width: '200%', height: '200%',
    background: 'radial-gradient(circle at 70% 30%, rgba(59,130,246,0.04), transparent 40%)',
    pointerEvents: 'none',
  },
  cardTitle: {
    display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 1,
    color: '#e2e8f0', fontSize: '1rem', fontWeight: '600', marginBottom: '1rem',
  },
  // Table
  table: { width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.3rem' },
  th: {
    padding: '0.6rem 0.85rem', fontSize: '11px', fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: '0.6px',
    color: 'rgba(148,163,184,0.6)', textAlign: 'left',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  },
  td: {
    padding: '0.65rem 0.85rem', fontSize: '13px', color: '#cbd5e1',
    borderBottom: '1px solid rgba(255,255,255,0.03)', verticalAlign: 'middle',
  },
  productCode: {
    background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)',
    padding: '2px 7px', borderRadius: '4px', fontSize: '10.5px',
    fontFamily: "'SF Mono','Fira Code',monospace", color: '#60a5fa',
    display: 'inline-block', marginTop: '2px',
  },
  // Insights
  insightCard: (color, delay) => ({
    background: `linear-gradient(145deg, ${color}08, rgba(15,23,42,0.85))`,
    borderRadius: '14px', padding: '1.25rem', textAlign: 'center',
    border: `1px solid ${color}15`,
    animation: `fadeSlideUp 0.5s ease ${delay}s both`,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  }),
  // Loading
  loadingContainer: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: '80vh', gap: '1.5rem',
    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
  },
  spinner: {
    width: '50px', height: '50px',
    border: '3px solid rgba(34,197,94,0.2)', borderTop: '3px solid #22c55e',
    borderRadius: '50%', animation: 'spin 1s linear infinite',
  },
  alertError: {
    background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(15,23,42,0.9))',
    borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '1.25rem',
    display: 'flex', alignItems: 'center', gap: '0.6rem',
    border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '14px', fontWeight: '500',
  },
  rankBadge: (rank) => ({
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: '24px', height: '24px', borderRadius: '8px', fontSize: '11px', fontWeight: '700',
    background: rank === 1 ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                rank === 2 ? 'linear-gradient(135deg, #94a3b8, #64748b)' :
                rank === 3 ? 'linear-gradient(135deg, #b45309, #92400e)' :
                'rgba(148,163,184,0.12)',
    color: rank <= 3 ? '#fff' : 'rgba(148,163,184,0.6)',
    border: rank <= 3 ? 'none' : '1px solid rgba(255,255,255,0.06)',
  }),
  progressBar: (pct, color) => ({
    width: `${pct}%`, height: '6px', borderRadius: '3px',
    background: `linear-gradient(90deg, ${color}, ${color}aa)`,
    transition: 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
  }),
  progressTrack: {
    width: '100%', height: '6px', borderRadius: '3px',
    background: 'rgba(255,255,255,0.05)', overflow: 'hidden',
  },
  emptyState: {
    textAlign: 'center', padding: '4rem 2rem', position: 'relative', zIndex: 1,
  },
  emptyIcon: {
    width: '80px', height: '80px',
    background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(59,130,246,0.15))',
    borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    margin: '0 auto 1.5rem', color: '#4ade80',
  },
  addBtn: {
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    border: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px',
    color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    boxShadow: '0 4px 12px rgba(34,197,94,0.3)', textDecoration: 'none',
    marginTop: '1rem',
  },
};

// Colors for charts
const CHART_COLORS = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#14b8a6'];

// Custom tooltip
const DarkTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(15,23,42,0.95)', borderRadius: '12px', padding: '0.75rem 1rem',
      border: '1px solid rgba(59,130,246,0.2)', backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    }}>
      <div style={{ color: '#e2e8f0', fontWeight: '600', fontSize: '13px', marginBottom: '0.4rem' }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '12px', marginBottom: '0.2rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }}></span>
          <span style={{ color: 'rgba(148,163,184,0.8)' }}>{p.name}:</span>
          <span style={{ color: '#fff', fontWeight: '600' }}>
            {typeof p.value === 'number' && p.name?.toLowerCase().includes('revenue') || p.name?.toLowerCase().includes('profit') || p.name?.toLowerCase().includes('total')
              ? `$${p.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : p.value?.toLocaleString?.() ?? p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// Animated number
function AnimatedNumber({ value, prefix = '', suffix = '', duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!value) { setDisplay(0); return; }
    let start = 0;
    const end = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(end)) { setDisplay(0); return; }
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(start + (end - start) * eased);
      if (progress < 1) ref.current = requestAnimationFrame(tick);
    }
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [value, duration]);
  const formatted = prefix === '$'
    ? `$${display.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `${prefix}${Math.round(display).toLocaleString()}${suffix}`;
  return <>{formatted}</>;
}

// CSS keyframes
const keyframes = `
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

export default function SalesAnalyticsPage() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categoryPerformance, setCategoryPerformance] = useState([]);
  const [dailyTrend, setDailyTrend] = useState([]);
  const [overallStats, setOverallStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [animReady, setAnimReady] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => { fetchAnalytics(); }, [selectedYear]);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setAnimReady(true), 100);
      return () => clearTimeout(t);
    }
  }, [loading]);

  async function fetchAnalytics() {
    try {
      setLoading(true);
      setAnimReady(false);
      const response = await fetch(`/api/analytics/monthly-sales?year=${selectedYear}`);
      const result = await response.json();
      if (result.success) {
        setMonthlyData(result.monthlySummary || result.data || []);
        setTopProducts(result.topProducts || []);
        setCategoryPerformance(result.categoryPerformance || []);
        setDailyTrend(result.dailyTrend || []);
        setOverallStats(result.overallStats || null);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function toNum(v) { const n = Number(v); return isNaN(n) ? 0 : n; }
  function fmtCurrency(v) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v || 0); }

  // Prepare chart data (chronological)
  const chartMonthly = [...monthlyData].reverse().map(m => ({
    name: `${(m.MonthName || '').slice(0, 3)} ${m.SalesYear}`,
    Revenue: toNum(m.TotalRevenue),
    Profit: toNum(m.TotalProfit),
    Units: toNum(m.TotalUnitsSold),
    Sales: toNum(m.TotalSales ?? m.TotalTransactions),
    Customers: toNum(m.UniqueCustomers),
  }));

  const chartDaily = [...dailyTrend].reverse().map(d => ({
    name: new Date(d.SaleDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Revenue: toNum(d.Revenue),
    Units: toNum(d.UnitsSold),
    Transactions: toNum(d.Transactions),
  }));

  const chartCategory = categoryPerformance.map((c, i) => ({
    name: c.CategoryName,
    value: toNum(c.TotalRevenue),
    units: toNum(c.TotalUnitsSold),
    percentage: toNum(c.RevenuePercentage),
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }));

  const totalRevenue = toNum(overallStats?.totalRevenue);
  const totalProfit = toNum(overallStats?.totalProfit);
  const totalUnits = toNum(overallStats?.totalUnitsSold);
  const totalTx = toNum(overallStats?.totalTransactions);
  const avgMonthlyRev = toNum(overallStats?.averageMonthlyRevenue);
  const maxMonth = monthlyData.reduce((mx, m) => (toNum(m.TotalRevenue) > toNum(mx?.TotalRevenue) ? m : mx), monthlyData[0]);
  const profitMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0;

  // MoM growth
  const lastTwo = [...monthlyData].slice(0, 2);
  const momGrowth = lastTwo.length >= 2
    ? (((toNum(lastTwo[0].TotalRevenue) - toNum(lastTwo[1].TotalRevenue)) / (toNum(lastTwo[1].TotalRevenue) || 1)) * 100).toFixed(1)
    : null;

  // Year options
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

  if (loading) {
    return (
      <div style={s.loadingContainer}>
        <style>{keyframes}</style>
        <div style={s.spinner}></div>
        <span style={{ color: 'rgba(148,163,184,0.8)', fontSize: '15px', fontWeight: '500' }}>Loading analytics...</span>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <style>{keyframes}</style>

      {/* Header */}
      <div style={s.header}>
        <div style={s.headerGlow}></div>
        <div style={s.headerLeft}>
          <h1 style={s.headerTitle}>
            <span style={s.titleIcon}><HiOutlinePresentationChartLine size={22} /></span>
            Sales Analytics
          </h1>
          <p style={s.headerSub}>Interactive sales trends, demand analysis & performance metrics</p>
        </div>
        <div style={s.yearWrap}>
          <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} style={s.yearSelect}>
            {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <Link href="/" style={s.backBtn}><HiOutlineArrowLeft size={16} /> Dashboard</Link>
        </div>
      </div>

      {error && (
        <div style={s.alertError}><HiOutlineExclamationTriangle size={18} /> {error}</div>
      )}

      {monthlyData.length === 0 && !error ? (
        <div style={s.card}>
          <div style={s.emptyState}>
            <div style={s.emptyIcon}><HiOutlineChartBar size={36} /></div>
            <h3 style={{ color: '#e2e8f0', fontSize: '1.2rem', marginBottom: '0.5rem' }}>No sales data for {selectedYear}</h3>
            <p style={{ color: 'rgba(148,163,184,0.6)', fontSize: '14px' }}>Start recording sales to see interactive analytics</p>
            <Link href="/sales/add" style={s.addBtn}><HiOutlineBanknotes size={16} /> Add Sale</Link>
          </div>
        </div>
      ) : (
        <>
          {/* ─── Stat Cards ─── */}
          <div style={s.statsGrid}>
            {[
              { icon: <HiOutlineBanknotes size={22} />, label: 'Total Revenue', value: totalRevenue, prefix: '$', color: '#22c55e', delay: 0 },
              { icon: <HiOutlineArrowTrendingUp size={22} />, label: 'Total Profit', value: totalProfit, prefix: '$', color: '#3b82f6', delay: 0.1, extra: `${profitMargin}% margin` },
              { icon: <HiOutlineCube size={22} />, label: 'Units Sold', value: totalUnits, color: '#8b5cf6', delay: 0.2 },
              { icon: <HiOutlineShoppingBag size={22} />, label: 'Transactions', value: totalTx, color: '#f59e0b', delay: 0.3, extra: momGrowth !== null ? `${momGrowth > 0 ? '+' : ''}${momGrowth}% MoM` : null },
            ].map((st, i) => (
              <div key={i} style={s.statCard(st.color, st.delay)}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${st.color}15`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={s.statGlow(st.color)}></div>
                <div style={s.statIconWrap(st.color)}>{st.icon}</div>
                <div style={s.statValue}>
                  <AnimatedNumber value={st.value} prefix={st.prefix || ''} />
                </div>
                <div style={s.statLabel}>{st.label}</div>
                {st.extra && (
                  <div style={s.statChange(parseFloat(st.extra) >= 0)}>
                    {parseFloat(st.extra) >= 0 ? <HiOutlineArrowTrendingUp size={12} /> : <HiOutlineArrowTrendingDown size={12} />}
                    {st.extra}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ─── Revenue & Profit Area Chart ─── */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ ...s.card, animation: 'fadeSlideUp 0.5s ease 0.15s both' }}>
              <div style={s.cardGlow}></div>
              <h3 style={s.cardTitle}><HiOutlineArrowTrendingUp size={18} style={{ color: '#22c55e' }} /> Revenue & Profit Trend</h3>
              <div style={{ position: 'relative', zIndex: 1, height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartMonthly}>
                    <defs>
                      <linearGradient id="gRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="name" tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} />
                    <YAxis tick={{ fill: 'rgba(148,163,184,0.6)', fontSize: 11 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                      tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<DarkTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                    <Area type="monotone" dataKey="Revenue" stroke="#22c55e" strokeWidth={2.5} fill="url(#gRevenue)" animationDuration={1500} animationEasing="ease-out" />
                    <Area type="monotone" dataKey="Profit" stroke="#3b82f6" strokeWidth={2} fill="url(#gProfit)" animationDuration={1800} animationEasing="ease-out" />
                    <Bar dataKey="Sales" fill="rgba(139,92,246,0.3)" barSize={16} radius={[4, 4, 0, 0]} animationDuration={1200} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Donut */}
            <div style={{ ...s.card, animation: 'fadeSlideUp 0.5s ease 0.25s both' }}>
              <div style={s.cardGlow}></div>
              <h3 style={s.cardTitle}><HiOutlineTag size={18} style={{ color: '#f59e0b' }} /> Revenue by Category</h3>
              <div style={{ position: 'relative', zIndex: 1, height: '220px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartCategory} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                      paddingAngle={3} dataKey="value" animationDuration={1200} animationBegin={300}>
                      {chartCategory.map((c, i) => <Cell key={i} fill={c.fill} stroke="transparent" />)}
                    </Pie>
                    <Tooltip content={<DarkTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legend */}
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {chartCategory.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '11px', color: '#94a3b8' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.fill }}></span>
                    {c.name} <span style={{ color: '#60a5fa', fontWeight: '600' }}>({c.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Daily Trend + Monthly Customers/Units ─── */}
          {chartDaily.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
              {/* Daily Revenue */}
              <div style={{ ...s.card, animation: 'fadeSlideUp 0.5s ease 0.3s both' }}>
                <div style={s.cardGlow}></div>
                <h3 style={s.cardTitle}><HiOutlineBolt size={18} style={{ color: '#ec4899' }} /> Daily Revenue</h3>
                <div style={{ position: 'relative', zIndex: 1, height: '260px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartDaily}>
                      <defs>
                        <linearGradient id="gDaily" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="name" tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                        interval={Math.max(0, Math.floor(chartDaily.length / 8))} />
                      <YAxis tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                        tickFormatter={v => `$${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v}`} />
                      <Tooltip content={<DarkTooltip />} />
                      <Area type="monotone" dataKey="Revenue" stroke="#ec4899" strokeWidth={2} fill="url(#gDaily)"
                        dot={false} activeDot={{ r: 4, fill: '#ec4899', stroke: '#000', strokeWidth: 2 }}
                        animationDuration={2000} animationEasing="ease-out" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Units & Customers monthly */}
              <div style={{ ...s.card, animation: 'fadeSlideUp 0.5s ease 0.35s both' }}>
                <div style={s.cardGlow}></div>
                <h3 style={s.cardTitle}><HiOutlineUserGroup size={18} style={{ color: '#06b6d4' }} /> Monthly Units & Customers</h3>
                <div style={{ position: 'relative', zIndex: 1, height: '260px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartMonthly}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="name" tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} />
                      <YAxis tick={{ fill: 'rgba(148,163,184,0.5)', fontSize: 10 }} axisLine={{ stroke: 'rgba(255,255,255,0.06)' }} />
                      <Tooltip content={<DarkTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="Units" fill="#8b5cf6" radius={[4, 4, 0, 0]} animationDuration={1200} />
                      <Bar dataKey="Customers" fill="#06b6d4" radius={[4, 4, 0, 0]} animationDuration={1500} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ─── Top Products + Monthly Table ─── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            {/* Top Products */}
            <div style={{ ...s.card, animation: 'fadeSlideUp 0.5s ease 0.4s both' }}>
              <div style={s.cardGlow}></div>
              <h3 style={s.cardTitle}><HiOutlineFire size={18} style={{ color: '#f59e0b' }} /> Top Selling Products</h3>
              <div style={{ position: 'relative', zIndex: 1 }}>
                {topProducts.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {topProducts.slice(0, 8).map((p, i) => {
                      const maxRev = toNum(topProducts[0]?.TotalRevenue) || 1;
                      const pct = (toNum(p.TotalRevenue) / maxRev) * 100;
                      const isHovered = hoveredProduct === i;
                      return (
                        <div key={i}
                          onMouseEnter={() => setHoveredProduct(i)}
                          onMouseLeave={() => setHoveredProduct(null)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.6rem',
                            padding: '0.5rem 0.65rem', borderRadius: '10px',
                            background: isHovered ? 'rgba(59,130,246,0.06)' : 'transparent',
                            transition: 'all 0.2s ease', cursor: 'default',
                          }}>
                          <span style={s.rankBadge(i + 1)}>{i + 1}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#e2e8f0', fontWeight: '600', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                                  {p.ProductName}
                                </span>
                                <span style={s.productCode}>{p.ProductCode}</span>
                              </div>
                              <span style={{ color: '#4ade80', fontWeight: '700', fontSize: '13px', whiteSpace: 'nowrap' }}>
                                {fmtCurrency(p.TotalRevenue)}
                              </span>
                            </div>
                            <div style={s.progressTrack}>
                              <div style={s.progressBar(animReady ? pct : 0, CHART_COLORS[i % CHART_COLORS.length])}></div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.2rem', fontSize: '11px', color: 'rgba(148,163,184,0.5)' }}>
                              <span>{toNum(p.TotalUnitsSold)} units</span>
                              <span>{toNum(p.NumberOfSales)} sales</span>
                              <span>{p.CategoryName}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(148,163,184,0.4)', fontSize: '13px' }}>No product data</div>
                )}
              </div>
            </div>

            {/* Monthly Breakdown Table */}
            <div style={{ ...s.card, animation: 'fadeSlideUp 0.5s ease 0.45s both' }}>
              <div style={s.cardGlow}></div>
              <h3 style={s.cardTitle}><HiOutlineCalendarDays size={18} style={{ color: '#60a5fa' }} /> Monthly Breakdown</h3>
              <div style={{ position: 'relative', zIndex: 1, overflowX: 'auto' }}>
                <table style={s.table}>
                  <thead>
                    <tr>
                      {['Month', 'Sales', 'Units', 'Revenue', 'Profit'].map(h => (
                        <th key={h} style={s.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyData.map((m, i) => (
                      <tr key={i}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.04)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                        <td style={s.td}>
                          <strong style={{ color: '#e2e8f0' }}>{m.MonthName}</strong>
                          <span style={{ marginLeft: '0.4rem', color: 'rgba(148,163,184,0.5)', fontSize: '11px' }}>{m.SalesYear}</span>
                        </td>
                        <td style={s.td}>{m.TotalSales ?? m.TotalTransactions}</td>
                        <td style={s.td}>{toNum(m.TotalUnitsSold).toLocaleString()}</td>
                        <td style={s.td}><span style={{ color: '#4ade80', fontWeight: '600' }}>{fmtCurrency(m.TotalRevenue)}</span></td>
                        <td style={s.td}><span style={{ color: '#60a5fa', fontWeight: '600' }}>{fmtCurrency(m.TotalProfit)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ─── Demand Insights ─── */}
          <div style={{ ...s.card, animation: 'fadeSlideUp 0.5s ease 0.5s both', marginBottom: '1.25rem' }}>
            <div style={s.cardGlow}></div>
            <h3 style={s.cardTitle}><HiOutlineSparkles size={18} style={{ color: '#f59e0b' }} /> Demand Insights</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', position: 'relative', zIndex: 1 }}>
              {[
                {
                  icon: <HiOutlineArrowTrendingUp size={24} />,
                  title: 'Growth Trend',
                  value: momGrowth !== null ? `${momGrowth > 0 ? '+' : ''}${momGrowth}%` : 'N/A',
                  sub: momGrowth !== null ? (momGrowth > 0 ? 'Month-over-month growth' : 'Revenue stabilizing') : 'Need more data',
                  color: '#22c55e', delay: 0.55,
                },
                {
                  icon: <HiOutlineBolt size={24} />,
                  title: 'Avg Order Value',
                  value: totalTx > 0 ? fmtCurrency(totalRevenue / totalTx) : 'N/A',
                  sub: 'Per transaction average',
                  color: '#3b82f6', delay: 0.6,
                },
                {
                  icon: <HiOutlineArrowPath size={24} />,
                  title: 'Sales Velocity',
                  value: monthlyData.length > 0 ? `${Math.round(totalUnits / monthlyData.length)}` : 'N/A',
                  sub: 'Units/month average',
                  color: '#8b5cf6', delay: 0.65,
                },
                {
                  icon: <HiOutlineTrophy size={24} />,
                  title: 'Best Month',
                  value: maxMonth ? `${(maxMonth.MonthName || '').slice(0, 3)}` : 'N/A',
                  sub: maxMonth ? fmtCurrency(maxMonth.TotalRevenue) : '',
                  color: '#f59e0b', delay: 0.7,
                },
              ].map((ins, i) => (
                <div key={i} style={s.insightCard(ins.color, ins.delay)}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${ins.color}10`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ color: ins.color, marginBottom: '0.5rem' }}>{ins.icon}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '0.2rem' }}>{ins.value}</div>
                  <div style={{ fontWeight: '600', color: '#e2e8f0', fontSize: '13px', marginBottom: '0.2rem' }}>{ins.title}</div>
                  <div style={{ fontSize: '11.5px', color: 'rgba(148,163,184,0.5)' }}>{ins.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Category Performance Detail ─── */}
          {categoryPerformance.length > 0 && (
            <div style={{ ...s.card, animation: 'fadeSlideUp 0.5s ease 0.55s both' }}>
              <div style={s.cardGlow}></div>
              <h3 style={s.cardTitle}><HiOutlineLightBulb size={18} style={{ color: '#14b8a6' }} /> Category Performance</h3>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(categoryPerformance.length, 4)}, 1fr)`, gap: '1rem', position: 'relative', zIndex: 1 }}>
                {categoryPerformance.map((cat, i) => {
                  const color = CHART_COLORS[i % CHART_COLORS.length];
                  return (
                    <div key={i} style={{
                      background: `${color}08`, borderRadius: '14px', padding: '1.25rem',
                      border: `1px solid ${color}15`, transition: 'transform 0.2s ease',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#e2e8f0', marginBottom: '0.5rem' }}>{cat.CategoryName}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '12px', color: 'rgba(148,163,184,0.6)' }}>Revenue</span>
                        <span style={{ fontSize: '13px', fontWeight: '700', color }}>{fmtCurrency(cat.TotalRevenue)}</span>
                      </div>
                      <div style={s.progressTrack}>
                        <div style={s.progressBar(animReady ? toNum(cat.RevenuePercentage) : 0, color)}></div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
                        <div>
                          <div style={{ fontSize: '11px', color: 'rgba(148,163,184,0.5)' }}>Units</div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1' }}>{toNum(cat.TotalUnitsSold).toLocaleString()}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: 'rgba(148,163,184,0.5)' }}>Products</div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1' }}>{toNum(cat.UniqueProductsSold)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: 'rgba(148,163,184,0.5)' }}>Transactions</div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1' }}>{toNum(cat.TotalTransactions)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '11px', color: 'rgba(148,163,184,0.5)' }}>Share</div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color }}>{toNum(cat.RevenuePercentage)}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
