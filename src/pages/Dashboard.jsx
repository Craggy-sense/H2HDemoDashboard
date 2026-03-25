import React, { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale,
  PointElement, LineElement,
  Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// ─── Static mock data matching the Netlify demo ───────────────────────────────
const INITIAL_TRANSACTIONS = [
  { id: 217, ref: 'H2H-000217', time: '10:58:12', type: 'EFT', amount: '45,000', status: 'Success' },
  { id: 216, ref: 'H2H-000216', time: '10:55:04', type: 'EFT', amount: '120,500', status: 'Failed' },
  { id: 215, ref: 'H2H-000215', time: '10:52:30', type: 'RTGS', amount: '2,300,000', status: 'Success' },
  { id: 214, ref: 'H2H-000214', time: '10:48:15', type: 'EFT', amount: '8,750', status: 'Success' },
  { id: 213, ref: 'H2H-000213', time: '10:45:00', type: 'RTGS', amount: '560,000', status: 'Success' },
  { id: 212, ref: 'H2H-000212', time: '10:42:10', type: 'EFT', amount: '33,200', status: 'Pending' },
];

const EXTRA_TRANSACTIONS = [
  { id: 211, ref: 'H2H-000211', time: '10:38:45', type: 'Mpesa', amount: '12,000', status: 'Success' },
  { id: 210, ref: 'H2H-000210', time: '10:35:22', type: 'RTGS', amount: '850,000', status: 'Success' },
  { id: 209, ref: 'H2H-000209', time: '10:31:07', type: 'EFT', amount: '27,450', status: 'Failed' },
  { id: 208, ref: 'H2H-000208', time: '10:28:55', type: 'Pesalink', amount: '5,500', status: 'Success' },
  { id: 207, ref: 'H2H-000207', time: '10:25:13', type: 'EFT', amount: '98,300', status: 'Queued' },
  { id: 206, ref: 'H2H-000206', time: '10:20:40', type: 'RTGS', amount: '3,100,000', status: 'Success' },
];

const CHART_LABELS = ['24 Feb', '25 Feb', '26 Feb', '27 Feb', '28 Feb', '01 Mar', '02 Mar'];
const CHART_SUCCESS = [200, 210, 215, 205, 225, 195, 210];
const CHART_FAILED = [1, 2, 1, 0, 2, 1, 1];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const statusClass = (s) => {
  if (s === 'Success') return 'success';
  if (s === 'Failed') return 'failed';
  if (s === 'Pending') return 'pending';
  return 'queued';
};

// ─── CSV export ─────────────────────────────────────────────────────────────
const downloadCSV = (rows) => {
  const periodLabel = 'All Time';
  let csv = 'Faulu Kenya H2H Portal — Transaction Report\n';
  csv += `Period: ${periodLabel}\n`;
  csv += `Generated: ${new Date().toLocaleString('en-KE')}\n\n`;
  csv += 'Ref No.,Date,Time,Type,Amount (KES),Status\n';
  const today = new Date().toISOString().slice(0, 10);
  rows.forEach(r => {
    csv += `"${r.ref}","${today}","${r.time}","${r.type}","${r.amount}","${r.status}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `FauluKenyaH2H_Transactions_${today}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [showExtra, setShowExtra] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('all');
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('7D');

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return transactions.filter(tx => {
      if (q && !tx.ref.toLowerCase().includes(q) &&
        !tx.type.toLowerCase().includes(q) &&
        !tx.amount.includes(q)) return false;
      if (type !== 'all' && tx.type !== type) return false;
      if (status !== 'all' && tx.status !== status) return false;
      return true;
    });
  }, [transactions, search, type, status]);

  // ── KPIs derived from filtered ─────────────────────────────────────────────
  const kpis = useMemo(() => ({
    success: filtered.filter(t => t.status === 'Success').length,
    failed: filtered.filter(t => t.status === 'Failed').length,
    queued: filtered.filter(t => t.status === 'Queued').length,
    pending: filtered.filter(t => t.status === 'Pending').length,
  }), [filtered]);

  // ── Chart ──────────────────────────────────────────────────────────────────
  const chartData = {
    labels: CHART_LABELS,
    datasets: [
      {
        label: 'Success',
        data: CHART_SUCCESS,
        borderColor: '#632468',
        backgroundColor: 'rgba(99,36,104,0.07)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#632468',
        borderWidth: 2.5,
      },
      {
        label: 'Failed',
        data: CHART_FAILED,
        borderColor: '#F37021',
        backgroundColor: 'rgba(243,112,33,0.05)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#F37021',
        borderWidth: 2.5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f0f0f0' },
        ticks: { font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } }
      }
    }
  };

  // ── Load more ──────────────────────────────────────────────────────────────
  const loadMore = () => {
    if (!showExtra) {
      setTransactions(prev => [...prev, ...EXTRA_TRANSACTIONS]);
      setShowExtra(true);
    }
  };

  return (
    <div>
      {/* ── Filter Row ──────────────────────────────────────────────────── */}
      <div className="filter-card">
        <div className="filter-group">
          <label className="filter-lbl">Search</label>
          <div className="filter-search-wrap">
            <svg className="filter-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="filter-input"
              type="text"
              placeholder="Search by Ref, Type or amount..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-lbl">Period</label>
          <select className="filter-select" value={period} onChange={e => setPeriod(e.target.value)}>
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-lbl">Type</label>
          <select className="filter-select" value={type} onChange={e => setType(e.target.value)}>
            <option value="all">All Types</option>
            {['EFT', 'RTGS', 'Mpesa', 'Pesalink', 'Internal Transfer'].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-lbl">Status</label>
          <select className="filter-select" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
            <option value="Queued">Queued</option>
          </select>
        </div>

        <div className="filter-group" style={{ justifyContent: 'flex-end' }}>
          <button className="download-btn" onClick={() => downloadCSV(filtered)}>Download CSV</button>
        </div>
      </div>

      {/* ── Performance Metrics header ──────────────────────────────────── */}
      <div className="section-hdr">
        <span className="section-title">Performance Metrics</span>
        <button className="breakdown-btn" onClick={() => setShowBreakdown(true)}>📊 View Detailed Breakdown</button>
      </div>

      {/* ── KPI Cards ───────────────────────────────────────────────────── */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-box success">✅</div>
          <div className="kpi-body">
            <div className="kpi-lbl">Total Successful</div>
            <div className="kpi-val success">{kpis.success}</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon-box danger">❌</div>
          <div className="kpi-body">
            <div className="kpi-lbl">Total Failed</div>
            <div className="kpi-val danger">{kpis.failed}</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon-box warning">⏳</div>
          <div className="kpi-body">
            <div className="kpi-lbl">Queued</div>
            <div className="kpi-val warning">{kpis.queued}</div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon-box info">🔄</div>
          <div className="kpi-body">
            <div className="kpi-lbl">Pending Bal. Validation</div>
            <div className="kpi-val info">{kpis.pending}</div>
          </div>
        </div>
      </div>

      {/* ── Bottom Grid: Chart + Log ─────────────────────────────────────── */}
      <div className="bottom-grid">

        {/* Chart */}
        <div className="chart-box">
          <div className="chart-hdr">
            <span className="chart-title">📊 7-Day Transaction Volume</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="chart-tabs">
                {['TODAY', '7D', '30D', '1Q'].map(tab => (
                  <button
                    key={tab}
                    className={`chart-tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >{tab}</button>
                ))}
              </div>
              <div className="chart-legend">
                <span><span className="leg-dot" style={{ background: '#632468' }}></span>Success</span>
                <span><span className="leg-dot" style={{ background: '#F37021' }}></span>Failed</span>
              </div>
            </div>
          </div>
          <div className="chart-area">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Transaction Log */}
        <div className="log-box">
          <div className="log-title">Transaction Log</div>
          <table className="tx-table">
            <thead>
              <tr>
                <th>Ref No.</th>
                <th>Time</th>
                <th>Type</th>
                <th>Amount (KES)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => (
                <tr key={tx.id}>
                  <td style={{ fontWeight: 600 }}>{tx.ref}</td>
                  <td style={{ color: '#6c757d' }}>{tx.time}</td>
                  <td style={{ fontWeight: 600 }}>{tx.type}</td>
                  <td style={{ fontWeight: 500 }}>{tx.amount}</td>
                  <td>
                    <span className={`status-pill ${statusClass(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!showExtra && (
            <button className="load-more-btn" onClick={loadMore}>
              📁 Load Older Transactions
            </button>
          )}
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="dash-footer" style={{ marginTop: '2rem', borderRadius: '12px', textAlign: 'center', padding: '14px 2rem', fontSize: '0.78rem', background: '#632468', color: 'rgba(255,255,255,0.7)' }}>
        &copy; 2026 &nbsp;
        <strong style={{ color: '#F37021' }}>Faulu Kenya Microfinance Bank</strong>
        &nbsp;|&nbsp;
        <strong style={{ color: '#F37021' }}>Backed by Old Mutual</strong>
        &nbsp;|&nbsp; H2H Transaction Processing System &nbsp;|&nbsp; Powered by NLS Tech Solutions Ltd.
      </footer>

      {/* ── Breakdown Modal — 6-card grid (matches GitHub source) ───────── */}
      {showBreakdown && (() => {
        const byTypeStatus = {};
        ['EFT', 'RTGS', 'Internal Transfer', 'Mpesa', 'Pesalink'].forEach(t => {
          byTypeStatus[t] = { success: 0, failed: 0, queued: 0, pending: 0 };
        });
        filtered.forEach(tx => {
          const key = tx.type;
          if (!byTypeStatus[key]) byTypeStatus[key] = { success: 0, failed: 0, queued: 0, pending: 0 };
          if (tx.status === 'Success') byTypeStatus[key].success++;
          else if (tx.status === 'Failed')  byTypeStatus[key].failed++;
          else if (tx.status === 'Queued')  byTypeStatus[key].queued++;
          else if (tx.status === 'Pending') byTypeStatus[key].pending++;
        });
        const total = { success: kpis.success, failed: kpis.failed, queued: kpis.queued, pending: kpis.pending };
        const cards = [
          { cls: 'tx-card-total', title: 'Total Transactions Today', icon: '📊', ...total },
          { cls: 'tx-card-rtgs',  title: 'RTGS Transactions',        icon: '🏦', ...byTypeStatus['RTGS'] },
          { cls: 'tx-card-eft',   title: 'EFT Transactions',         icon: '💳', ...byTypeStatus['EFT'] },
          { cls: 'tx-card-int',   title: 'Internal Transfers',       icon: '🔁', ...byTypeStatus['Internal Transfer'] },
          { cls: 'tx-card-mpesa', title: 'Mpesa Transactions',       icon: '📱', ...byTypeStatus['Mpesa'] },
          { cls: 'tx-card-pesa',  title: 'Pesalink Transactions',    icon: '🔗', ...byTypeStatus['Pesalink'] },
        ];
        return (
          <div className="drill-modal-overlay" onClick={() => setShowBreakdown(false)}>
            <div className="drill-modal-container" onClick={e => e.stopPropagation()}>
              <div className="drill-modal-hdr">
                <h3>Transaction Insights — <span>Transaction Types Breakdown</span></h3>
                <button className="drill-modal-close" onClick={() => setShowBreakdown(false)}>×</button>
              </div>
              <div className="drill-modal-body">
                <div className="tx-cards-grid">
                  {cards.map(card => (
                    <div key={card.title} className={`tx-card ${card.cls}`}>
                      <div className="tx-card-hdr">
                        <span className="tx-card-hdr-title">{card.title}</span>
                        <span className="tx-card-hdr-icon">{card.icon}</span>
                      </div>
                      <div className="tx-card-body">
                        <div className="tx-card-row"><span className="tx-card-label">Success</span><span className="tx-card-val success">{card.success ?? 0}</span></div>
                        <div className="tx-card-row"><span className="tx-card-label">Failed</span><span className="tx-card-val danger">{card.failed ?? 0}</span></div>
                        <div className="tx-card-row"><span className="tx-card-label">Queued</span><span className="tx-card-val queued">{card.queued ?? 0}</span></div>
                        <div className="tx-card-row"><span className="tx-card-label">Pending Bal. Validation</span><span className="tx-card-val pending">{card.pending ?? 0}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '1rem', fontStyle: 'italic' }}>
                  * This trend is specific to the selected transaction type and client channel.
                </p>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
