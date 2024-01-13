const ContactModel = require("../../models/contact")

class ContactControllerr{


    static contactdisplay=async (req,res)=>{
      try{
        const display = await ContactModel.find()
      console.log(display)
     res.render('admin/contact/display',{d:display})
      }
      catch(error){
        console.log(error)
      }
    }
    
    static addcontact = async(req,res)=>{
        try{
            const add = await new ContactModel({
              
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                message:req.body.message
            })
            await add.save()
            res.redirect('/contact')
        }
        catch(error){
            console.log(error)
        }
    }
    
    }
    
    module.exports =ContactControllerr