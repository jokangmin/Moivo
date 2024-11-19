import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main_index from './components/main_index';
import User_login from './containers/user/user_login';
import User_signup from './containers/user/user_signup';
import ProductBoard from './containers/product/product_board'; 
import ProductList from './containers/product/product_list';
import ProductSearch from './containers/product/product_search';
import ProductDetail from './containers/product/product_detail';
import Qna_faqboard from './containers/qna/qna_faqboard';
import Qna_board from './containers/qna/qna_board';
import MainProvider from './contexts/MainContext';



const App = () => {
  return (
    <MainProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main_index />} />
          <Route path="/user" element={<User_login/>} />
          <Route path="/user_signup" element={<User_signup/>} />
          <Route path="/product" element={<ProductBoard />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-search" element={<ProductSearch />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/qna_faqboard" element={<Qna_faqboard/>} />
          <Route path="/qna_board" element={<Qna_board/>} />
        </Routes>
      </Router>
    </MainProvider>
  );
};

export default App;
