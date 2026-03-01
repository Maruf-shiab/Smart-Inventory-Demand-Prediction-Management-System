'use client';

/**
 * Dead Stock Page
 * ===============
 *
 * Displays products that haven't been sold in 90+ days.
 * Dead stock ties up capital and may need clearance sales.
 *
 * Professional Dark Theme - Matching Dashboard & Products
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HiOutlineExclamationTriangle,
  HiOutlineArrowPath,
  HiOutlineNoSymbol,
  HiOutlineBanknotes,
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowLeft,
  HiOutlineMagnifyingGlass,
  HiOutlineCalendarDays,
  HiOutlineEnvelope,
  HiOutlineCube,
  HiOutlineChevronDown,
} from 'react-icons/hi2';

// ─── Professional Dark Theme Styles ──────────────────────────────
const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    padding: '1.5rem 2rem 2rem',
  },
  // Header
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '1.5rem', padding: '1.5rem 1.75rem',
    background: 'linear-gradient(145deg, rgba(30,41,59,0.8), rgba(15,23,42,0.9))',
    borderRadius: '20px', border: '1px solid rgba(239,68,68,0.15)',
    backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
    background: 'radial-gradient(circle at 30% 30%, rgba(239,68,68,0.08), transparent 40%)',
    pointerEvents: 'none',
  },
  headerLeft: { position: 'relative', zIndex: 1 },
  headerTitle: {
    fontSize: '1.75rem', fontWeight: '700', color: '#fff',
    letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '0.75rem',
  },
  titleIcon: {
    width: '42px', height: '42px',
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(239,68,68,0.4)', color: '#fff',
  },
  headerSub: { color: 'rgba(148,163,184,0.8)', fontSize: '0.9rem', marginTop: '0.35rem' },
  headerActions: {
    display: 'flex', gap: '0.75rem', position: 'relative', zIndex: 1,
  },
  refreshBtn: {
    background: 'rgba(59,130,246,0.15)',
    border: '1px solid rgba(59,130,246,0.25)',
    padding: '0.7rem 1.25rem', borderRadius: '12px',
    color: '#60a5fa', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    transition: 'all 0.2s ease',
  },
  // Stats
  statsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem', marginBottom: '1.25rem',
  },
  statCard: {
    background: 'linear-gradient(145deg, rgba(30,41,59,0.7), rgba(15,23,42,0.85))',
    borderRadius: '16px', padding: '1.25rem 1.35rem',
    border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden',
  },
  statGlow: (color) => ({
    position: 'absolute', top: '-30%', right: '-30%', width: '120%', height: '120%',
    background: `radial-gradient(circle at 80% 20%, ${color}, transparent 50%)`,
    pointerEvents: 'none', opacity: 0.12,
  }),
  statIconWrap: (bg) => ({
    width: '40px', height: '40px', borderRadius: '10px', background: bg,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: '0.5rem', position: 'relative', zIndex: 1,
  }),
  statValue: {
    color: '#fff', fontSize: '1.65rem', fontWeight: '700',
    position: 'relative', zIndex: 1, display: 'block',
  },
  statLabel: {
    color: 'rgba(148,163,184,0.7)', fontSize: '12px', fontWeight: '500',
    textTransform: 'uppercase', letterSpacing: '0.4px',
    position: 'relative', zIndex: 1,
  },
  // Card
  card: {
    background: 'linear-gradient(145deg, rgba(30,41,59,0.7), rgba(15,23,42,0.85))',
    borderRadius: '18px', padding: '1.5rem', marginBottom: '1.25rem',
    border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute', top: '-50%', right: '-50%', width: '200%', height: '200%',
    background: 'radial-gradient(circle at 70% 30%, rgba(239,68,68,0.04), transparent 40%)',
    pointerEvents: 'none',
  },
  cardTitle: {
    color: '#fff', fontSize: '1.05rem', fontWeight: '600',
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    position: 'relative', zIndex: 1, marginBottom: '0.35rem',
  },
  cardSubtitle: {
    color: 'rgba(148,163,184,0.6)', fontSize: '13px',
    position: 'relative', zIndex: 1, marginBottom: '1rem',
  },
  // Filter
  filterWrap: {
    display: 'flex', alignItems: 'center', gap: '1rem',
    position: 'relative', zIndex: 1,
  },
  filterLabel: {
    color: 'rgba(148,163,184,0.8)', fontSize: '14px', fontWeight: '500',
  },
  selectWrap: { position: 'relative' },
  select: {
    appearance: 'none', padding: '0.65rem 2.5rem 0.65rem 1rem',
    fontSize: '14px', borderRadius: '10px',
    border: '1px solid rgba(59,130,246,0.25)',
    background: 'rgba(15,23,42,0.6)', color: '#e2e8f0',
    outline: 'none', cursor: 'pointer', fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  selectIcon: {
    position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
    color: 'rgba(148,163,184,0.5)', pointerEvents: 'none',
  },
  // Search
  searchWrap: { position: 'relative', zIndex: 1 },
  searchIcon: {
    position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)',
    color: 'rgba(148,163,184,0.5)', pointerEvents: 'none',
  },
  searchInput: {
    width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', fontSize: '14px',
    borderRadius: '12px', border: '1px solid rgba(59,130,246,0.2)',
    background: 'rgba(15,23,42,0.6)', color: '#e2e8f0', outline: 'none',
    transition: 'all 0.2s ease',
  },
  resultCount: {
    fontSize: '12px', color: 'rgba(148,163,184,0.5)', marginTop: '0.6rem',
    position: 'relative', zIndex: 1,
  },
  // Table
  tableWrap: { overflowX: 'auto', position: 'relative', zIndex: 1 },
  table: { width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.35rem' },
  th: {
    padding: '0.7rem 0.85rem', fontSize: '11px', fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: '0.6px',
    color: 'rgba(148,163,184,0.6)', textAlign: 'left', whiteSpace: 'nowrap',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  },
  td: {
    padding: '0.8rem 0.85rem', fontSize: '13.5px', color: '#cbd5e1',
    borderBottom: '1px solid rgba(255,255,255,0.03)', whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },
  // Product
  productName: { color: '#e2e8f0', fontWeight: '600', fontSize: '13.5px' },
  productCode: {
    background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)',
    padding: '2px 7px', borderRadius: '4px', fontSize: '10.5px',
    fontFamily: "'SF Mono','Fira Code',monospace", color: '#60a5fa',
  },
  // Badges
  badgeNeverSold: {
    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
    padding: '4px 10px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '600',
    background: 'rgba(239,68,68,0.12)', color: '#f87171',
    border: '1px solid rgba(239,68,68,0.25)',
  },
  badgeDanger: {
    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
    padding: '4px 10px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '600',
    background: 'rgba(239,68,68,0.12)', color: '#f87171',
    border: '1px solid rgba(239,68,68,0.25)',
  },
  badgeWarning: {
    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
    padding: '4px 10px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '600',
    background: 'rgba(245,158,11,0.12)', color: '#fbbf24',
    border: '1px solid rgba(245,158,11,0.25)',
  },
  badgeNeutral: {
    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
    padding: '4px 10px', borderRadius: '20px', fontSize: '11.5px', fontWeight: '600',
    background: 'rgba(100,116,139,0.12)', color: '#94a3b8',
    border: '1px solid rgba(100,116,139,0.25)',
  },
  statusDot: (color) => ({
    width: '6px', height: '6px', borderRadius: '50%',
    background: color, boxShadow: `0 0 6px ${color}80`,
  }),
  // Cost / value
  costDanger: { color: '#f87171', fontWeight: '700', fontSize: '14px' },
  costSuccess: { color: '#4ade80', fontWeight: '600', fontSize: '13.5px' },
  stockUnit: { color: 'rgba(148,163,184,0.5)', fontSize: '12px', fontWeight: '400', marginLeft: '3px' },
  // Recommendation pill
  recoPill: {
    display: 'inline-block', padding: '4px 10px', borderRadius: '8px',
    fontSize: '11.5px', fontWeight: '500', maxWidth: '200px', whiteSpace: 'normal',
    lineHeight: '1.4', background: 'rgba(139,92,246,0.1)', color: '#c4b5fd',
    border: '1px solid rgba(139,92,246,0.2)',
  },
  // Supplier
  supplierName: { color: '#e2e8f0', fontWeight: '500', fontSize: '13px' },
  supplierDetail: {
    color: 'rgba(148,163,184,0.5)', fontSize: '11px',
    display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '2px',
  },
  // Date
  dateText: { color: 'rgba(148,163,184,0.6)', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '0.3rem' },
  // Tips
  tipsTitle: {
    color: '#fff', fontSize: '1rem', fontWeight: '600',
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    position: 'relative', zIndex: 1, marginBottom: '1rem',
  },
  tipsList: {
    listStyle: 'none', padding: 0, margin: 0,
    position: 'relative', zIndex: 1,
  },
  tipItem: {
    display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
    padding: '0.7rem 1rem', marginBottom: '0.5rem',
    background: 'rgba(15,23,42,0.4)', borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.03)',
    transition: 'all 0.2s ease',
  },
  tipDot: (color) => ({
    width: '8px', height: '8px', borderRadius: '50%', marginTop: '6px', flexShrink: 0,
    background: color, boxShadow: `0 0 8px ${color}60`,
  }),
  tipTitle: { color: '#e2e8f0', fontWeight: '600', fontSize: '13.5px' },
  tipDesc: { color: 'rgba(148,163,184,0.6)', fontSize: '12.5px', marginTop: '2px' },
  // Error
  errorAlert: {
    background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(15,23,42,0.9))',
    borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '1.25rem',
    display: 'flex', alignItems: 'center', gap: '0.6rem',
    border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '14px', fontWeight: '500',
  },
  retryBtn: {
    marginLeft: 'auto', padding: '5px 14px', borderRadius: '8px', fontSize: '12px',
    fontWeight: '600', cursor: 'pointer',
    background: 'rgba(239,68,68,0.15)', color: '#f87171',
    border: '1px solid rgba(239,68,68,0.3)',
    display: 'flex', alignItems: 'center', gap: '0.3rem',
  },
  // Empty
  empty: { textAlign: 'center', padding: '3rem 1rem', position: 'relative', zIndex: 1 },
  emptyIconWrap: {
    width: '68px', height: '68px', borderRadius: '18px', margin: '0 auto 1rem',
    background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  emptyTitle: { color: '#e2e8f0', fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.4rem' },
  emptyText: { color: 'rgba(148,163,184,0.6)', fontSize: '14px', marginBottom: '1rem' },
  // Loading
  loadingContainer: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: '80vh', gap: '1.5rem',
    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
  },
  spinner: {
    width: '50px', height: '50px',
    border: '3px solid rgba(239,68,68,0.2)', borderTop: '3px solid #ef4444',
    borderRadius: '50%', animation: 'spin 1s linear infinite',
  },
  // Footer links
  footerLinks: {
    display: 'flex', gap: '0.75rem', position: 'relative', zIndex: 1,
  },
  navBtn: {
    background: 'rgba(59,130,246,0.1)',
    border: '1px solid rgba(59,130,246,0.2)',
    padding: '0.6rem 1.25rem', borderRadius: '10px',
    color: '#60a5fa', fontWeight: '500', fontSize: '13.5px', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
    transition: 'all 0.2s ease', textDecoration: 'none',
  },
  navBtnPrimary: {
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    border: 'none', padding: '0.6rem 1.25rem', borderRadius: '10px',
    color: '#fff', fontWeight: '600', fontSize: '13.5px', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
    transition: 'all 0.2s ease', textDecoration: 'none',
    boxShadow: '0 4px 14px rgba(59,130,246,0.3)',
  },
};

const onFocus = (e) => { e.target.style.borderColor = 'rgba(59,130,246,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'; };
const onBlur  = (e) => { e.target.style.borderColor = 'rgba(59,130,246,0.2)'; e.target.style.boxShadow = 'none'; };

export default function DeadStockPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const [days, setDays] = useState(90);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchDeadStock(); }, [days]);

  async function fetchDeadStock() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/products/dead-stock?days=${days}`);
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      setProducts(result.data || []);
      setSummary(result.summary || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0);
  }

  function getDaysBadge(product) {
    if (product.DaysSinceLastSale === 'Never Sold') return s.badgeNeverSold;
    if (product.DaysSinceLastSaleNum >= 180) return s.badgeDanger;
    return s.badgeWarning;
  }

  function getDaysDotColor(product) {
    if (product.DaysSinceLastSale === 'Never Sold') return '#f87171';
    if (product.DaysSinceLastSaleNum >= 180) return '#f87171';
    return '#fbbf24';
  }

  const filteredProducts = products.filter(product =>
    product.ProductName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.ProductCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.CategoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.SupplierName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading
  if (loading) {
    return (
      <div style={s.loadingContainer}>
        <div style={s.spinner}></div>
        <span style={{ color: 'rgba(148,163,184,0.8)', fontSize: '15px', fontWeight: '500' }}>
          Analyzing stock movement...
        </span>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div style={s.page}>
        <div style={s.errorAlert}>
          <HiOutlineExclamationTriangle size={18} />
          <span>Error: {error}</span>
          <button onClick={fetchDeadStock} style={s.retryBtn}>
            <HiOutlineArrowPath size={14} /> Retry
          </button>
        </div>
      </div>
    );
  }

  const statItems = summary ? [
    { label: 'Dead Stock Items', value: summary.totalDeadStockProducts, icon: HiOutlineNoSymbol, color: '#f87171', bg: 'rgba(239,68,68,0.15)' },
    { label: 'Never Sold', value: summary.neverSoldCount, icon: HiOutlineExclamationTriangle, color: '#fbbf24', bg: 'rgba(245,158,11,0.15)' },
    { label: 'Capital Tied Up', value: formatCurrency(summary.totalDeadStockValue), icon: HiOutlineBanknotes, color: '#f87171', bg: 'rgba(239,68,68,0.15)' },
    { label: 'Potential Revenue', value: formatCurrency(summary.potentialRevenueAtFullPrice), icon: HiOutlineArrowTrendingUp, color: '#60a5fa', bg: 'rgba(59,130,246,0.15)' },
  ] : [];

  const tips = [
    { title: 'Run promotional campaigns', desc: 'Offer discounts to move slow-moving items', color: '#60a5fa' },
    { title: 'Bundle with popular products', desc: 'Create package deals to boost sales', color: '#c084fc' },
    { title: 'Contact supplier for returns', desc: 'Some suppliers accept returns for credit', color: '#4ade80' },
    { title: 'Donate for tax benefits', desc: 'Consider charitable donations for write-offs', color: '#fbbf24' },
    { title: 'Write off and dispose', desc: 'Last resort for unsellable items', color: '#f87171' },
  ];

  return (
    <div style={s.page}>
      {/* ─── Header ─── */}
      <div style={s.header}>
        <div style={s.headerGlow}></div>
        <div style={s.headerLeft}>
          <h1 style={s.headerTitle}>
            <span style={s.titleIcon}><HiOutlineNoSymbol size={22} /></span>
            Dead Stock Analysis
          </h1>
          <p style={s.headerSub}>Products with no sales in {days}+ days</p>
        </div>
        <div style={s.headerActions}>
          <button style={s.refreshBtn} onClick={fetchDeadStock}>
            <HiOutlineArrowPath size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* ─── Filter ─── */}
      <div style={s.card}>
        <div style={s.cardGlow}></div>
        <div style={s.filterWrap}>
          <span style={s.filterLabel}>Show products with no sales in:</span>
          <div style={s.selectWrap}>
            <select
              style={s.select}
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              onFocus={onFocus} onBlur={onBlur}
            >
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
              <option value={120}>120 days</option>
              <option value={180}>180 days</option>
              <option value={365}>365 days</option>
            </select>
            <HiOutlineChevronDown size={14} style={s.selectIcon} />
          </div>
        </div>
      </div>

      {/* ─── Stats ─── */}
      {summary && (
        <div style={s.statsGrid}>
          {statItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={s.statCard}>
                <div style={s.statGlow(item.color)}></div>
                <div style={s.statIconWrap(item.bg)}>
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <span style={s.statValue}>{item.value}</span>
                <span style={s.statLabel}>{item.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Search ─── */}
      <div style={s.card}>
        <div style={s.cardGlow}></div>
        <div style={s.searchWrap}>
          <HiOutlineMagnifyingGlass size={16} style={s.searchIcon} />
          <input
            type="text"
            placeholder="Search by product name, code, category, or supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={onFocus} onBlur={onBlur}
            style={s.searchInput}
          />
        </div>
        <div style={s.resultCount}>
          Showing {filteredProducts.length} of {products.length} dead stock products
        </div>
      </div>

      {/* ─── Dead Stock Table ─── */}
      <div style={s.card}>
        <div style={s.cardGlow}></div>
        <h2 style={s.cardTitle}>
          <HiOutlineNoSymbol size={18} style={{ color: '#f87171' }} />
          Dead Stock Products
        </h2>
        <p style={s.cardSubtitle}>Consider clearance sales or returns</p>

        {filteredProducts.length > 0 ? (
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>
                  {['Product', 'Category', 'Stock', 'Cost Value', 'Last Sale', 'Days Since Sale', 'Recommendation', 'Supplier'].map(h => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.ProductID}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    {/* Product */}
                    <td style={s.td}>
                      <div style={s.productName}>{product.ProductName}</div>
                      <span style={s.productCode}>{product.ProductCode}</span>
                    </td>
                    {/* Category */}
                    <td style={s.td}>{product.CategoryName}</td>
                    {/* Stock */}
                    <td style={s.td}>
                      <span style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '14px' }}>
                        {product.CurrentStock}
                      </span>
                      <span style={s.stockUnit}>units</span>
                    </td>
                    {/* Cost Value */}
                    <td style={s.td}>
                      <span style={s.costDanger}>{formatCurrency(product.DeadStockValue)}</span>
                    </td>
                    {/* Last Sale */}
                    <td style={s.td}>
                      {product.LastSaleDate ? (
                        <span style={s.dateText}>
                          <HiOutlineCalendarDays size={13} />
                          {new Date(product.LastSaleDate).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric'
                          })}
                        </span>
                      ) : (
                        <span style={s.badgeNeutral}>
                          <span style={s.statusDot('#94a3b8')}></span>
                          Never
                        </span>
                      )}
                    </td>
                    {/* Days Since Sale */}
                    <td style={s.td}>
                      <span style={getDaysBadge(product)}>
                        <span style={s.statusDot(getDaysDotColor(product))}></span>
                        {product.DaysSinceLastSale}
                      </span>
                    </td>
                    {/* Recommendation */}
                    <td style={{ ...s.td, whiteSpace: 'normal' }}>
                      <span style={s.recoPill}>{product.Recommendation}</span>
                    </td>
                    {/* Supplier */}
                    <td style={s.td}>
                      <div style={s.supplierName}>{product.SupplierName}</div>
                      {product.SupplierEmail && (
                        <div style={s.supplierDetail}>
                          <HiOutlineEnvelope size={11} /> {product.SupplierEmail}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={s.empty}>
            <div style={s.emptyIconWrap}>
              <HiOutlineSparkles size={30} style={{ color: '#4ade80' }} />
            </div>
            <h3 style={s.emptyTitle}>
              {searchTerm ? 'No matching products' : 'No dead stock!'}
            </h3>
            <p style={s.emptyText}>
              {searchTerm
                ? 'Try adjusting your search terms'
                : `All products have been sold within the last ${days} days.`}
            </p>
          </div>
        )}
      </div>

      {/* ─── Tips Card ─── */}
      <div style={s.card}>
        <div style={s.cardGlow}></div>
        <h3 style={s.tipsTitle}>
          <HiOutlineLightBulb size={20} style={{ color: '#fbbf24' }} />
          Tips for Managing Dead Stock
        </h3>
        <ul style={s.tipsList}>
          {tips.map((tip, i) => (
            <li key={i} style={s.tipItem}>
              <span style={s.tipDot(tip.color)}></span>
              <div>
                <div style={s.tipTitle}>{tip.title}</div>
                <div style={s.tipDesc}>{tip.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ─── Footer Navigation ─── */}
      <div style={s.card}>
        <div style={s.cardGlow}></div>
        <div style={s.footerLinks}>
          <Link href="/alerts" style={s.navBtn}>
            <HiOutlineArrowLeft size={14} /> Back to Alerts
          </Link>
          <Link href="/analytics/sales" style={s.navBtnPrimary}>
            <HiOutlineArrowTrendingUp size={14} /> View Sales Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}
