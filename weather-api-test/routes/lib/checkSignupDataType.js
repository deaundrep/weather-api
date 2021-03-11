const { matches, isStrongPassword } = require("validator")
const { checkForSymbol, checkIsEmail } = require("./authMethods")

function checkIfHaveNumber(target) {
    if (matches(target, /[0-9]/g)) {
        return true;
    } else {
        return false;
    }
}

function checkSignupDataType(req, res, next) {
    const { firstName, lastName, email, password } = req.body

    let errorObj = {};

    if (checkIfHaveNumber(firstName)) {
        errorObj.firstName = "First Name cannot contain numbers"
    }
    if (checkIfHaveNumber(lastName)) {
        errorObj.lastName = "Last Name cannot contain numbers"
    }

    if (checkForSymbol(firstName)) {
        errorObj.firstName = "First Name cannot contain special characters"
    }

    if (checkForSymbol(lastName)) {
        errorObj.lastName = "Last Name cannot contain special characters"
    }

    if (!checkIsEmail(email)) {
        errorObj.email = "Your email address is in a wrong format"
    }


    if (Object.keys(errorObj).length > 0) {
        res.render("sign-up", { error: errorObj })
    
    } else {
        next(); 
    }
}

module.exports = {
    checkSignupDataType,
}