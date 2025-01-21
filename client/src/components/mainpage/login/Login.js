import React, { useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import "./login.css"
const Login = () => {

  const [user,setUser]=useState({
    name:'',
    email:" ",
    password:""
  })
    const onChangeInput=e=>{
      const{name,value}=e.target;
      setUser({...user,[name]:value})
    }
    const loginSubmit= async e =>{
      e.preventDefault();
      try{
          await axios.post('user/login',{...user})

          localStorage.setItem('firstLogin',true)
          
          window.location.href="/"
      }catch(err)
      {
        alert(err.response.data.msg)
      }
    }

  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
        <input  type='email' name='email' required placeholder='Enter your Email' value={user.email} onChange={onChangeInput}></input>
        <input  type='password' name='password' required placeholder='Enter Password' value={user.password} onChange={onChangeInput}></input>
        <div className='row'>
          <button type='submit'>Login</button>
          <Link to="/register"> Dont Have an Account? Register</Link>
        </div>

      </form>

    </div>
  )
}

export default Login