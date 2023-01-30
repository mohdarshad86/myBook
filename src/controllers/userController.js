const userModel = require("../models/userModel.js");
const {
  validName,
  validEmail,
  validPassword,
  validMobileNo,
  validPincode,
  validPlace,
} = require("../validations/validation");
const jwt = require("jsonwebtoken");

const createUser = async function (req, res) {
  try {
    let userData = req.body;
    let { title, name, phone, email, password, address } = userData;

    if (Object.keys(userData).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Request can't be empty" });
    }

    if (title && typeof title != "string") {
      return res
        .status(400)
        .send({ status: false, message: "Title must be in string" });
    }

    if (!title || !title.trim()) {
      return res.status(400).send({
        status: false,
        message: "Title must be required or can't be empty",
      });
    }

    if (!["Mr", "Mrs", "Miss"].includes(title.trim())) {
      return res.status(400).send({
        status: false,
        message: "please use a valid title as Mr,Mrs,Miss",
      });
    }

    if (name && typeof name != "string") {
      return res
        .status(400)
        .send({ status: false, message: "Name must be in string" });
    }

    if (!name || !name.trim()) {
      return res.status(400).send({
        status: false,
        message: "Name must be required or it can't be empty",
      });
    }

    if (!validName(name.trim())) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid name" });
    }

    if (phone && typeof phone != "string") {
      return res
        .status(400)
        .send({ status: false, message: "Phone must be in string" });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).send({
        status: false,
        message: "Phone number must be required or can't be empty",
      });
    }

    if (!validMobileNo(phone.trim())) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid indian format number" });
    }

    if (email && typeof email != "string") {
      return res
        .status(400)
        .send({ status: false, message: "Email must be in string" });
    }

    if (!email || !email.trim()) {
      return res.status(400).send({
        status: false,
        message: "Email must be required or email can't be empty",
      });
    }

    if (!validEmail(email.trim())) {
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid email" });
    }

    const checkUnique = await userModel.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (checkUnique) {
      if (checkUnique.email == email)
        return res
          .status(400)
          .send({ status: false, message: "email already in use" });
      if (checkUnique.phone == phone)
        return res
          .status(400)
          .send({ status: false, message: "phone already in use" });
    }

    if (password && typeof password != "string") {
      return res
        .status(400)
        .send({ status: false, message: "Password must be in string" });
    }

    if (!password || !password.trim()) {
      return res.status(400).send({
        status: false,
        message: "Password must be present",
      });
    }

    if (!validPassword(password.trim())) {
      return res.status(400).send({
        status: false,
        message:
          "Password Must be 8-15 length, Alphanumeric with a special character",
      });
    }

    if (address) {
      if (typeof address != "object") {
        return res.status(400).send({
          status: false,
          message: "Address must be in Object format",
        });
      }

      let { street, city, pincode } = address;

      if (street && typeof street != "string") {
        return res
          .status(400)
          .send({ status: false, message: "Street must be in string" });
      }

      if (!street || !street.trim()) {
        return res.status(400).send({
          status: false,
          message: "Street must be required or Street can't be empty",
        });
      }

      if (city && typeof city != "string") {
        return res
          .status(400)
          .send({ status: false, message: "City must be in string" });
      }

      if (!city || !city.trim()) {
        return res.status(400).send({
          status: false,
          message: "city must be required or city can't be empty",
        });
      }

      if (!validPlace(city.trim())) {
        return res.status(400).send({
          status: false,
          message: "city is invalid, number is not allowed",
        });
      }

      if (pincode && typeof pincode != "string") {
        return res
          .status(400)
          .send({ status: false, message: "pincode must be in string" });
      }

      if (!pincode || !pincode.trim()) {
        return res.status(400).send({
          status: false,
          message: "pincode must be required or pincode can't be empty",
        });
      }

      if (!validPincode(pincode.trim())) {
        return res
          .status(400)
          .send({ status: false, message: "pincode is invalid" });
      }
    }

    let userCreated = await userModel.create(userData);

    res
      .status(201)
      .send({ status: true, message: "Success", data: userCreated });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const login = async function (req, res) {
  try {
    const data = req.body;
    let { email, password } = data;

    if (Object.keys(userData).length == 0) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Please send Email and Password for login",
        });
    }

    if (email && typeof email != "string") {
      return res
        .status(400)
        .send({ status: false, message: "Email must be in string" });
    }
    if (!email || !email.trim()) {
      return res.status(400).send({
        status: false,
        message: "Email is mandatory, It should not be empty.",
      });
    }

    email = email.toLowerCase().trim();
    if (!validEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid Email." });
    }

    if (password && typeof password != "string") {
      return res
        .status(400)
        .send({ status: false, message: "password must be in string" });
    }
    if (!password || !password.trim()) {
      return res.status(400).send({
        status: false,
        message: "Password is mandatory and can not be empty.",
      });
    }

    let isUserExist = await userModel.findOne({
      email: email,
      password: password,
    });
    if (!isUserExist)
      return res.status(401).send({
        status: false,
        message: "Email Id and password are incorrect",
      });

    const userToken = jwt.sign({ userId: isUserExist._id }, "secretKey", {
      expiresIn: 1800,
    });

    const userTokenData = jwt.decode(userToken);
    userTokenData.iat = new Date(userTokenData.iat * 1000).toGMTString();
    userTokenData.exp = new Date(userTokenData.exp * 1000).toGMTString();

    res.setHeader("x-api-key", token);

    return res.status(200).send({
      status: true,
      message: "Success",
      data: {
        userToken: userToken,
        ...userTokenData,
      },
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports.createUser = createUser;
module.exports.login = login;
