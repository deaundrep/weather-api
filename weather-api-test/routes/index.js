var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  
  // console.log(req.session);
  // console.log(req.sessionID);
  res.send("this is default page");
});

module.exports = router;