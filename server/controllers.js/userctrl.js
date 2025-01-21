const Users = require('../models/usermodels')

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");


const userctrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const hashpassword = await bcrypt.hash(password, 10);

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "Email already Registered" })
            if (password.length < 6)
                return res.status(400).json({ msg: "Password Should be more than six char" })

            const newUser = new Users({
                name, email, password: hashpassword
            })  
            await newUser.save();


            // Create JWT  to user authentication!

            const accessToken = createAccessToken({ id: newUser._id });
            const RefreshToken = createRefreshToken({ id: newUser._id });
            res.cookie('RefreshToken', RefreshToken, {
                httpOnly: true,
                path: "/user/refresh_token"
            })
            res.json({ user,accessToken })
        }
        catch (err) {
            res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" });
    
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Invalid or Expired Token" });
    
                console.log("Token User ID:", user.id); // Debug: Ensure this is the correct user
                const accessToken = createAccessToken({ id: user.id });
                res.json({ user, accessToken });
            });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    login:async(req,res)=>{
        try{
            const{email,password}=req.body;
            const user=await Users.findOne({email});
            if(!user)
            {
                 return res.status(400).json({msg:"Please Register"});
            }
                const isMatch= await bcrypt.compare(password,user.password);
                if(!isMatch)
                {
                     return res.status(400).json({msg:"Wrong Credentials"});
                }

                const accessToken=createAccessToken({id:user._id});
                const refreshtoken=createRefreshToken({id:user._id})
                res.clearCookie('refreshtoken', { path: "/user/refresh_token" });
                res.cookie('refreshtoken',refreshtoken,{
                    httpOnly:true,
                    path:'user/refresh_token',
                    sameSite: 'strict',
                })

                res.json({accessToken})
        }catch(err)
        {
              return   res.status(500).json({msg:err.message})
        }
    },
    logout:async(req,res)=>{
            try{
                res.clearCookie('refreshtoken',{path:"/user/refresh_token"})
                return res.json({msg:"Logged out"})
            }catch(err)
            {
                res.status(500).json({msg:err.message})
            }
    },
    getUser:async(req,res)=>{
        try{
            const user=await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg:"User not found"})
                res.json({role:user.role,user})
        }catch(err)
        {
            res.json({msg:err.message})
        }
    }
}


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })

}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userctrl;