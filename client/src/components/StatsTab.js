import React from 'react';

const StatsTable = ({ data }) => {
  return (
    <div className="card" style={{ marginTop: '1rem' }}>
      {data.length === 0 ? (
        <p>No data yet.</p>
      ) : (
        <table style={{ width: '100%', color: 'white', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #444' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Short URL</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Clicks</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Created</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Expires</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '10px' }}>
                  <a href={row.shortLink} target="_blank" rel="noreferrer" style={{ color: '#00ffff' }}>
                    {row.shortLink}
                  </a>
                </td>
                <td style={{ padding: '10px' }}>{row.totalClicks}</td>
                <td style={{ padding: '10px' }}>{new Date(row.createdAt).toLocaleString()}</td>
                <td style={{ padding: '10px' }}>{new Date(row.expiresAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StatsTable;
