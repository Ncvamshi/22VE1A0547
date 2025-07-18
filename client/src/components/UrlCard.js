import React from 'react';

const UrlCard = ({ data }) => {
  return (
    <div className="card">
      <p><strong>Short URL:</strong> <a href={data.shortLink} target="_blank" rel="noreferrer">{data.shortLink}</a></p>
      <p><strong>Expires At:</strong> {data.expiry}</p>
    </div>
  );
};

export default UrlCard;