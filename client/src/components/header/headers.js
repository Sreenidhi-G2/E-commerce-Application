import React, { useContext } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

const Headers = () => {

  const state = useContext(GlobalState)
  const [isLogged,setIsLogged]=state.userAPI.isLogged
  const [isAdmin,setIsAdmin]=state.userAPI.isAdmin
  const [cart]=state.userAPI.cart

  const  logoutUser = async()=>{
    await axios.get('/user/logout')
    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)
  }
  
  const adminRouter=()=>{
    return(
      <>
      <li><Link to='/create_product'>Create product</Link></li>
      <li><Link to='/category'>Catogories</Link></li>
      </>
    )
  }
  const loggedRouter=()=>{
    return(
      <>
      
      <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
      </>
    )
  }

  return (
    <header>
      
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin? 'Admin':"SFP masalas"}</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">{isAdmin? 'Products':"Shop"}</Link>
        </li>
        {isAdmin && adminRouter()}
        {
          isLogged ? loggedRouter() : <li>  <Link to="/login">Login or Register</Link>   </li>
        }
        
        <li>
          <IoCloseSharp />
        </li>
      </ul>
        {
          isAdmin ?  '' :    <div className="cart-icon">
         
          
        </div>
        }



   
    </header>
  );
};

export default Headers;
