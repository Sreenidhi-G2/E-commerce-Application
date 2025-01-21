import { createContext, useEffect, useState } from "react";
import ProductAPI from "./api/ProductAPI";

import axios from "axios";
import Userapi from "./api/Userapi";
export const GlobalState = createContext()

export const DataProvider=({children})=>{

    const [token,setToken]=useState(false)

    const refreshToken=async()=>{   
         const res= await axios.post('user/refresh_token')
        console.log(res);
        
        setToken(res.data.accessToken)
    }
    
    useEffect(()=>{
        const firstLogin=localStorage.getItem('firstLogin')
        if(firstLogin) 
            {
                refreshToken();
            }
        
    },[]);

    const state={
        token:[token,setToken],
        productAPI:ProductAPI(),
        userAPI:Userapi(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}