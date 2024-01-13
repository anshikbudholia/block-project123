const BlogModel = require('../../models/Blog')
var cloudinary = require('cloudinary').v2;


cloudinary.config({ 
    cloud_name: 'dbpadjalk', 
    api_key: '986116782299945', 
    api_secret: 'eMjPBBGnu-dNnWhDbfb13TtHBNU',
    //secure: true
  });


class BlogController {



    static blogDisplay = async (req, res) => {

        try {
            const data = await BlogModel.find()
            console.log(data)
            res.render('admin/blog/display',{d:data})

        } catch (error) {
            console.log(error)
        }
    }
    // static insertblog = async (req,res) => {
    // try {
    // console.log(req.body)
    //const result = new BlogModel({
    // title:req.body.title,
    //description:req.body.description



    //})

    //await result.save()

    //console.log(result)
    //route url
    // res.redirect('/admin/blogdisplay')

    //   } catch (error) {
    // console.log(error)
    // }
    //}

    static insertblog=async(req,res)=>{
        try {
           // console.log(req.files.image)
           const file = req.files.image
           const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
            folder:'blockImage'
           })

           const result = new BlogModel({
            title:req.body.title,
            description:req.body.description,
            image:{
                public_id:myimage.public_id,
                url: myimage.secure_url
            }

           })

           await result.save()
           res.redirect('/admin/blogdisplay')

           //console.log(myimage)
            //const result = await BlogModel.create(req.body)
            //console.log(result)
            //res.redirect('/admin/blogdisplay')
        }
        catch (error) {
            console.log(error)
        }
    }

    
    
    static blogview= async (req, res)=>{

        try{
            const result = await BlogModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/blog/view',{view:result})
        }
        catch(error){
            console.log(error)
        }
    }



    static blogedit= async (req, res)=>{

        try{
            const result = await BlogModel.findById(req.params.id)
            // console.log(result)
            res.render('admin/blog/edit',{edit:result})
        }
        catch(error){
            console.log(error)
        }
    }


    static blogUpdate = async(req, res)=>{

        try{
           // console.log(req.body)
            //console.log(req.params.id)
            //first use delete image
            const blog = await BlogModel.findById(req.params.id)
            const imageid = blog.image.public_id
            //console.log(imageid)
            await cloudinary.uploader.destroy(imageid)           
            
            //update image
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
             folder:'blockImage'
            })

           const update = await BlogModel.findByIdAndUpdate(req.params.id,{

            title:req.body.title,
            description:req.body.description,
            image:{
                public_id:myimage.public_id,
                url: myimage.secure_url
            }
            
           })

           await update.save() 
           res.redirect('/admin/blogdisplay')
        }
        catch(error){
            console.log(error)
        }
    }

    static blogdelete= async(req, res)=>{

        try{

            // delete image code

            const blog = await BlogModel.findById(req.params.id)
            const imageid = blog.image.public_id
            //console.log(imageid)
            await cloudinary.uploader.destroy(imageid)


           await BlogModel.findByIdAndDelete(req.params.id)

           res.redirect('/admin/blogdisplay')
        }
        catch(error){
            console.log(error)
        }
    }

}

module.exports = BlogController

