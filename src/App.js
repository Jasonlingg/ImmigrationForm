// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intakeform from './components/Intakeform';
import ReviewPage from './components/ReviewPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Intakeform />} />
          <Route path="/review" element={<ReviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;