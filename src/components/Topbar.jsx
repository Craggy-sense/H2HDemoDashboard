import React, { useState } from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, RefreshCcw } from 'lucide-react';

const Topbar = ({ collapsed, onToggle, reportDate, lastUpdated }) => {
  const [showNoti, setShowNoti] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Batch Processing Complete',
      desc: 'RTGS Batch #8293 has been processed successfully.',
      time: '2 mins ago'
    },
    {
      id: 2,
      type: 'error',
      title: 'Callback Failed',
      desc: 'M-Pesa callback for Ref: H2H_91029 failed after 3 retries.',
      time: '15 mins ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'System Maintenance',
      desc: 'Scheduled maintenance this Sunday at 02:00 AM EAT.',
      time: '1 hour ago'
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle2 size={16} color="#10b981" />;
      case 'error': return <AlertCircle size={16} color="#ef4444" />;
      default: return <Info size={16} color="#3b82f6" />;
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-toggle" onClick={onToggle} title="Toggle sidebar">
          {collapsed ? '▶' : '◀'}
        </button>
        <nav className="breadcrumb">
          <span>H2H</span>
          <span className="divider">/</span>
          <strong>Transaction Dashboard</strong>
          <span className="backed-tag">| Backed by Old Mutual</span>
        </nav>
      </div>

      <div className="topbar-right">
        <div className="topbar-badges">
          <div className="update-status">
            <RefreshCcw size={14} className="refresh-icon" />
            <div className="report-badge">Last updated: {lastUpdated}</div>
            <span className="update-note">updates after 10 mins</span>
          </div>
        </div>
        
        <div className="noti-container">
          <button 
            className={`notif-btn ${showNoti ? 'active' : ''}`} 
            onClick={() => setShowNoti(!showNoti)}
            title="Notifications"
          >
            <Bell size={17} />
            <span className="badge">3</span>
          </button>

          {showNoti && (
            <div className="noti-dropdown">
              <div className="noti-header">
                <h3>Notifications</h3>
                <span className="mark-all">Mark all as read</span>
              </div>
              <div className="noti-list">
                {notifications.map(n => (
                  <div key={n.id} className="noti-item">
                    <div className="noti-icon">{getIcon(n.type)}</div>
                    <div className="noti-content">
                      <div className="noti-title">{n.title}</div>
                      <div className="noti-desc">{n.desc}</div>
                      <div className="noti-time">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="noti-footer">View All Notifications</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
