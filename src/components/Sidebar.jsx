import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import fauluLogo from '../assets/faulu_logo.png';

const Sidebar = ({ collapsed, onToggle }) => {
  const [openMenus, setOpenMenus] = useState({ reports: true, enquiries: false });

  const toggleSub = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon-wrap">
          <img src={fauluLogo} alt="Faulu Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        {!collapsed && (
          <div className="logo-text">
            <div className="logo-name">FAULU <span>KENYA</span></div>
            <div className="logo-sub">H2H Processing Portal</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div className="sidebar-nav">
        <div className="nav-section">{!collapsed ? 'Main' : ''}</div>

        <div className="nav-item active">
          <span className="nav-icon" style={{ fontSize: '16px' }}>🏠</span>
          {!collapsed && <span className="nav-label">Dashboard</span>}
        </div>

        <div className="nav-section">{!collapsed ? 'Reports & Enquiries' : ''}</div>

        <div className={`nav-item ${openMenus.reports ? 'open' : ''}`} onClick={() => toggleSub('reports')}>
          <span className="nav-icon" style={{ fontSize: '16px' }}>📊</span>
          {!collapsed && (
            <>
              <span className="nav-label">Reports</span>
              <span className="nav-badge">4</span>
              <ChevronRight size={14} className="nav-chevron" />
            </>
          )}
        </div>
        {!collapsed && (
          <div className={`sub-menu ${openMenus.reports ? 'open' : ''}`}>
            <div className="sub-item active"><span className="sub-dot"></span>Daily Summary</div>
            <div className="sub-item"><span className="sub-dot" style={{ background: 'transparent', border: '1px solid #ccc' }}></span>Monthly Report</div>
            <div className="sub-item"><span className="sub-dot" style={{ background: 'transparent', border: '1px solid #ccc' }}></span>Failed Transactions</div>
            <div className="sub-item"><span className="sub-dot" style={{ background: 'transparent', border: '1px solid #ccc' }}></span>Callback Logs</div>
          </div>
        )}

        <div className={`nav-item ${openMenus.enquiries ? 'open' : ''}`} onClick={() => toggleSub('enquiries')}>
          <span className="nav-icon" style={{ fontSize: '16px' }}>🔍</span>
          {!collapsed && (
            <>
              <span className="nav-label">Enquiries</span>
              <ChevronRight size={14} className="nav-chevron" />
            </>
          )}
        </div>
        {!collapsed && (
          <div className={`sub-menu ${openMenus.enquiries ? 'open' : ''}`}>
            <div className="sub-item"><span className="sub-dot" style={{ background: 'transparent', border: '1px solid #ccc' }}></span>Transaction Lookup</div>
            <div className="sub-item"><span className="sub-dot" style={{ background: 'transparent', border: '1px solid #ccc' }}></span>Account Enquiry</div>
            <div className="sub-item"><span className="sub-dot" style={{ background: 'transparent', border: '1px solid #ccc' }}></span>Status Check</div>
          </div>
        )}

        <div className="nav-section">{!collapsed ? 'Management' : ''}</div>

        <div className="nav-item">
          <span className="nav-icon" style={{ fontSize: '16px' }}>🏢</span>
          {!collapsed && <span className="nav-label">Clients</span>}
        </div>
        <div className="nav-item">
          <span className="nav-icon" style={{ fontSize: '16px' }}>🔔</span>
          {!collapsed && (
            <>
              <span className="nav-label">Callback Notifications</span>
              <span className="nav-badge">2</span>
            </>
          )}
        </div>
        <div className="nav-item">
          <span className="nav-icon" style={{ fontSize: '16px' }}>🔌</span>
          {!collapsed && <span className="nav-label">API Status</span>}
        </div>
        <div className="nav-item">
          <span className="nav-icon" style={{ fontSize: '16px' }}>📂</span>
          {!collapsed && <span className="nav-label">File Uploads</span>}
        </div>
      </div>

      {/* Footer */}
      <div className="sidebar-foot">
        <div className="nav-section">{!collapsed ? 'System' : ''}</div>
        <div className="nav-item">
          <span className="nav-icon" style={{ fontSize: '16px' }}>⚙️</span>
          {!collapsed && <span className="nav-label">Settings</span>}
        </div>
        <div className="nav-item">
          <span className="nav-icon" style={{ fontSize: '16px' }}>👤</span>
          {!collapsed && <span className="nav-label">Admin Profile</span>}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
