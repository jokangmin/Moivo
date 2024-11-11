import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main_index from './components/Main_index';
import Store from './components/Store'; 
import MainProvider from './contexts/MainContext';

const App = () => {
  return (
    <MainProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main_index />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </Router>
    </MainProvider>
  );
};

export default App;
