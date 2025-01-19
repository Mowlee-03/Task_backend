var express = require('express');
var router = express.Router();
const {RegisterAdmin, LoginAdmin, updatepatch}=require("../controller/adminController");
const { getallUser } = require('../controller/userController');
/* GET home page. */
router.post("/register",RegisterAdmin)
router.post("/login",LoginAdmin)
router.patch("/update/:adminId",updatepatch)
router.get('/users',getallUser)
module.exports = router;
