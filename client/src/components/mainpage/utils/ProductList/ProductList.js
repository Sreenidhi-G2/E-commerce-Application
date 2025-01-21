import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css'; // Import the CSS file for styling
import { useContext } from 'react';
import { GlobalState } from '../../../../GlobalState';
import BtnRender from './BtnRender';


const ProductList = ({ product}) => {
   const state=useContext(GlobalState)
      
      const [isAdmin]=state.userAPI.isAdmin  
      
  console.log(product);
  return (
    <div className="product-card">
      {
        isAdmin && <input type='checkbox' checked={product.checked}></input>
      }
      <img src={product.images.url} alt={product.title} className="product-image" />
      <div className="product-box">
        <h2 className="product-title" title={product.title}>
          {product.title}
        </h2>
        <span className="product-price">₹{product.price} /250g </span>
        <p className="product-description">{product.description}</p>
      </div>

      <BtnRender product={product}/>
    </div>
  );
};

export default ProductList;
