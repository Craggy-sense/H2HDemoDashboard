import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="globe">🌐</div>
        <div>
          <div className="brand-name">NLS TECH <em>SOLUTIONS LTD</em></div>
          <span className="brand-sub">Host to Host Processing System</span>
        </div>
      </header>

      <div className="hero">
        <div className="hero-eyebrow">H2H Dashboard Suite</div>
        <h1><span>H2H</span> Transaction Dashboards</h1>
        <p>Select a dashboard version below. Both dashboards process and display transactions from external institutions via API or payment files, showing real-time validation and callback status.</p>

        <div className="cards">
          {/* V1 */}
          <Link to="/v1" className="dash-card">
            <div className="card-top">
              <span className="card-icon">📊</span>
              <div className="card-badge">Version 1</div>
              <h2>Plain Dashboard</h2>
              <p>Clean overview with no navigation menus</p>
            </div>
            <div className="card-bottom">
              <ul className="features">
                <li>KPI summary cards</li>
                <li>6 transaction type cards</li>
                <li>7-day trend chart</li>
                <li>Live clock & date</li>
              </ul>
              <div className="open-btn">Open Dashboard <span>→</span></div>
            </div>
          </Link>

          {/* V2 */}
          <Link to="/" className="dash-card">
            <div className="card-top">
              <span className="card-icon">🗂️</span>
              <div className="card-badge">Version 2</div>
              <h2>Full Suite Dashboard</h2>
              <p>Complete dashboard with Reports & Enquiries navigation</p>
            </div>
            <div className="card-bottom">
              <ul className="features">
                <li>Collapsible sidebar navigation</li>
                <li>Reports & Enquiries menus</li>
                <li>Recent Transactions table</li>
                <li>Notification badges</li>
              </ul>
              <div className="open-btn">Open Dashboard <span>→</span></div>
            </div>
          </Link>
        </div>
      </div>

      <footer className="landing-footer">
        &copy; 2026 &nbsp;<strong>NLS Tech Solutions Ltd</strong>&nbsp; | &nbsp;H2H Transaction Processing System
      </footer>
    </div>
  );
};

export default Landing;
