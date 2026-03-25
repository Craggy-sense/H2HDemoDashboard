import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page - No Layout */}
        <Route path="/landing" element={<Landing />} />
        
        {/* Dashboard - With Sidebar Layout */}
        <Route path="/" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        
        <Route path="*" element={<Navigate to="/landing" />} />
      </Routes>
    </Router>
  );
}

export default App;
