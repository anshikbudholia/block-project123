const AdminModel = require('../../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class AdminController {


  static dashboard = async (req, res) => {
   try{
  
    res.render('admin/dashboard')


   }catch(error){
    console.log(error)
   }
  }
  static register = async (req, res) => {
    try {
      console.log(req.body)
      const { name, email, password, confirmpassword } = req.body
      const admin = await AdminModel.findOne({ email: email })

      if (admin) {
        req.flash('error', 'Email already exit')
        res.redirect('/register')
      }
      else {

        if (name && email && password && confirmpassword) {


          if (password == confirmpassword) {
          //const hashpassword = await bcrypt.hash(password,10)

            const register = await new AdminModel({

              name: name,
              email: email,
              password:password


            })

            await register.save()
            res.redirect('/login')



          } else {
            req.flash('error', 'Password and ConfirmPassword does not match')
            res.redirect('/register')
          }

        } else {
          req.flash('error', 'All field are required')
          res.redirect('/register')
        }
      }

      //console.log(req.body)
    }

    catch (error) {
      console.log(error)
    }
  }

  static verifylogin = async(req,res)=>{
    try{
     //console.log(req.body)
    const {email,password} = req.body
     if(email && password){

      const admin = await AdminModel.findOne({email:email})
      if(admin != null){
        const ismatched = await bcrypt.compare(password,admin.password)

        if(ismatched){
          // generate webtoken
         // const token = jwt.sign({id:admin._id},'anshii123')
          //console.log(token)
          res.redirect('/admin/dashboard')
        }else{
          req.flash('error', 'Email or Password doesnot matched')
        res.redirect('/login')
        }

      }else{
       // req.flash('error', 'you are not register user')
       const token = jwt.sign({password:email},'anshii123')
       //console.log(token)
       res.cookie('token',token)
        res.redirect('/admin/dashboard')
    }

     }else{
      req.flash('error', 'All field are required')
      res.redirect('/login')
     }
    }
    catch(error){
     console.log(error)
    }
     
   }      


   static logout = async(req,res)=>{
    
    try{
      res.clearCookie('token')
      res.redirect('/login')
    }catch(error){
      console.log(error)
    }

   }
    

 
}

module.exports = AdminController