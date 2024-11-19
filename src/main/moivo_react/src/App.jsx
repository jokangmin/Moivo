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

const routeConfig = [
  { path: "/", element: <Main_index /> },
  { path: "/user", element: <User_login /> },
  { path: "/user_signup", element: <User_signup /> },
  { path: "/product", element: <ProductBoard /> },
  { path: "/product-list", element: <ProductList /> },
  { path: "/product-search", element: <ProductSearch /> },
  { path: "/product-detail/:id", element: <ProductDetail /> },
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
