const AboutModel = require('../../models/about')
var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dbpadjalk',
  api_key: '986116782299945',
  api_secret: 'eMjPBBGnu-dNnWhDbfb13TtHBNU',
  //secure: true
});


class AboutController {

  static aboutdisplay = async (req, res) => {
    try {
      const result = await AboutModel.find()
     // console.log(data)
      res.render('admin/about/display', { a:result })
    }

    catch (error) {
      console.log(error)
    }
  }



  static insertabout = async (req, res) => {
    try {
      const file = req.files.image
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'blockImage'
      })

      const result = new AboutModel({
        about: req.body.about,

        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url
        }
      })
      await result.save()
      res.redirect('/admin/aboutdisplay')


      //console.log(myimage)
      // console.log(req.files.image)
      //const result = new AboutModel({
      //about:req.body.about
      //})

      //await result.save()
      //console.log(result)
      //res.redirect('/admin/aboutdisplay')
    }

    catch (error) {
      console.log(error)
    }
  }

  static aboutview = async (req, res) => {
    try {
      const result = await AboutModel.findById(req.params.id)
      //console.log(result)
      res.render('admin/about/view', { view: result })
    }
    catch (error) {
      console.log(error)
    }
  }

  static aboutedit = async (req, res) => {
    try {
      const result = await AboutModel.findById(req.params.id)
      //console.log(result)
      res.render('admin/about/edit', { edit: result })
    }
    catch (error) {
      console.log(error)
    }
  }

  static aboutupdate = async (req, res) => {
    try {
      // console.log(req.body)
      //console.log(req.params.id)
      const about = await AboutModel.findById(req.params.id)
      const imageid = about.image.public_id
      //console.log(imageid)
      await cloudinary.uploader.destroy(imageid)
      //update image
      const file = req.files.image
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'blockImage'
      })
      const update = await AboutModel.findByIdAndUpdate(req.params.id, {
        about: req.body.about,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url
        }

      })
      await update.save()
      res.redirect('/admin/aboutdisplay')
    }
    catch (error) {
      console.log(error)
    }
  }

  static aboutdelete = async (req, res) => {
    try {
      const about = await AboutModel.findById(req.params.id)
      const imageid = about.image.public_id
      //console.log(imageid)
      await cloudinary.uploader.destroy(imageid)

      await AboutModel.findByIdAndDelete(req.params.id)

      res.redirect('/admin/aboutdisplay')
    }
    catch (error) {
      console.log(error)
    }
  }
}

module.exports = AboutController