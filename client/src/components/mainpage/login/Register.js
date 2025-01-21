import React, { useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
const Register = () => {

  const [user,setUser]=useState({
    name:"",
    email:"",
    password:""
  })
    const onChangeInput=e=>{
      const{name,value}=e.target;
      setUser({...user,[name]:value})
    }
    const loginSubmit= async e =>{
      e.preventDefault();
      try{
          await axios.post('user/register',{...user})

          localStorage.setItem('firstRegister',true)
          
          window.location.href="/"
      }catch(err)
      {
        alert(err.response.data.msg)
      }
    }

  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
      <input  type='text' name='name' required placeholder='Enter your name' value={user.name} onChange={onChangeInput}></input>
        <input  type='email' name='email' required placeholder='Enter your Email' value={user.email} onChange={onChangeInput}></input>
        <input  type='password' name='password' required placeholder='Enter Password' value={user.password} onChange={onChangeInput}></input>
        <div className='row'>
          <button type='submit'>Register</button>
          <Link to="/login">Already Have an Account? Login</Link>
        </div>

      </form>

    </div>
  )
}

export default Register