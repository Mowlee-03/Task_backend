var express = require('express');
const { createUser, loginUser, getoneUser } = require('../controller/userController');
var router = express.Router();

router.post("/signup",createUser)
router.post("/login",loginUser)
router.get("/:userId",getoneUser)

module.exports = router;
