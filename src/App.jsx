
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MatchDetails from './pages/MatchDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/match/:id" element={<MatchDetails />} />
    </Routes>
  );
};

export default App;
