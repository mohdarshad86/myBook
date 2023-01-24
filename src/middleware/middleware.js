
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const bookModel = require("../models/bookModel");

const authentication = function (req, res, next) {
    try {
        const token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({ status: false, msg: "Header token is required !" });
        }
        jwt.verify(token, 'secretKeyProject4', function (err, decoded) {
            if (err) {
                 let msg = err.message == "jwt expired" ? "Token is expired" : "Token is invalid"
             return res.status(401).send({message: msg})
            }
            else {
                req.decodedToken = decoded
                next()
            }
        });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}

const authorization = async function(req,res,next){
    try {
        const bookId = req.params.bookId
       const userId = req.decodedToken.userId
        if (!bookId) {
            return res.status(400).send({ status: false, message: "please provide book id" });
        }
        if(!mongoose.isValidObjectId(bookId)){
            return res.status(400).send({ status: false, message: "please provide valid book id" });
        }

        const checkId = await bookModel.findById(bookId)
        if(!checkId){
            return res.status(404).send({ status: false, message: "Book id doesn't exist" });
        }
       if(checkId.userId != userId){
        return res.status(403).send({ status: false, message: "Unauthorised access" });
        
       }
      
       next()
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

const createBookAuth = async function(req,res,next){
    try {
        const tokenUserId = req.decodedToken.userId
        const userID = req.body.userId
        if(tokenUserId != userID){
            return res.status(403).send({ status: false, message: "user Unauthorised access" });
        }
        next()
    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = {authentication, authorization,createBookAuth}