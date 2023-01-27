const mongoose = require('mongoose')
const bookModel = require('../models/bookModel')
const reviewModel = require('../models/reviewModel')

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
            bodyData.reviewedBy = "Guest"
        }
        if (typeof (reviewedBy) != "string") {
            return res.status(400).send({ status: false, messsage: "Please provide  reviewer name in string" })
        }
        if (!reviewedAt) {
            return res.status(400).send({ status: false, messsage: "please provide date" })
        }
        
        if (!rating) {
            return res.status(400).send({ status: false, messsage: "Please provide ratings" })
        }
        if (typeof (rating) != "number") {
            return res.status(400).send({ status: false, messsage: "Please  provide  valid ratings" })
        }
        if (rating < 1 || rating > 5) {
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
        await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, { $inc: { reviews: +1 } }, { new: true }).lean()

        return res.status(200).send({ status: true, message: "Successfully created", data: selectData })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }




}


const updateReview = async function (req, res) {
    const bookId = req.params.bookId
    const reviewId = req.params.reviewId
    const dataReview = req.body
    const { review, rating, reviewedBy } = dataReview

    try {

        if (!bookId) { return res.status(400).send({ status: false, message: "Please provide book id" }) }

        if (!mongoose.isValidObjectId(bookId)) { return res.status(400).send({ status: false, message: "Please provide valid book id" }) }

        const checkBookId = await bookModel.findOne({ _id: bookId, isDeleted: false })

        if (!checkBookId) { return res.status(404).send({ status: false, message: "not found any data by this id" }) }
       
        if (!reviewId) { return res.status(400).send({ status: false, message: "Please provide review id" }) }

        if (!mongoose.isValidObjectId(reviewId)) { return res.status(400).send({ status: false, message: "Please provide valid review id" }) }

        const checkReview = await reviewModel.findOne({ _id: reviewId, isDeleted: false })

        if (!checkReview) { return res.status(404).send({ status: false, message: "not found any data by review id" }) }
        
        if (Object.keys(dataReview).length == 0) { return res.status(400).send({ status: false, message: "Please provide some fields to update" }) }

        if (review || rating || reviewedBy) {

            if (rating) {
                if (rating < 1 || rating > 5) {
                    return res.status(400).send({ status: false, messsage: "Please provide valid ratings from 1-5" })
                }
            }

            let update = await reviewModel.findOneAndUpdate({ _id: reviewId },
                { $set: { review: review, rating: rating, reviewedBy: reviewedBy } }, { new: true })

            return res.status(200).send({ status: true, data: update })
        }
        return res.status(400).send({status : false, message : "Please provide valid key-value pair to update review"})
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}


const reviewDeletion = async function (req, res) {

    try {

        const bookId = req.params.bookId
        const reviewId = req.params.reviewId

        if (!bookId)
            return res.status(400).send({ status: false, message: "Please provide bookId" })

        if (!reviewId)
            return res.status(400).send({ status: false, message: "Please provide reviewId" })

        if (!mongoose.isValidObjectId(bookId))
            return res.status(400).send({ status: false, message: "Please provide valid bookId" })

        if (!mongoose.isValidObjectId(reviewId))
            return res.status(400).send({ status: false, message: "Please provide valid reviewId" })

        const findBook = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!findBook)
            return res.status(404).send({ status: false, message: "No such book found" })

        const findReview = await reviewModel.findOne({ _id: reviewId, isDeleted: false })
        if (!findReview)
            return res.status(404).send({ status: false, message: "No such review found" })

      

        let bookData = await bookModel.findById({_id: bookId})
        if(bookData.reviews > 0){
        await bookModel.findOneAndUpdate({ _id: bookId }, { $inc: { reviews : -1 } }, {new : true})
        return res.status(200).send({ status: true, message: "review deleted successfully" })
        }

        
        return res.status(400).send({ status: true, message: "no review " })
        
        
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}



module.exports = { reviewCreate, updateReview, reviewDeletion}


