import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/ProductList/ProductList'
import "./products.css"

const Product = () => {
  const state=useContext(GlobalState)
   const [products]=state.productAPI.products
   const [isAdmin]=state.userAPI.isAdmin

  console.log(state);
 
  
  return (
    <div className='products'>
        {
          products.map(product=>{
            return <ProductList key={product.id} product={product} isAdmin={isAdmin}/>
          })
        }

    </div>
  )
}

export default Product