const validate = function(a){
if(a.match (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i)) return true
}

const validateTitle = function(a){
if(a.match (/^([a-z A-Z\d]){2,50}$/)) return true
}

const validateISBN= function(a){
    if(a.match(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/i)) return true
}

const validateEmail = function(a){
    if(a.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) return true
}

const validatePassword = function(a){
    if(a.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) return true
}

const validatePhone = function(a){
    if(a.match(/^[6-9][0-9]{9}$/)) return true
}

const validatePincode = (pincode) => {
    if(a.match(/^[1-9][0-9]{5}$/)) return true
}

const validatePlace = (value) => {
    if(a.match(/^[^\W\d_]+\.?(?:[-\s'’][^\W\d_]+\.?)*$/)) return true
}


module.exports={validate,validateTitle,validateISBN,validateEmail,validatePassword,validatePhone,validatePincode,validatePlace}