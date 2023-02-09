const express = require("express")
const mongoose = require("mongoose")
const route = require("./route/route")
const multer = require("multer")
const app = express()

var cors = require('cors')

app.use(express.json())

app.use(cors())

app.use(multer().any())

mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://Chetan_ProjectClustor:PNr1Fn8OcRu2cGmk@project1.h4p8xqh.mongodb.net/group13Database", {
    useNewUrlParser: true,
})
    .then(() => console.log("DB is Connected"))
    .catch(error => console.log(error))

app.use("/", route)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})