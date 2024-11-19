import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main_index from './components/main_index';
import User_login from './containers/user/user_login';
import User_signup from './containers/user/user_signup';
import ProductBoard from './containers/product/product_board'; 
import ProductList from './containers/product/product_list';
import ProductSearch from './containers/product/product_search';
import ProductDetail from './containers/product/product_detail';
import MainProvider from './contexts/MainContext';
import MypageMain from './containers/mypage/mypage_main';
import MypageOrder from './containers/mypage/mypage_order';
import MypageOrderDetails from './containers/mypage/mypage_orderDetails';
import MypageProfile from './containers/mypage/mypage_profile';

const routeConfig = [
  { path: "/", element: <Main_index /> },
  { path: "/user", element: <User_login /> },
  { path: "/user_signup", element: <User_signup /> },
  { path: "/product", element: <ProductBoard /> },
  { path: "/product-list", element: <ProductList /> },
  { path: "/product-search", element: <ProductSearch /> },
  { path: "/product-detail/:id", element: <ProductDetail /> },
  { path: "/mypage", element: <MypageMain /> },
  { path: "/mypage/profile", element: <MypageProfile /> },
  { path: "/mypage/order", element: <MypageOrder /> },
  { path: "/mypage/orderDetails", element: <MypageOrderDetails /> },
];

const App = () => {
  return (
    <MainProvider>
      <Router>
        <Routes>
          {routeConfig.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </Router>
    </MainProvider>
  );
};

export default App;
