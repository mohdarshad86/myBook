
const jwt = require("jsonwebtoken")

const authentication = function (req, res, next) {
    try {
        const token = req.headers["x-api-key"];
        if (!token) {
            return res.status(400).send({ status: false, msg: "Header token is required !" });
        }
        jwt.verify(token, 'secretKeyProject4', function (err, decoded) {
            if (err) {
                let msg = err.message === "jwt expired" ? "Token is expired" : "Token is invalid"
                return msg
            }
            else {
                req.decodedToken = decoded
                next()
            }
        });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}


module.exports = {authentication}