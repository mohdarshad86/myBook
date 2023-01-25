const mongoose = require('mongoose')
const bookModel = require('../models/bookModel')
const reviewModel = require('../models/reviewModel')

/*
POST /books/:bookId/review

Add a review for the book in reviews collection.
Check if the bookId exists and is not deleted before adding the review. Send an error response with appropirate status code like this if the book does not exist
Get review details like review, rating, reviewer's name in request body.
Update the related book document by increasing its review count
Return the updated book document with reviews data on successful operation. The response body should be in the form of JSON object like this
*/

const reviewCreate = async function (req, res) {

    try {
        const bookIdByparam = req.params.bookId
        let bodyData = req.body
        const { bookId, reviewedBy, reviewedAt, rating, review } = bodyData
        if (!bookIdByparam) {
            return res.status(400).send({ status: false, messsage: "Provide book id" })
        }
        if (!mongoose.isValidObjectId(bookIdByparam)) {
            return res.status(400).send({ status: false, message: "provide valid book id" })
        }
        const checkBookId = await bookModel.findOne({ _id: bookIdByparam, isDeleted: false })
        if (!checkBookId) {
            return res.status(404).send({ status: false, message: "book id not found" })
        }
        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Provide some details to create review" })
        }
        if (!bookId) {
            return res.status(400).send({ status: false, messsage: "book id is mandatory" })
        }
        if (!mongoose.isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "provide valid book id" })
        }
        const checkBookIdbyBody = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!checkBookIdbyBody) {
            return res.status(404).send({ status: false, message: "book id not found" })
        }

        if (!reviewedBy) {
            return res.status(400).send({ status: false, messsage: "Please provide valid reviewer name" })
        }
        if (typeof (reviewedBy) != "string") {
            return res.status(400).send({ status: false, messsage: "Please provide  reviewer name in string" })
        }
        if (!reviewedAt) {
            return res.status(400).send({ status: false, messsage: "please provide date" })
        }
        console.log(Date.now())
        if (typeof (reviewedAt) != Date.now()) {
            return res.status(400).send({ status: false, messsage: "Please  provide  valid Date" })
        }
        
        if (!rating) {
            return res.status(400).send({ status: false, messsage: "Please provide ratings" })
        }
        if (typeof (rating) != "number") {
            return res.status(400).send({ status: false, messsage: "Please  provide  valid ratings" })
        }
        if (!(rating >= 1 && rating <= 5)) {
            return res.status(400).send({ status: false, messsage: "Please provide valid ratings from 1-5" })
        }

        if (review) {
            if (typeof (review) != "string") {
                return res.status(400).send({ status: false, messsage: "Please provide valid review" })
            }
        }


        const createReview = await reviewModel.create(bodyData)
       

        const selectData = {
            _id: createReview._id,
            bookId: createReview.bookId,
            reviewedBy: createReview.reviewedBy,
            reviewedAt: createReview.reviewedAt,
            rating: createReview.rating,
            review: createReview.review
        }
        await bookModel.findOneAndUpdate({_id:bookId,isDeleted:false},{$inc:{reviews:+1}},{new:true}).lean()

        return res.status(200).send({ status: true, message: "Successfully created", data: selectData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }




}


module.exports = { reviewCreate }


