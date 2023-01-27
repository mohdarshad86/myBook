

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
    // const re = /^(?=(?:\D*\d){8,10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    // const re = /^(?:ISBN(?:-1[03])?:?\ )?(?=[0-9X]{10}$|(?=(?:[0-9]+[-\ ]){3})[-\ 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)(?:97[89][-\ ]?)?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9X]$/i;
    // const re = /^[0-9]*[-| ](97(8|9))?\d{13}(\d|X)$/
    const re = /^\+?([1-9]{3})\)?[-. ]?([0-9]{10})$/

    return re.test(ISBN)
}

/*

^ -       Matches the start of the input string
(?=...) - A positive lookahead that asserts that the pattern inside the parentheses must match, 
            but the matched characters are not included in the final match
\D* -    Matches any non-digit characters (in this case, it's used to match any non-digit characters that may
            appear before or between groups of digits)
\d -     Matches any digit character
{8,10} - Matches the preceding element between 8 and 10 times
[\d-]+ - Matches one or more digits or hyphens
$ -      Matches the end of the input string

*/

module.exports = {emailValid, passwordValid, phoneValid,isbnValid}