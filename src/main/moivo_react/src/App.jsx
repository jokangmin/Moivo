import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main_index from './components/main_index';
import ProductBoard from './containers/product/product_board'; 
import ProductList from './containers/product/product_list';
import MainProvider from './contexts/MainContext';

import MypageMain from './containers/mypage/mypage_main';
import MypageOrder from './containers/mypage/mypage_order';
import MypageOrderDetails from './containers/mypage/mypage_orderDetails';



const App = () => {
  return (
    <MainProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main_index />} />
          <Route path="/product" element={<ProductBoard />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/mypage" element={<MypageMain />} />
          <Route path="/mypage/order" element={<MypageOrder />} />
          <Route path="/mypage/orderDetails" element={<MypageOrderDetails />} />
        </Routes>
      </Router>
    </MainProvider>
  );
};

export default App;
