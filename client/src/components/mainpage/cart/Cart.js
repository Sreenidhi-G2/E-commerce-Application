import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

const Cart = () => {
  const state = useContext(GlobalState);


  const cart = state.UserAPI ? state.UserAPI.cart : []; 

  
  if (cart.length === 0) {
    return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart is Empty</h2>;
  }

 
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Your Cart</h2>
      <div>
        {cart.map((item) => (
          <div key={item._id} style={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
            <h3>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
