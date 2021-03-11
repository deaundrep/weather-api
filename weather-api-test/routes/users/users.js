var express = require("express");
var router = express.Router();
var axios = require("axios");

// const bcrypt = require("bcryptjs");
// const User = require("./model/User");
const {
  signup,
  login,
  
} = require("../controller/userController");

const { checkSignupInputIsEmpty } = require("../lib/checkSignup");
const { checkSignupDataType } = require("../lib/checkSignupDataType");
const {
  checkLoginEmptyMiddleware,
  checkEmailFormat,
} = require("../lib/checkLogin");
/* GET users listing. */
router.get("/create-user", function (req, res) {
  if (req.session.user) {
    res.redirect("home");
  } else {
    res.render("sign-up");
  }

  // res.render("sign-up", { error: null, success: null });
});

router.get("/login", function (req, res) {
  if (req.session.user) {
    res.redirect("/users/home");
  } else {
    res.render("login");
  }
});

router.get("/home", async function (req, res) {
  if (req.session.user) {
    res.render("home", { user: req.session.user.email });
  } else {
    res.render("message", { error: true });
  }

  // res.render("sign-up", { error: null, success: null });
});

router.post("/home", async function (req, res) {
  if (req.session.user) {
    try {
      let result = await axios.get(
        
        `http://api.openweathermap.org/data/2.5/weather?q=${req.body.search}&appid=${WEATHER_API_KEY}`
      );
      console.log(result.data);
      res.render("home", { data: result.data, user: req.session.user.email, city: req.body.search});
    } catch (e) {
      res.status(500).json({
        message: "failure",
        data: e.message,
      });
    }
  } else {
    res.render("message", { error: true });
  }
});


//v4 async and await
router.post(
  "/create-user",
  checkSignupInputIsEmpty,
  checkSignupDataType,
  signup
);
//sign-up post 
router.post("/create-user", checkSignupInputIsEmpty, checkSignupDataType, signup);
//login
router.post("/login", checkLoginEmptyMiddleware, checkEmailFormat, login);



//logout
router.get("/logout", function (req, res) {
  req.session.destroy();

  res.clearCookie("connect.sid", {
    path: "/",
    httpOnly: true,
    secure: false,
    maxAge: null,
  });

  res.redirect("login");
});

module.exports = router;