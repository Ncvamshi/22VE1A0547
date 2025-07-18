import React, { useState } from 'react';

const UrlForm = ({ onShorten }) => {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [shortcode, setShortcode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return alert('URL is required');
    const res = await fetch('http://localhost:5000/api/shortner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, validity: +validity, shortcode })
    });
    const data = await res.json();
    onShorten(data);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter long URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <input type="number" placeholder="Validity (min)" value={validity} onChange={(e) => setValidity(e.target.value)} />
      <input type="text" placeholder="Custom shortcode (optional)" value={shortcode} onChange={(e) => setShortcode(e.target.value)} />
      <button type="submit">Shorten</button>
    </form>
  );
};

export default UrlForm;