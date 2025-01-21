const {query} = require("express");
const Products=require("../models/productmodel");

//filter //Sort // pagination  
class APIfeatures{
    constructor(query,queryString)
    {
        this.query=query;
        this.queryString=queryString
    }
 filtering()
 {
    const queryObj={...this.queryString}
   
    const excludedFields=['page','sort','limit']
    excludedFields.forEach(eL=>delete(queryObj[eL]))
    
    let queryStr= JSON.stringify(queryObj)
    queryStr=queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match=>'$'+match)
  

    this.query.find(JSON.parse(queryStr))
    return this 
    
 }
 sorting()
 {
    if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        console.log("Sorting by:", sortBy); 
        this.query = this.query.sort(sortBy);
    } else {
        this.query = this.query.sort('-createdAt');
    }
        return this
 }
 pagination()
 {
    const page=this.queryString.page * 1 || 1;
    const limit= this.queryString.limit *1 || 9;
    const skip= (page-1) * limit;
    this.query=this.query.skip(skip).limit(limit);

    return this 

 }
}
const productctrl= {
    getproduct: async(req,res)=>{
        try{
            console.log(req.query);
            const features=new APIfeatures(Products.find(),req.query|| {} ).filtering().sorting().pagination();
              const products=await features.query

              res.json({products})

        }catch(err)
        {
            res.status(500).json({msg:err.message})
        }
        
    },
    createproduct: async(req,res)=>{
        try{
            const {product_id,title,price,description,content,images,category}=req.body;
               
            if(!images) return res.status(400).json({msg:"Image Not Found!"})
          
            const product= await Products.findOne({product_id});
            
            if(product) return res.status(400).json({msg:"Prodcuts Already Exists"});

            const newProduct= new Products({
                product_id,title : title.toLowerCase(),price,description,content,images,category
            })
            await newProduct.save();
            res.json({msg:"Created"});
        }catch(err)
        {
            res.status(500).json({msg:err.message})
        }
        
    },
    updateproduct: async(req,res)=>{
        try{
                const {product_id,title,price,description,content,images,category}=req.body

                if(!images)  return res.status(500).json({msg:"No Image Uploaded"})
                
                await  Products.findOneAndUpdate({_id:req.params.id},{
                    title:title.toLowerCase(),price,description,content,images,category
                })
                    res.json({msg:"Updated a Product"})
        }catch(err)
        {
            res.status(500).json({msg:err.message})
        }   
        

    },
    deleteproduct: async(req,res)=>{
        try{
                await Products.findByIdAndDelete(req.params.id)
                res.json({msg:"Deleted"})
        }catch(err)
        {
            res.status(500).json({msg:err.message})
        }
        

    }
}

module.exports=productctrl;