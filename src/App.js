import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoinFlipPage from './pages/CoinFlipPage'; // Import the new page component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/coin" element={<CoinFlipPage />} />
      </Routes>
    </Router>
  );
}

export default App;
