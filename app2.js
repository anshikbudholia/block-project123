const express = require('express');
var session = require('express-session')
var flash = require('connect-flash');
const app = express()
const port = 3000
const web = require('./routes/web')
const connectdb = require('./db/connetdb')
const fileUpload = require("express-fileupload")

var cloudinary = require('cloudinary');
var path = require('path')

//cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())



// database connection
connectdb()

//file convert url data in json form
app.use(express.urlencoded({extended:false}))


app.use(fileUpload({useTempFiles: true}))

//for flash message

app.use(session({
  secret:'secret',
  cookie:{maxAge:60000},
  resave:false,
  saveUninitialized:false,
 
}));



app.use(flash());


//router load
app.use('/',web)


//ejs setup
app.set('view engine', 'ejs')

 


//public folder setup
app.use(express.static('public'))


//server create
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

