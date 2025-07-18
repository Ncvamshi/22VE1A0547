import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';

const App = () => {
  return (
    <div className="app-container">
      <nav>
        <Link to="/">Shorten URL</Link>
        <Link to="/stats">Stats</Link>
      </nav>
      <Routes>
        <Route path='/' element={<ShortenerPage />} />
        <Route path='/stats' element={<StatsPage />} />
      </Routes>
    </div>
  );
};

export default App;