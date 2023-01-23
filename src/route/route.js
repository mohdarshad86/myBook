const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")


router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)
router.post('/books', bookController.createBook)


router.all('/*',function(){
    console.log("invalid http request")
})

module.exports = router