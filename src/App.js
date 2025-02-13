// src/App.js
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import QRCodeGenerator from './components/Qr Flyer Generator';
import QRCodeGenerate from './components/QRcodeGenerator';
import HomePage from './components/HomePage';

const AppContent = () => {

  return (
    <>
      <Routes>
      <Route exact path="/" element={<HomePage />} />
          <Route exact path="/flyer" element={<QRCodeGenerator />} />
          <Route exact path="/QRcode" element={<QRCodeGenerate />} />
      </Routes>

      </>
  );
};

const App = () => ( 
  <Router>
   <div className="min-h-screen bg-gray-50 w-full">
    <AppContent />
    </div>
  </Router>
);
export default App;

