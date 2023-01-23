

const emailValid = function(email){
    re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return re.test(email)
}

const passwordValid = function(password){
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,15}$/;
    return re.test(password)
}

const phoneValid = function(phone){
    const re = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
    return re.test(phone)
}

const isbnValid = function(ISBN){
    const re = /^(?=(?:\D*\d){8,10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    return re.test(ISBN)
}

module.exports = {emailValid, passwordValid, phoneValid,isbnValid}