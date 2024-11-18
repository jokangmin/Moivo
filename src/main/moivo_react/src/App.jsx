import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main_index from './components/main_index';
import ProductBoard from './containers/product/product_board'; 
import ProductList from './containers/product/product_list';
import ProductSearch from './containers/product/product_search';
import ProductDetail from './containers/product/product_detail';
import MainProvider from './contexts/MainContext';

const App = () => {
  return (
    <MainProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main_index />} />
          <Route path="/product" element={<ProductBoard />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-search" element={<ProductSearch />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </MainProvider>
  );
};

export default App;
