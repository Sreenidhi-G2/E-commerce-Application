import React, { useEffect, useState } from 'react'
import axios from "axios"
const ProductAPI = () => {

 const  [products,SetProducts]=useState([])

 const getProducts=async()=>{
    try{
    const res= await axios.get("https://e-commerce-application-backend-55yo.onrender.com/api/products")
   SetProducts(res.data.products);
    }catch(err)
    {
        console.log(err);
        
    }
 }

    useEffect(()=>{
        getProducts()
    },[])
  return {
    products : [products,SetProducts]
  }
    
}   
export default ProductAPI
