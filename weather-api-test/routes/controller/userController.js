const bcrypt = require('bcryptjs');
const User = require("../model/User");

module.exports = {
signup: async (req, res) => {
    
    const { firstName, lastName, email, password } = req.body
    try {
        const salted = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salted);
        const createdUser = new User({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            password: hashedPassword,
        });
        let savedUser = await createdUser.save();
        
        res.render("sign-up", { success: true })
    } 
    catch (error) {
        res.status(500).json({
            message: "error",
            errorMessage: error.message,
        })
    }
},
    
login: async (req, res) => {
    try {
        let foundUser = await User.findOne({ email: req.body.email });
        if (!foundUser) {
            res.render('sign-up', {
                error: {
                    message: "User doesn't exist", 
                }
                });
            
        } else {
            let isPasswordTrue = await bcrypt.compare(
                req.body.password,
                foundUser.password
            );
            if (isPasswordTrue) {
                req.session.user = {
                    _id: foundUser._id,
                    email: foundUser.email,
                }
                res.redirect("/users/home")
            } else {
                res.render("login", {
                    error: {
                        message: "please check your email and password"
                    }
                })
                
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "error",
            errorMessage: error.message,
        });
    }
}
}