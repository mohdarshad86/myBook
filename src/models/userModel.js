const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },

    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    }, //valid email, unique handle krenge controller me 

    password: {
        type: String,
        required: true
    },// minLen 8, maxLen 15 controller me handle krenge 


    address: {
         street: {type: String},
         city: {type: String},
         pincode: {type: String}

        },
   
},
{ timestamp: true })

module.exports = mongoose.model('user', userSchema)