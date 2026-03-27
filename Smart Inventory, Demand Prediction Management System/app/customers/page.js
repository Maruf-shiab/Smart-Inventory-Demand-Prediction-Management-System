'use client';

/**
 * Customers Page
 * ==============
 *
 * View and manage customers with purchase history.
 * Professional Dark Theme
 */

import React, { useState, useEffect } from 'react';
import {
  HiOutlineUserGroup, HiOutlineXMark, HiOutlinePlusCircle,
  HiOutlineExclamationTriangle, HiOutlineBanknotes, HiOutlineShoppingCart,
  HiOutlineDocumentText, HiOutlineMagnifyingGlass, HiOutlineArrowPath,
  HiOutlineChevronDown, HiOutlineChevronRight, HiOutlineMapPin,
  HiOutlineEnvelope, HiOutlinePhone, HiOutlineCalendarDays, HiOutlineCube,
} from 'react-icons/hi2';

/* ───────── inline dark styles ───────── */
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
    borderRadius: '20px', border: '1px solid rgba(59,130,246,0.15)',
    backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
    background: 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.08), transparent 40%)',
    pointerEvents: 'none',
  },
  headerLeft: { position: 'relative', zIndex: 1 },
  headerTitle: {
    fontSize: '1.75rem', fontWeight: '700', color: '#fff',
    letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '0.75rem',
  },
  titleIcon: {
    width: '42px', height: '42px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(59,130,246,0.4)', color: '#fff',
  },
  headerSub: { color: 'rgba(148,163,184,0.8)', fontSize: '0.9rem', marginTop: '0.35rem' },
  headerActions: { display: 'flex', gap: '0.75rem', position: 'relative', zIndex: 1 },
  refreshBtn: {
    background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)',
    padding: '0.7rem 1.25rem', borderRadius: '12px',
    color: '#60a5fa', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s ease',
  },
  addBtn: {
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    border: 'none', padding: '0.7rem 1.35rem', borderRadius: '12px',
    color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    boxShadow: '0 4px 16px rgba(59,130,246,0.35)', transition: 'all 0.2s ease',
  },
  cancelBtn: {
    background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)',
    padding: '0.7rem 1.25rem', borderRadius: '12px',
    color: '#f87171', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s ease',
  },
  /* stat cards */
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.25rem' },
  statCard: {
    background: 'linear-gradient(145deg, rgba(30,41,59,0.7), rgba(15,23,42,0.85))',
    borderRadius: '16px', padding: '1.25rem 1.35rem',
    border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden',
  },
  statGlow: {
    position: 'absolute', top: '-30%', right: '-30%', width: '110px', height: '110px',
    borderRadius: '50%', pointerEvents: 'none', filter: 'blur(30px)', opacity: 0.5,
  },
  statIconWrap: {
    width: '38px', height: '38px', borderRadius: '10px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.65rem',
  },
  statValue: { fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '0.15rem' },
  statLabel: { fontSize: '0.78rem', color: 'rgba(148,163,184,0.7)', fontWeight: '500' },
  /* search bar */
  searchWrap: {
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    marginBottom: '1.25rem', padding: '0.85rem 1.25rem',
    background: 'linear-gradient(145deg, rgba(30,41,59,0.6), rgba(15,23,42,0.75))',
    borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)',
  },
  searchIcon: { color: 'rgba(148,163,184,0.5)' },
  searchInput: {
    flex: 1, background: 'transparent', border: 'none', outline: 'none',
    color: '#e2e8f0', fontSize: '0.95rem',
  },
  searchCount: { color: 'rgba(148,163,184,0.5)', fontSize: '0.8rem', whiteSpace: 'nowrap' },
  /* form card */
  formCard: {
    marginBottom: '1.25rem', padding: '1.5rem 1.75rem',
    background: 'linear-gradient(145deg, rgba(30,41,59,0.75), rgba(15,23,42,0.9))',
    borderRadius: '18px', border: '1px solid rgba(59,130,246,0.15)',
    backdropFilter: 'blur(20px)',
  },
  formTitle: { fontSize: '1.1rem', fontWeight: '700', color: '#fff', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  formGroup: { marginBottom: '0.25rem' },
  formLabel: { display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'rgba(148,163,184,0.85)', marginBottom: '0.35rem' },
  formInput: {
    width: '100%', padding: '0.7rem 1rem',
    background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px', color: '#e2e8f0', fontSize: '0.92rem', outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  submitBtn: {
    marginTop: '1rem',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    border: 'none', padding: '0.7rem 1.75rem', borderRadius: '12px',
    color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(59,130,246,0.35)',
  },
  /* table card */
  tableCard: {
    background: 'linear-gradient(145deg, rgba(30,41,59,0.6), rgba(15,23,42,0.75))',
    borderRadius: '18px', border: '1px solid rgba(255,255,255,0.06)',
    overflow: 'hidden', backdropFilter: 'blur(16px)',
  },
  table: { width: '100%', borderCollapse: 'separate', borderSpacing: 0 },
  th: {
    padding: '0.85rem 1rem', textAlign: 'left',
    fontSize: '0.75rem', fontWeight: '600', color: 'rgba(148,163,184,0.7)',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(15,23,42,0.5)',
  },
  td: {
    padding: '0.85rem 1rem', fontSize: '0.88rem', color: '#cbd5e1',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  },
  rowHover: { cursor: 'pointer', transition: 'background 0.2s ease' },
  /* badges */
  badge: {
    padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600',
  },
  badgeBlue: { background: 'rgba(59,130,246,0.15)', color: '#60a5fa' },
  badgeGreen: { background: 'rgba(16,185,129,0.15)', color: '#34d399' },
  badgePurple: { background: 'rgba(139,92,246,0.15)', color: '#a78bfa' },
  /* expanded row */
  expandedWrap: {
    padding: '1.25rem 1.5rem 1.25rem 3.5rem',
    background: 'rgba(15,23,42,0.65)',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
  },
  detailGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem',
    marginBottom: '1.25rem', padding: '1rem 1.25rem',
    background: 'rgba(30,41,59,0.5)', borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  detailLabel: { fontSize: '0.72rem', color: 'rgba(148,163,184,0.6)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.2rem' },
  detailValue: { fontSize: '0.88rem', color: '#e2e8f0', fontWeight: '500' },
  historyTitle: {
    fontSize: '0.9rem', fontWeight: '600', color: '#e2e8f0',
    marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
  },
  innerTable: { width: '100%', borderCollapse: 'separate', borderSpacing: 0 },
  innerTh: {
    padding: '0.65rem 0.85rem', textAlign: 'left',
    fontSize: '0.7rem', fontWeight: '600', color: 'rgba(148,163,184,0.6)',
    textTransform: 'uppercase', letterSpacing: '0.04em',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: 'rgba(15,23,42,0.4)',
  },
  innerTd: {
    padding: '0.65rem 0.85rem', fontSize: '0.82rem', color: '#cbd5e1',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
  },
  invoiceCode: {
    background: 'rgba(59,130,246,0.12)', padding: '2px 8px',
    borderRadius: '6px', fontSize: '0.72rem', fontFamily: 'monospace', color: '#60a5fa',
  },
  /* empty state */
  emptyState: {
    padding: '4rem 2rem', textAlign: 'center',
  },
  emptyIcon: {
    width: '64px', height: '64px', margin: '0 auto 1rem',
    background: 'rgba(59,130,246,0.1)', borderRadius: '16px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa',
  },
  emptyTitle: { color: '#e2e8f0', fontWeight: '600', fontSize: '1.1rem', marginBottom: '0.35rem' },
  emptySub: { color: 'rgba(148,163,184,0.6)', fontSize: '0.88rem' },
  /* error */
  errorBar: {
    display: 'flex', alignItems: 'center', gap: '0.6rem',
    padding: '0.85rem 1.25rem', marginBottom: '1rem',
    background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: '12px', color: '#f87171', fontSize: '0.88rem',
  },
  /* loading */
  loadingWrap: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    gap: '1rem', color: '#60a5fa',
  },
  spinner: {
    width: '40px', height: '40px', border: '3px solid rgba(59,130,246,0.2)',
    borderTopColor: '#3b82f6', borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

const statThemes = [
  { bg: 'rgba(59,130,246,0.15)', glow: 'rgba(59,130,246,0.35)', color: '#60a5fa' },
  { bg: 'rgba(16,185,129,0.15)', glow: 'rgba(16,185,129,0.35)', color: '#34d399' },
  { bg: 'rgba(139,92,246,0.15)', glow: 'rgba(139,92,246,0.35)', color: '#a78bfa' },
  { bg: 'rgba(245,158,11,0.15)', glow: 'rgba(245,158,11,0.35)', color: '#fbbf24' },
];

/* ───────── component ───────── */
export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [minSpent, setMinSpent] = useState('');
  const [maxSpent, setMaxSpent] = useState('');
  const [minOrders, setMinOrders] = useState('');
  const [maxOrders, setMaxOrders] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [formData, setFormData] = useState({
    customerName: '', email: '', phone: '', address: '', city: '', country: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    let count = 0;
    if (filterCity) count++;
    if (filterCountry) count++;
    if (minSpent) count++;
    if (maxSpent) count++;
    if (minOrders) count++;
    if (maxOrders) count++;
    setActiveFiltersCount(count);
  }, [filterCity, filterCountry, minSpent, maxSpent, minOrders, maxOrders]);

  async function fetchCustomers() {
    try {
      setLoading(true);
      const response = await fetch('/api/customers');
      const result = await response.json();
      if (result.success) setCustomers(result.data || []);
      else throw new Error(result.message);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true); setError(null);
    try {
      const response = await fetch('/api/customers', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setFormData({ customerName: '', email: '', phone: '', address: '', city: '', country: '' });
        setShowForm(false); fetchCustomers();
      } else throw new Error(result.message);
    } catch (err) { setError(err.message); } finally { setSubmitting(false); }
  }

  const getUniqueCities = () => [...new Set(customers.map(c => c.City).filter(Boolean))].sort();
  const getUniqueCountries = () => [...new Set(customers.map(c => c.Country).filter(Boolean))].sort();

  const clearFilters = () => {
    setFilterCity('');
    setFilterCountry('');
    setMinSpent('');
    setMaxSpent('');
    setMinOrders('');
    setMaxOrders('');
  };

  const filtered = customers.filter(c => {
    const q = search.toLowerCase();
    const matchesSearch = !search || 
      (c.CustomerName || '').toLowerCase().includes(q) ||
      (c.Email || '').toLowerCase().includes(q) ||
      (c.Phone || '').toLowerCase().includes(q) ||
      (c.City || '').toLowerCase().includes(q) ||
      (c.Country || '').toLowerCase().includes(q);
    
    const matchesCity = !filterCity || (c.City || '').toLowerCase() === filterCity.toLowerCase();
    const matchesCountry = !filterCountry || (c.Country || '').toLowerCase() === filterCountry.toLowerCase();
    
    const spent = parseFloat(c.TotalSpent) || 0;
    const matchesSpent = (!minSpent || spent >= +minSpent) && (!maxSpent || spent <= +maxSpent);
    
    const orders = parseInt(c.TotalOrders) || 0;
    const matchesOrders = (!minOrders || orders >= +minOrders) && (!maxOrders || orders <= +maxOrders);
    
    return matchesSearch && matchesCity && matchesCountry && matchesSpent && matchesOrders;
  });

  const totalRevenue = customers.reduce((sum, c) => sum + parseFloat(c.TotalSpent || 0), 0);
  const totalOrders = customers.reduce((sum, c) => sum + parseInt(c.TotalOrders || 0), 0);
  const avgSpend = customers.length ? totalRevenue / customers.length : 0;

  if (loading) {
    return (
      <div style={s.loadingWrap}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div style={s.spinner}></div>
        <span style={{ fontSize: '0.95rem' }}>Loading customers...</span>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* ── Header ── */}
      <div style={s.header}>
        <div style={s.headerGlow} />
        <div style={s.headerLeft}>
          <h1 style={s.headerTitle}>
            <span style={s.titleIcon}><HiOutlineUserGroup size={22} /></span>
            Customers
          </h1>
          <p style={s.headerSub}>Manage your customer base &amp; purchase history</p>
        </div>
        <div style={s.headerActions}>
          <button style={s.refreshBtn} onClick={() => fetchCustomers()} title="Refresh">
            <HiOutlineArrowPath size={16} /> Refresh
          </button>
          {showForm ? (
            <button style={s.cancelBtn} onClick={() => setShowForm(false)}>
              <HiOutlineXMark size={16} /> Cancel
            </button>
          ) : (
            <button style={s.addBtn} onClick={() => setShowForm(true)}>
              <HiOutlinePlusCircle size={16} /> Add Customer
            </button>
          )}
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div style={s.errorBar}>
          <HiOutlineExclamationTriangle size={16} /> {error}
        </div>
      )}

      {/* ── Add Customer Form ── */}
      {showForm && (
        <div style={s.formCard}>
          <h3 style={s.formTitle}><HiOutlinePlusCircle size={18} /> Add New Customer</h3>
          <form onSubmit={handleSubmit}>
            <div style={s.formGrid}>
              {[
                { label: 'Customer Name *', name: 'customerName', type: 'text', required: true },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Phone', name: 'phone', type: 'text' },
                { label: 'City', name: 'city', type: 'text' },
                { label: 'Country', name: 'country', type: 'text' },
                { label: 'Address', name: 'address', type: 'text' },
              ].map(f => (
                <div key={f.name} style={s.formGroup}>
                  <label style={s.formLabel}>{f.label}</label>
                  <input
                    type={f.type} name={f.name} required={f.required}
                    value={formData[f.name]} onChange={handleChange}
                    style={s.formInput}
                    onFocus={e => (e.target.style.borderColor = 'rgba(59,130,246,0.5)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                    placeholder={f.label.replace(' *', '')}
                  />
                </div>
              ))}
            </div>
            <button type="submit" style={{ ...s.submitBtn, opacity: submitting ? 0.6 : 1 }} disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Customer'}
            </button>
          </form>
        </div>
      )}

      {/* ── Stats ── */}
      <div style={s.statsGrid}>
        {[
          { icon: <HiOutlineUserGroup size={20} />, value: customers.length, label: 'Total Customers', theme: 0 },
          { icon: <HiOutlineBanknotes size={20} />, value: formatCurrency(totalRevenue), label: 'Total Revenue', theme: 1 },
          { icon: <HiOutlineShoppingCart size={20} />, value: totalOrders, label: 'Total Orders', theme: 2 },
          { icon: <HiOutlineBanknotes size={20} />, value: formatCurrency(avgSpend), label: 'Avg Spend / Customer', theme: 3 },
        ].map((st, i) => (
          <div key={i} style={s.statCard}>
            <div style={{ ...s.statGlow, background: statThemes[st.theme].glow }} />
            <div style={{ ...s.statIconWrap, background: statThemes[st.theme].bg }}>
              <span style={{ color: statThemes[st.theme].color }}>{st.icon}</span>
            </div>
            <div style={s.statValue}>{st.value}</div>
            <div style={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* ── Search & Filter Toggle ── */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ ...s.searchWrap, flex: 1 }}>
          <HiOutlineMagnifyingGlass size={18} style={s.searchIcon} />
          <input
            style={s.searchInput} placeholder="Search customers by name, email, phone, city..."
            value={search} onChange={e => setSearch(e.target.value)}
          />
          <span style={s.searchCount}>{filtered.length} of {customers.length}</span>
        </div>
        <button onClick={() => setShowFilters(!showFilters)} style={{
          padding: '0.75rem 1.25rem', borderRadius: 14,
          border: showFilters ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.08)',
          background: showFilters ? 'rgba(139,92,246,0.15)' : 'rgba(15,23,42,0.6)',
          color: showFilters ? '#c4b5fd' : 'rgba(148,163,184,0.6)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 13, fontWeight: 600, transition: 'all 0.3s ease',
          position: 'relative',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'; e.currentTarget.style.color = '#c4b5fd'; }}
          onMouseLeave={e => { if (!showFilters) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(148,163,184,0.6)'; } }}
        >
          🔍 Filters
          {activeFiltersCount > 0 && (
            <span style={{
              position: 'absolute', top: -6, right: -6,
              width: 20, height: 20, borderRadius: '50%',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              color: '#fff', fontSize: 10, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'fadeInScale 0.3s ease-out',
              boxShadow: '0 2px 8px rgba(139,92,246,0.4)',
            }}>
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* ── Filters Panel ── */}
      <div style={{
        maxHeight: showFilters ? 400 : 0,
        opacity: showFilters ? 1 : 0,
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        marginBottom: showFilters ? '1.5rem' : 0,
      }}>
        <div style={{
          background: 'linear-gradient(145deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.5) 100%)',
          borderRadius: 20, border: '1px solid rgba(139,92,246,0.15)',
          backdropFilter: 'blur(30px)', overflow: 'hidden',
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem', padding: '1.5rem',
          }}>
            <FilterGroup label="🏙️ City">
              <select value={filterCity} onChange={e => setFilterCity(e.target.value)}
                style={filterSelectStyle}>
                <option value="">All Cities</option>
                {getUniqueCities().map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FilterGroup>
            <FilterGroup label="🌍 Country">
              <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)}
                style={filterSelectStyle}>
                <option value="">All Countries</option>
                {getUniqueCountries().map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FilterGroup>
            <FilterGroup label="💰 Total Spent Range">
              <RangeInputs v1={minSpent} v2={maxSpent} s1={setMinSpent} s2={setMaxSpent} step="0.01" />
            </FilterGroup>
            <FilterGroup label="📊 Total Orders Range">
              <RangeInputs v1={minOrders} v2={maxOrders} s1={setMinOrders} s2={setMaxOrders} />
            </FilterGroup>
          </div>

          {/* Filter actions */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1rem 1.5rem',
            borderTop: '1px solid rgba(139,92,246,0.1)',
            background: 'rgba(15,23,42,0.3)',
          }}>
            <button onClick={clearFilters} style={{
              padding: '0.6rem 1.25rem', borderRadius: 10,
              border: '1px solid rgba(239,68,68,0.25)',
              background: 'rgba(239,68,68,0.08)', color: '#fca5a5',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              ✕ Clear All
            </button>
            <div style={{
              fontSize: 12, color: 'rgba(148,163,184,0.7)', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '0.5rem 0.85rem', borderRadius: 10,
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.15)',
            }}>
              👁️ Showing {filtered.length} of {customers.length}
            </div>
          </div>
        </div>
      </div>

      {/* ── Customers Table ── */}
      <div style={s.tableCard}>
        {filtered.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={s.table}>
              <thead>
                <tr>
                  {['', 'ID', 'Name', 'Contact', 'Location', 'Orders', 'Items', 'Total Spent', 'Last Purchase'].map(h => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(customer => {
                  const isExp = expandedCustomer === customer.CustomerID;
                  return (
                    <React.Fragment key={customer.CustomerID}>
                      <tr
                        style={{
                          ...s.rowHover,
                          background: isExp ? 'rgba(59,130,246,0.06)' : 'transparent',
                        }}
                        onClick={() => setExpandedCustomer(isExp ? null : customer.CustomerID)}
                        onMouseEnter={e => { if (!isExp) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                        onMouseLeave={e => { if (!isExp) e.currentTarget.style.background = 'transparent'; }}
                      >
                        <td style={{ ...s.td, width: '40px', color: '#60a5fa' }}>
                          {isExp ? <HiOutlineChevronDown size={14} /> : <HiOutlineChevronRight size={14} />}
                        </td>
                        <td style={s.td}>
                          <span style={{ ...s.badge, ...s.badgePurple }}>#{customer.CustomerID}</span>
                        </td>
                        <td style={s.td}>
                          <span style={{ color: '#fff', fontWeight: '600' }}>{customer.CustomerName}</span>
                        </td>
                        <td style={s.td}>
                          {customer.Email && (
                            <div style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <HiOutlineEnvelope size={13} style={{ color: 'rgba(148,163,184,0.5)' }} /> {customer.Email}
                            </div>
                          )}
                          {customer.Phone && (
                            <div style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                              <HiOutlinePhone size={13} style={{ color: 'rgba(148,163,184,0.5)' }} /> {customer.Phone}
                            </div>
                          )}
                          {!customer.Email && !customer.Phone && <span style={{ color: 'rgba(148,163,184,0.4)' }}>—</span>}
                        </td>
                        <td style={s.td}>
                          {customer.City || customer.Country ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <HiOutlineMapPin size={13} style={{ color: 'rgba(148,163,184,0.5)' }} />
                              {[customer.City, customer.Country].filter(Boolean).join(', ')}
                            </span>
                          ) : <span style={{ color: 'rgba(148,163,184,0.4)' }}>—</span>}
                        </td>
                        <td style={s.td}>
                          <span style={{ ...s.badge, ...s.badgeBlue }}>{customer.TotalOrders || 0}</span>
                        </td>
                        <td style={s.td}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <HiOutlineCube size={13} style={{ color: 'rgba(148,163,184,0.5)' }} />
                            {customer.TotalItemsBought || 0}
                          </span>
                        </td>
                        <td style={s.td}>
                          <span style={{ color: '#34d399', fontWeight: '600' }}>
                            {formatCurrency(customer.TotalSpent)}
                          </span>
                        </td>
                        <td style={s.td}>
                          {customer.LastPurchaseDate ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}>
                              <HiOutlineCalendarDays size={13} style={{ color: 'rgba(148,163,184,0.5)' }} />
                              {new Date(customer.LastPurchaseDate).toLocaleDateString()}
                            </span>
                          ) : (
                            <span style={{ color: 'rgba(148,163,184,0.4)', fontSize: '0.82rem' }}>Never</span>
                          )}
                        </td>
                      </tr>

                      {/* ── Expanded Details ── */}
                      {isExp && (
                        <tr>
                          <td colSpan="9" style={{ padding: 0 }}>
                            <div style={s.expandedWrap}>
                              {/* Detail grid */}
                              <div style={s.detailGrid}>
                                {[
                                  { label: 'Address', value: customer.Address },
                                  { label: 'City', value: customer.City },
                                  { label: 'Country', value: customer.Country },
                                  { label: 'Customer Since', value: customer.CreatedAt ? new Date(customer.CreatedAt).toLocaleDateString() : '—' },
                                ].map((d, i) => (
                                  <div key={i}>
                                    <div style={s.detailLabel}>{d.label}</div>
                                    <div style={s.detailValue}>{d.value || '—'}</div>
                                  </div>
                                ))}
                              </div>

                              {/* Purchase history */}
                              <div style={s.historyTitle}>
                                <HiOutlineDocumentText size={16} style={{ color: '#60a5fa' }} /> Purchase History
                              </div>
                              {customer.purchaseHistory && customer.purchaseHistory.length > 0 ? (
                                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                                  <table style={s.innerTable}>
                                    <thead>
                                      <tr>
                                        {['Invoice', 'Date', 'Product', 'Qty', 'Unit Price', 'Total', 'Warehouse'].map(h => (
                                          <th key={h} style={s.innerTh}>{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {customer.purchaseHistory.map((item, idx) => (
                                        <tr key={idx}>
                                          <td style={s.innerTd}>
                                            <span style={s.invoiceCode}>{item.InvoiceNumber}</span>
                                          </td>
                                          <td style={s.innerTd}>{new Date(item.SaleDate).toLocaleDateString()}</td>
                                          <td style={s.innerTd}>
                                            <span style={{ color: '#e2e8f0', fontWeight: '500' }}>{item.ProductName}</span>
                                            <div style={{ fontSize: '0.72rem', color: 'rgba(148,163,184,0.5)' }}>{item.ProductCode}</div>
                                          </td>
                                          <td style={s.innerTd}>{item.Quantity}</td>
                                          <td style={s.innerTd}>{formatCurrency(item.UnitPrice)}</td>
                                          <td style={{ ...s.innerTd, color: '#34d399', fontWeight: '600' }}>{formatCurrency(item.LineTotal)}</td>
                                          <td style={{ ...s.innerTd, fontSize: '0.78rem' }}>{item.WarehouseName}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <div style={{
                                  padding: '1.5rem', textAlign: 'center',
                                  color: 'rgba(148,163,184,0.5)',
                                  background: 'rgba(30,41,59,0.4)', borderRadius: '12px',
                                }}>
                                  No purchases yet
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={s.emptyState}>
            <div style={s.emptyIcon}><HiOutlineUserGroup size={28} /></div>
            <div style={s.emptyTitle}>{search ? 'No matching customers' : 'No customers yet'}</div>
            <div style={s.emptySub}>{search ? 'Try adjusting your search query' : 'Add your first customer to get started'}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0);
}

function FilterGroup({ label, children }) {
  return (
    <div style={{
      animation: 'fadeInUp 0.5s ease-out',
    }}>
      <label style={{
        fontSize: 11, fontWeight: 700, color: '#94a3b8',
        textTransform: 'uppercase', letterSpacing: '0.5px',
      }}>{label}</label>
      {children}
    </div>
  );
}

function RangeInputs({ v1, v2, s1, s2, step }) {
  const inputStyle = {
    flex: 1, padding: '0.6rem 0.75rem', borderRadius: 10,
    border: '1.5px solid rgba(59,130,246,0.15)',
    background: 'rgba(15,23,42,0.7)', color: '#e2e8f0',
    fontSize: 12, outline: 'none', transition: 'all 0.3s ease',
    fontFamily: 'inherit', minWidth: 0,
  };
  const focusHandler = (e) => {
    e.target.style.borderColor = 'rgba(59,130,246,0.5)';
    e.target.style.boxShadow = '0 0 12px rgba(59,130,246,0.15)';
  };
  const blurHandler = (e) => {
    e.target.style.borderColor = 'rgba(59,130,246,0.15)';
    e.target.style.boxShadow = 'none';
  };
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', width: '100%' }}>
      <input type="number" placeholder="Min" value={v1} onChange={e => s1(e.target.value)}
        style={inputStyle} min="0" step={step}
        onFocus={focusHandler} onBlur={blurHandler} />
      <span style={{ color: 'rgba(148,163,184,0.4)', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>→</span>
      <input type="number" placeholder="Max" value={v2} onChange={e => s2(e.target.value)}
        style={inputStyle} min="0" step={step}
        onFocus={focusHandler} onBlur={blurHandler} />
    </div>
  );
}

const filterSelectStyle = {
  width: '100%', padding: '0.6rem 2.2rem 0.6rem 0.8rem', borderRadius: 10,
  border: '1.5px solid rgba(59,130,246,0.15)',
  background: 'rgba(15,23,42,0.7)', color: '#e2e8f0',
  fontSize: 13, outline: 'none', cursor: 'pointer',
  fontFamily: 'inherit', transition: 'all 0.3s ease',
  appearance: 'none',
  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath fill=\'%2394a3b8\' d=\'M1 1l5 5 5-5\'/%3E%3C/svg%3E")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.8rem center',
  boxSizing: 'border-box',
};
