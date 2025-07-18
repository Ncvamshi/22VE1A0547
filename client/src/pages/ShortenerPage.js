import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlCard from '../components/UrlCard';

const ShortenerPage = () => {
  const [urls, setUrls] = useState([]);

  const addShortUrl = (urlData) => {
    setUrls((prev) => [...prev, urlData]);
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <UrlForm onShorten={addShortUrl} />
      <div>
        {urls.map((item, idx) => <UrlCard key={idx} data={item} />)}
      </div>
    </div>
  );
};

export default ShortenerPage;