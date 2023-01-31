const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const reviewController = require("../controllers/reviewController")
const auth = require("../middleware/middleware")
const aws = require("aws-sdk")
const bookModel = require('../models/bookModel')





aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let bookCoverUpload = async (file)=>{
    return new Promise(function(resolve,reject){
        let s3 = new aws.S3({apiVersion:"2006-03-01"})

   

 var uploadParams = {
    ACL:"public-read",
    Bucket:"classroom-training-bucket",
    Key:"abc/" + file.originalname,
    Body:file.buffer
 }

s3.upload(uploadParams , function(err,data){
    if(err){
        return reject ({"error":err})
    }

    console.log(data)

    console.log("file Uploaded successfully");

    return resolve(data.Location)

} )

})
}


router.post("/write-file-aws", async function(req,res){

    try{

        let bookCover = req.files

        if(!bookCover){ return res.status(400).send({status:false , message:"Please provide Book Cover"})}
       
console.log(typeof(bookCover))

        let updatedFileURL = await bookCoverUpload(bookCover[0])

return res.status(201).send({status:true , data:updatedFileURL})

    }catch(err){
        return res.status(500).send({status:false , message:err.message})
    }

} )










// ==== user ===
router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)

//========book ====
router.post('/books', auth.authentication,auth.createBookAuth,bookController.createBook)
router.get('/books',auth.authentication,bookController.getBook)
router.get('/books/:bookId', auth.authentication,bookController.getBookParams)
router.put('/books/:bookId',auth.authentication,auth.authorization,bookController.updateBook )
router.delete('/books/:bookId',auth.authentication,auth.authorization, bookController.deletBook)


//====== review 
router.post('/books/:bookId/review', reviewController.reviewCreate)
router.put('/books/:bookId/review/:reviewId', reviewController.updateReview)
router.delete('/books/:bookId/review/:reviewId', reviewController.reviewDeletion)



router.all("/*", function(req,res){
    res.status(400).send({status : false, message:"invalid http request"})
})

module.exports = router