import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import { Link } from 'react-router-dom'
import "./DetailProduct.css"
const DetailProduct = () => {
    const params=useParams()
    const state=useContext(GlobalState)
    const [products]=state.productAPI.products
    const [DetailProduct,setDetailProduct]=useState([])

    useEffect(()=>{
        if(params)
        {
            products.forEach(product => {
                if(product._id===params.id) setDetailProduct(product)
                
            });
        }
    },[params,products])
    if (DetailProduct.length===0) return null;

    console.log(DetailProduct);
    
  return (
    <div className='detail'>
  <div className='product-details'>
    <img src={DetailProduct?.images?.url} alt='/' />
    <div className='details-info'>
      <h2>{DetailProduct.title}</h2>
   
      <span>₹{DetailProduct.price}  /250g</span>
      <span>{DetailProduct.description}</span>
      <p>{DetailProduct.content}</p>
      <p>Sold: {DetailProduct.sold}</p>
    </div>
  </div>
  <Link to='/ContactUs' className='cart'>Buy Now</Link>
</div>
  )
}

export default DetailProduct