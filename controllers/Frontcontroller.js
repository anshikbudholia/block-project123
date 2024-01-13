const BlogModel = require('../models/Blog')
const CategoryModel = require('../models/category')
const AboutModel = require('../models/about')

class FrontController{
    
    static home =async(req,res)=>{
        try{
            const blogs = await BlogModel.find().sort({id:-1}).limit(6)
            console.log(blogs)
        res.render('home',{b:blogs})
    }

    catch(error){
        console.log(error)
    }
}


    static featured =(req,res)=>{
        res.render('featured')
    }

    static contact =(req,res)=>{
        res.render('contact')
    }
    
    static pricing =(req,res)=>{
        res.render('pricing')
    }
    

    static blog =async(req,res)=>{
    try{
        const blogs = await BlogModel.find().sort({_id:-1})
        //console.log(blogs)
        res.render('blog',{b:blogs})
    }
          catch(error){
            console.log(error)
          }
       }
       

    static aboutus =async(req,res)=>{
        try{
            const about = await AboutModel.findOne()
            //console.log(about)
            res.render('aboutus',{a:about})
        }
        catch(error){
            console.log(error)
        }
    }

    static login = async (req,res)=>{
   try{
    res.render('login',{message:req.flash('error')})
   }
   catch(error){
    console.log(error)

   }
      
    }      

    

    static register = async (req,res)=>{
       try{
        res.render('register',{message:req.flash('error')})  
       }
       catch(error){
        console.log(error)
       }

    }
    static readmore =async (req,res)=>{
        try{
            //console.log(req.params.id)
            const detail = await BlogModel.findById(req.params.id)
            const recentblogs = await BlogModel.find().limit(6)
            const category = await CategoryModel.find()
            res.render('readmore',{d:detail,r:recentblogs,c:category})
        }
       catch(error){
        console.log(error)
       }

}
    
    static explore =(req,res)=>{
        res.render('explore')
    }
    

   
      

}
module.exports=FrontController