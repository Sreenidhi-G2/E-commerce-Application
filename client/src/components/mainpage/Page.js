import React from 'react'
import Cart from './cart/Cart'
import Product from './Products/Product'
import Login from './login/Login'
import Register from './login/Register'
import {Route,Routes} from "react-router-dom"
import DetailProduct from './utils/DetailsProduct/DetailProduct'
import ContactUS from './ContactUS'
const Page = () => { 
  return (
    <Routes>
      <Route path="/" element={<Product/>}></Route>
      <Route path="/login" element={<Login/>}></Route> 
      <Route path="/register" element={<Register/>}></Route> 
      <Route path="/cart" element={<Cart/>}></Route> 
      <Route path="/detail/:id" element={<DetailProduct/>}></Route> 
      <Route path="/ContactUs" element={<ContactUS/>}></Route> 
    

    </Routes>
  )
}

export default Page