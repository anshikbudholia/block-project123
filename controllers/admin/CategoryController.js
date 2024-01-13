const CategoryModel = require('../../models/category')
var cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dbpadjalk', 
    api_key: '986116782299945', 
    api_secret: 'eMjPBBGnu-dNnWhDbfb13TtHBNU',
    //secure: true
  });



class CategoryController {


    static categorydisplay = async(req, res) => {
         try{
            const data = await CategoryModel.find()
            console.log(data)
            res.render('admin/Category/display',{d:data})
         }
        
        catch(error){
          console.log(error)
        }
    }
    static insertcategory = async(req, res) => {
        try {
           // console.log(req.files.image)
           const file = req.files.image
           const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
            folder:'blockImage'
           })
           const result = new CategoryModel({
            cat_name:req.body.cat_name,
            description:req.body.description,
            image:{
                public_id:myimage.public_id,
                url:myimage.secure_url
            }
           })
           await result.save()
           res.redirect('/admin/categorydisplay')

           //console.log(myimage)
           //const result = new CategoryModel({
            //cat_name:req.body.cat_name,
            //description:req.body.description
          // })

          // await result.save()
           //console.log(result)
           //res.redirect('/admin/categorydisplay')
        }
        catch (error) {
            console.log(error)
        }
    }
static categoryview = async(req,res)=>{
    try{

       const result = await CategoryModel.findById(req.params.id)
      //console.log(result)
    res.render('admin/category/view',{view:result})

    }
    catch(error){
        console.log(error)
    }
}
static categoryedit = async(req,res)=>{
    try{

       const result = await CategoryModel.findById(req.params.id)
      //console.log(result)
    res.render('admin/category/edit',{edit:result})

    }
    catch(error){
        console.log(error)
    }
}

static categoryupdate = async(req,res)=>{
    try{
    //console.log(req.body)
    //console.log(req.params.id)
    // delete
    const category =await CategoryModel.findById(req.params.id)
    const imageid = category.image.public_id
    //console.log(imageid)
    await cloudinary.uploader.destroy(imageid)
// update
    const file = req.files.image
    const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
     folder:'blockImage'
    })

    const update = await CategoryModel.findByIdAndUpdate(req.params.id,{
        cat_name:req.body.cat_name,
         description:req.body.description,
         image:{
            public_id:myimage.public_id,
            url:myimage.secure_url
        }
    })
    await update.save()
    res.redirect('/admin/categorydisplay')
    }
    catch(error){
        console.log(error)
    }
}

static categorydelete = async(req,res)=>{
    try{
    const category =await CategoryModel.findById(req.params.id)
    const imageid = category.image.public_id
    //console.log(imageid)
    await cloudinary.uploader.destroy(imageid)
  await CategoryModel.findByIdAndDelete(req.params.id)

   
    res.redirect('/admin/categorydisplay')
    }
    catch(error){
        console.log(error)
    }
}


}

module.exports = CategoryController