// src/App.js
import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import QRCodeGenerator from './components/Qr Flyer Generator';

const AppContent = () => {

  return (
    <>
      <Routes>
          <Route exact path="/" element={<QRCodeGenerator />} />
          
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

