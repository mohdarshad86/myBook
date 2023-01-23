/*

POST /register
Create a user - atleast 5 users
Create a user document from request body.
Return HTTP status 201 on a succesful user creation. Also return the user document. The response should be a JSON object like this
Return HTTP status 400 if no params or invalid params received in request body. The response should be a JSON object like this

POST /login

Allow an user to login with their email and password.
On a successful login attempt return a JWT token contatining the userId, exp, iat. The response should be a JSON object like this
If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like this

 title: {string, mandatory, enum[Mr, Mrs, Miss]},
  name: {string, mandatory},
  phone: {string, mandatory, unique},
  email: {string, mandatory, valid email, unique}, 
  password: {string, mandatory, minLen 8, maxLen 15},
  address: {
    street: {string},
    city: {string},
    pincode: {string}
  },


*/
const emailRegx = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,15}$/;
const phoneRegx = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;

const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')

const userRegister = async function (req, res) {
    try {
        const userData = req.body;
        const { name, phone, title, password, email } = userData;

        if (Object.keys(userData).length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "provide key" });
        }

        if (!title) {
            return res
                .status(400)
                .send({ status: false, message: "title is mandatory" });
        }

        if (!["Mr", "Mrs", "Miss"].includes(title)) {
            return res
                .status(400)
                .send({ status: false, message: "please provide valid title" });
        }

        if (!name) {
            return res
                .status(400)
                .send({ status: false, message: "name is mandatory" });
        }

        if (typeof (name) != "string") {

            return res
                .status(400)
                .send({ status: false, message: "name must be in string" });

        }


        if (!phone) {
            return res
                .status(400)
                .send({ status: false, message: "phone is mandatory " });
        }

        if (typeof (phone) != "string") {
            return res
                .status(400)
                .send({ status: false, message: "enter valid phone number" })
        }
        if (!phoneRegx.test(phone)) {
            return res
                .status(400)
                .send({ status: false, message: "enter valid phone number" });
        }
        const phoneExist = await userModel.findOne({ phone: phone });
        if (phoneExist) {
            return res
                .status(400)
                .send({ status: false, message: "phone is already exist" });
        }
        if (!email) {
            return res
                .status(400)
                .send({ status: false, message: "email is mandatory" });
        }

        if (!emailRegx.test(email)) {
            return res
                .status(400)
                .send({ status: false, message: "enter valid email id" });
        }
        const emailExist = await userModel.findOne({ email: email });
        if (emailExist) {
            return res
                .status(400)
                .send({ status: false, message: "email is already exist" });
        }

        if (!password) {
            return res
                .status(400)
                .send({ status: false, message: "password is mandatory" });
        }

        if (!passwordRegx.test(password)) {
            return res
                .status(400)
                .send({ status: false, message: "Password should contain atleast 1 lowercase, 1 uppercase, 1 numeric ,1 special character, range between 8-12" });
        }
        const registeredData = await userModel.create(userData);
        res
            .status(201)
            .send({ status: true, message: "Success", data: registeredData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}
/* POST /login

Allow an user to login with their email and password.
On a successful login attempt return a JWT token contatining the userId, exp, iat. The response should be a JSON object like this
If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like this
*/

const userLogin = async function(req,res){
    try {
        let data = req.body
        let {email, password} = data
        if(Object.keys(data).length==0){
            return res.status(400).send({status: false, message: "Please provide mandatory details"})
        }
        if(!email){
            return res.status(400).send({status: false, message: "Please provide email-id"})
        }
        if (!emailRegx.test(email)) {
            return res
              .status(400)
              .send({ status: false, message: "please provide valid email id" });
          }
        if(!password){
            return res.status(400).send({status: false, message: "Please provide password"})
        }

        if (!passwordRegx.test(password)) {
            return res
              .status(400)
              .send({ status: false, message: "Please provide valid password" });
          }
        
        const userDetail = await userModel.findOne({email:email, password: password})
        if(!userDetail){
            return res.status(400).send({status: false, message: "invalid login credential"})
        }

        let token = jwt.sign({
            userId: userDetail._id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60),  // expires in 1 hour
            // iat: Math.floor(Date.now() / 1000),
        },"secretKeyProject4")

        res.status(200).send({status: true, message:"successfully login", data: token})

    } catch (error) {
        res.status(500).send({status: false, message: error.message})
    }
}



module.exports = { userRegister, userLogin }