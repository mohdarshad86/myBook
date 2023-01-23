const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const auth = require("../middleware/middleware")


router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)
router.post('/books', auth.authentication,bookController.createBook)
router.get('/books',auth.authentication,bookController.getBook)


router.all('/*',function(){
    console.log("invalid http request")
})

module.exports = router