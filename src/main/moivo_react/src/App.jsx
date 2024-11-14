import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main_index from './components/Main_index';
import MainProvider from './contexts/MainContext';
import ProductBoard from './components/product/product_board';
import ProductList from './components/product/product_list';

const App = () => {
  return (
    <MainProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main_index />} />
          <Route path="/product" element={<ProductBoard />} />
          <Route path="/product-list" element={<ProductList />} />
        </Routes>
      </Router>
    </MainProvider>
  );
};

export default App;
