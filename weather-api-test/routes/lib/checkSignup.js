const { checkIsEmpty } = require("./authMethods")

const checkSignupInputIsEmpty = (req, res, next) => {
    let errorObj = {};
    const { firstName, lastName, email, password } = req.body

    if (checkIsEmpty(firstName)) {
        errorObj.firstName = "First Name cannot be empty"
    }
    if (checkIsEmpty(lastName)) {
        errorObj.lastName = "Last Name cannot be empty"
    }
    if (checkIsEmpty(email)) {
        errorObj.email = "Email cannot be empty"
    }
    if (checkIsEmpty(password)) {
        errorObj.password = "Password cannot be empty"
    }
    
    if(Object.keys(errorObj).length > 0) {
        res.render("sign-up", {error: errorObj })
        
    } else {
        next(); 
    }
}

module.exports = {
    checkSignupInputIsEmpty
}