
//======================================= Name ========================================//


const validName = (name) => {
    return (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(name));
}


//====================================== Email =======================================//


const validEmail = (email) => {
    return (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/.test(email));
}


//===================================== Password ====================================//


const validPassword = (password) => {
    return (/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(password));
}


//==================================== Number ======================================//


const validMobileNo = (Number) => {
    return ((/^((\+91)?|91)?[6789][0-9]{9}$/g).test(Number));
}


//===================================== Pincode ===================================//


const validPincode = (pincode) => {
    return (/^[1-9][0-9]{5}$/).test(pincode);
}


//==================================== ISBN =======================================//


const validISBN = (ISBN) => {
    return (/^(?=(?:\D*\d){13}(?:(?:\D*\d){3})?$)[\d-]+$/g).test(ISBN);
}


//===================================== Place ===================================//


const validPlace = (value) => {
    return (/^[^\W\d_]+\.?(?:[-\s'’][^\W\d_]+\.?)*$/).test(value);
}


module.exports = { validName, validEmail, validPassword, validMobileNo, validPincode, validISBN, validPlace }
