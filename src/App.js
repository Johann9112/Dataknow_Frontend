import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Clientes from './Clientes';
import Facturas from './Facturas';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/facturas" element={<Facturas />} />
    </Routes>
  </Router>
);

export default App;
