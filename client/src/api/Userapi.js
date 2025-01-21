import axios from 'axios';
import { useEffect, useState } from 'react';

const Userapi = (token) => {

    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    });

                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                    console.log('User role:', res.data);

                } catch (err) {
                    alert(err.response?.data?.msg || 'An error occurred');
                }
            };
            getUser();
        }
    }, [token]);

    const addcart = async (product) => {
        if (!isLogged) return alert("Please Login!");
    
        // Log cart and product details for debugging
        console.log('Cart:', cart);
        console.log('Product:', product);
    
       
        const check = cart.some(item => item._id === product._id); 
    
        if (check) {
            alert("This Product is already added to the Cart!");
        } else {
            
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };
    

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addcart: addcart
    };
};

export default Userapi;
