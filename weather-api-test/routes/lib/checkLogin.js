const { checkIsEmpty, checkIsEmail } = require("./authMethods")

function checkLoginEmptyMiddleware(req, res, next) {
    let errorObj = {};
    let checkedEmail = false;

    const { email, password } = req.body

    if (checkIsEmpty(email)) {
        errorObj.email = "Email cannot be empty"
        checkedEmail = true;
    }

    if (checkIsEmpty(password)) {
        errorObj.password = "Password cannot be empty"
    }

    if (!checkedEmail) {
        if (!checkIsEmail(email)) {
            errorObj.email = "Your email address is not in a correct format"
        }
    }

    
    if (Object.keys(errorObj).length > 0) {

        res.render("login", {error:errorObj })
    
    } else {
        next();
    }
}

function checkEmailFormat(req, res, next) {
    next();
}

module.exports = {
    checkLoginEmptyMiddleware,
    checkEmailFormat,
}