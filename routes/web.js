const express = require('express')
const AboutController = require('../controllers/admin/AboutController')
const AdminController = require('../controllers/admin/AdminController')
const BlogController = require('../controllers/admin/BlogController')
const CategoryController = require('../controllers/admin/CategoryController')
const ContactControllerr = require('../controllers/admin/ContactController')
const FrontController = require('../controllers/Frontcontroller')
const TeacherController = require('../controllers/TeacherController')

const router = express.Router()


//route//path
router.get('/',FrontController.home)//method
router.get('/featured',FrontController.featured)//method
router.get('/contact',FrontController.contact)//method
router.get('/blog',FrontController.blog)//method
router.get('/aboutus',FrontController.aboutus)//method
router.get('/login',FrontController.login)//method
router.get('/explore',FrontController.explore)//method
router.get('/register',FrontController.register)//method
router.get('/readmore/:id',FrontController.readmore)//method
router.get('/pricing',FrontController.pricing)






//admin controller
router.get('/admin/dashboard',AdminController.dashboard)
router.post('/adminregister',AdminController.register)
router.post('/verifylogin',AdminController.verifylogin)
router.get('/logout',AdminController.logout)

//blog controller
router.get('/admin/blogdisplay',BlogController.blogDisplay)
router.post('/insertblog',BlogController.insertblog)
router.get('/admin/blogview/:id',BlogController.blogview)
router.get('/admin/blogedit/:id',BlogController.blogedit)
router.post('/blogupdate/:id',BlogController.blogUpdate)
router.get('/admin/blogdelete/:id',BlogController.blogdelete)

// category controller

router.get('/admin/categorydisplay',CategoryController.categorydisplay)
router.post('/insertcategory',CategoryController.insertcategory)
router.get('/admin/categoryview/:id',CategoryController.categoryview)
router.get('/admin/categoryedit/:id',CategoryController.categoryedit)
router.post('/categoryupdate/:id',CategoryController.categoryupdate)
router.get('/admin/categorydelete/:id',CategoryController.categorydelete)


//about controller
router.get('/admin/aboutdisplay',AboutController.aboutdisplay)
router.post('/insertabout',AboutController.insertabout)
router.get('/admin/aboutview/:id',AboutController.aboutview)
router.get('/admin/aboutedit/:id',AboutController.aboutedit)
router.post('/aboutupdate/:id',AboutController.aboutupdate)
router.get('/admin/aboutdelete/:id',AboutController.aboutdelete)


//contact controller
router.get('/admin/contactdisplay',ContactControllerr.contactdisplay)
router.post('/addcontact',ContactControllerr.addcontact)






//teacher
router.get('/teacher/display',TeacherController.ddisplay)
router.get('/teacher/create',TeacherController.create)

module.exports = router