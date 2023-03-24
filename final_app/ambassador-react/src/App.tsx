import React from 'react';

import logo from './logo.svg';
import './App.css';
import ProductsFrontEnd from './pages/ProductsFrontEnd';
import ProductsBackEnd from './pages/ProductsBackEnd';
import Layout from './component/Layout';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
function App() {
  return (
   

    <BrowserRouter>
    
        <Routes>
         

            <Route path={"/"} element={<ProductsFrontEnd/>}>   </Route>
            <Route path={"/backend"} element={<ProductsBackEnd/>}>   </Route>

            <Route path={"/login"} element={<Login/>}>   </Route>
            <Route path={"/register"} element={<Register/>}>   </Route>
            <Route path={"/profile"} element={<Profile/>}>   </Route>



        </Routes>

</BrowserRouter>
  
  );
}

export default App;

