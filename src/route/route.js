const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")



router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)

router.all('/*',function(){
    console.log("invalid http request")
})

module.exports = router