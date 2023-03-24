import React, { Profiler } from 'react';
import './App.css';
import Register from "./pages/Register"
import Login from "./pages/Login"
import Users from "./pages/Users"
import Product from './pages/products/Products';
import RedirectToUsers from './components/RedirectToUsers';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Links  from "./pages/Links"
import Products from './pages/products/Products';
import ProductsForm from './pages/products/ProductsForm';
import Orders from './pages/orders';
import Profile from './pages/Profile';


function App() {
  return (
    <div className="App">
       
        <BrowserRouter>
          <Routes>
          <Route path="/"  element={<RedirectToUsers />} />
          <Route path="/users"  element={<Users />} />
          <Route path="/users/:id/links"  element={<Links />} />

          <Route  path="login" element={<Login/>} />
          <Route  path="profile" element={<Profile/>} />

          <Route path="register" element={<Register/>} />
          <Route path="logout" element={<Register/>} />
          <Route path="products" element={<Products/>}></Route>
          <Route path="products/create" element={<ProductsForm/>}></Route>
          <Route path="products/:id/edit" element={<ProductsForm/>}></Route>
          <Route path="orders" element={<Orders/>}></Route>




          </Routes>
        </BrowserRouter>

    </div>
  );
}
export default App;
