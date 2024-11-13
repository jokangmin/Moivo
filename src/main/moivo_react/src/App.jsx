import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main_index from './components/Main_index';
import StoreBoard from './components/Store/Store_board'; 
import StoreList from './components/Store/Store_list';
import MainProvider from './contexts/MainContext';

const App = () => {
  return (
    <MainProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main_index />} />
          <Route path="/store" element={<StoreBoard />} />
          <Route path="/store-list" element={<StoreList />} />
        </Routes>
      </Router>
    </MainProvider>
  );
};

export default App;
