import React from 'react'
import { GlobalState } from '../../../../GlobalState'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
const BtnRender = (product) => {


  
    const state=useContext(GlobalState)  
    const [isAdmin]=state.userAPI.isAdmin  
    const addcart=state.userAPI.addcart
  return (
    <div className="row-btn">
    {
      isAdmin ? 
    <>
    <Link id="btn-buy" to={`#!`} className="btn-buy">
      Delete 
    </Link>
    <Link id="btn-view" to={`detail/${product._id}`} className="btn-view">
      Edit
    </Link>
    </>
    :
      <>
         <Link id="btn-buy" to={`/ContactUs`} className="btn-buy" >
      Buy
    </Link>
    <Link id="btn-view" to={`detail/${product.product._id}`} className="btn-view">  
      View
    </Link>
      </>
}
  </div>
)
}

export default BtnRender