import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Main_index from './components/Main_index';
=======
import Main_index from './components/main_index';
import StoreBoard from './containers/Store/Store_board'; 
import StoreList from './containers/Store/Store_list';
>>>>>>> 3d7a206 (디렉토리 추가 및 경로 수정)
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
