import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const now = new Date();
  const reportDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const lastUpdated = now.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="layout">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(p => !p)} />
      <div className={`main-area ${collapsed ? 'collapsed' : ''}`}>
        <Topbar
          collapsed={collapsed}
          onToggle={() => setCollapsed(p => !p)}
          reportDate={reportDate}
          lastUpdated={lastUpdated}
        />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
