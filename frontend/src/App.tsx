import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Rewards from './pages/Rewards';
import About from './pages/About';
import Marketplace from './pages/Marketplace';
import TeamMembers from './pages/TeamMembers';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/about" element={<About />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/team" element={<TeamMembers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;