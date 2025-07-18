// pages/StatsPage.jsx
import React, { useState } from 'react';
import StatsTable from '../components/StatsTab';

const StatsPage = () => {
  const [code, setCode] = useState('');
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/shortner/${code}`);
      const data = await res.json();
      setStats([data]); // wrap in array for table rendering
    } catch (err) {
      console.error('Error fetching stats:', err);
      alert('Failed to fetch stats. Please check the shortcode.');
    }
  };

  return (
    <div>
      <h1>URL Statistics</h1>
      <div className="card">
        <input
          type="text"
          placeholder="Enter shortcode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={fetchStats}>Get Stats</button>
      </div>
      {stats && <StatsTable data={stats} />}
    </div>
  );
};

export default StatsPage;